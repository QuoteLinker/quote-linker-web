#!/usr/bin/env node

/**
 * This script automatically generates FAQ sections for MDX files.
 * It reads MDX files from the content/learn directory,
 * sends the content to an AI model to generate relevant FAQs,
 * and appends an <FAQ /> section at the bottom of each file.
 */

require('dotenv').config();
var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
var promisify = require('util').promisify;
var OpenAI = require('openai').OpenAI;

var readDir = promisify(fs.readdir);
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);

// Check if OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set.');
  console.error('Please set your OpenAI API key in a .env file or environment variable.');
  process.exit(1);
}

// Initialize OpenAI client
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'learn');
var FAQ_MARKER = '<!-- FAQ_SECTION -->';

/**
 * Generate FAQs for an article using OpenAI
 * @param {string} title - Article title
 * @param {string} content - Article content
 * @return {Promise<string>} - FAQ section as MDX
 */
function generateFAQs(title, content) {
  // Truncate content if too long (OpenAI has token limits)
  var truncatedContent = content.slice(0, 6000);
  
  var prompt = [
    'You are an expert in insurance and financial services. I will provide you with an article about insurance, and your task is to create 3-5 frequently asked questions (FAQs) with detailed answers based on the article content.',
    '',
    'Article Title: ' + title,
    '',
    'Article Content:',
    truncatedContent,
    '',
    'Please generate 3-5 relevant FAQs with answers that:',
    '1. Address common questions readers might have after reading the article',
    '2. Cover important concepts mentioned in the article',
    '3. Provide valuable additional information',
    '4. Are formatted in proper MDX with each Q&A wrapped in an accordion-style component',
    '',
    'Format your response exactly like this example:',
    '```jsx',
    '<FAQ>',
    '  <FAQItem question="What is the main benefit of comprehensive auto insurance?">',
    '    Comprehensive auto insurance provides coverage for damage to your vehicle caused by events other than collisions, such as theft, vandalism, natural disasters, falling objects, and animal collisions. This protection fills important gaps left by collision-only policies, giving you more complete financial protection for your vehicle.',
    '  </FAQItem>',
    '  ',
    '  <FAQItem question="How much does comprehensive coverage typically cost?">',
    '    The cost of comprehensive coverage varies based on factors including your vehicle\'s value, your location, driving history, and chosen deductible. On average, comprehensive coverage adds $134-$205 annually to your premium. Many drivers find this additional cost worthwhile considering the protection it provides against unpredictable events.',
    '  </FAQItem>',
    '</FAQ>',
    '```',
    '',
    'Generate only the FAQ section.'
  ].join('\n');

  return openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1500,
  })
  .then(function(response) {
    var faqContent = response.choices[0].message.content.trim();
    
    // Extract just the FAQ component part - using a more compatible regex without 's' flag
    var faqRegex = new RegExp('```(?:jsx|mdx)?\\s*([\\s\\S]*?)```');
    var faqMatch = faqContent.match(faqRegex);
    if (faqMatch && faqMatch[1]) {
      return faqMatch[1].trim();
    }
    
    // Fallback if the regex doesn't match
    if (faqContent.includes('<FAQ>')) {
      return faqContent.replace(/```(?:jsx|mdx)?|```/g, '').trim();
    }
    
    throw new Error('Failed to parse FAQ response format');
  })
  .catch(function(error) {
    console.error('Error generating FAQs:', error);
    return [
      '<FAQ>',
      '  <FAQItem question="Error generating FAQs">',
      '    We couldn\'t generate FAQs for this article automatically. Please try again later.',
      '  </FAQItem>',
      '</FAQ>'
    ].join('\n');
  });
}

/**
 * Processes a single MDX file
 * @param {string} filePath - Path to the MDX file
 * @return {Promise<void>}
 */
function processMdxFile(filePath) {
  // Skip if file is already being processed by another instance
  if (process.env.SKIP_FILES && process.env.SKIP_FILES.includes(path.basename(filePath))) {
    console.log('Skipping ' + filePath + ' as it\'s in the skip list.');
    return Promise.resolve();
  }

  return readFile(filePath, 'utf8')
    .then(function(fileContent) {
      var parsed = matter(fileContent);
      var data = parsed.data;
      var content = parsed.content;
      
      // Skip if the file already has an FAQ section
      if (fileContent.includes('<FAQ>')) {
        console.log('FAQ section already exists in ' + filePath + ', skipping...');
        return Promise.resolve();
      }
      
      console.log('Generating FAQs for ' + filePath + '...');
      
      // Generate FAQs based on the article content
      return generateFAQs(data.title || '', content)
        .then(function(faqSection) {
          // Append FAQ section to the end of the file
          var updatedContent;
          if (content.includes(FAQ_MARKER)) {
            // Replace the marker if it exists
            updatedContent = content.replace(FAQ_MARKER, faqSection);
          } else {
            // Otherwise append to the end with a separator
            updatedContent = content + '\n\n---\n\n' + faqSection;
          }
          
          // Reconstruct the file with frontmatter and updated content
          var updatedFileContent = matter.stringify(updatedContent, data);
          
          // Write the updated file back to disk
          return writeFile(filePath, updatedFileContent)
            .then(function() {
              console.log('✅ Updated ' + filePath + ' with FAQ section');
            });
        });
    })
    .catch(function(error) {
      console.error('Error processing ' + filePath + ':', error);
      return Promise.resolve(); // Continue with next file
    });
}

/**
 * Main function to process all MDX files in the content/learn directory
 */
function main() {
  // Get all MDX files in the content directory
  return readDir(CONTENT_DIR)
    .then(function(files) {
      var mdxFiles = files.filter(function(file) {
        return file.endsWith('.mdx') || file.endsWith('.md');
      });
      
      if (mdxFiles.length === 0) {
        console.log('No MDX files found in the content directory.');
        return Promise.resolve();
      }
      
      console.log('Found ' + mdxFiles.length + ' MDX files to process.');
      
      // Process files sequentially to avoid rate limiting
      return mdxFiles.reduce(function(promise, file) {
        return promise
          .then(function() {
            var filePath = path.join(CONTENT_DIR, file);
            return processMdxFile(filePath);
          })
          .then(function() {
            // Add a small delay between API calls to avoid rate limiting
            return new Promise(function(resolve) {
              setTimeout(resolve, 1000);
            });
          });
      }, Promise.resolve());
    })
    .then(function() {
      console.log('All MDX files processed successfully.');
    })
    .catch(function(error) {
      console.error('Error processing MDX files:', error);
      process.exit(1);
    });
}

// Run the script
main();
