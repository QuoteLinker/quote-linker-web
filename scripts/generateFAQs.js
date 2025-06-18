#!/usr/bin/env node

/**
 * This script automatically generates FAQ sections for MDX files.
 * It reads MDX files from the content/learn directory,
 * sends the content to an AI model to generate relevant FAQs,
 * and appends an <FAQ /> section at the bottom of each file.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { promisify } = require('util');
const { OpenAI } = require('openai');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Check if OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set.');
  console.error('Please set your OpenAI API key in a .env file or environment variable.');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'learn');
const FAQ_MARKER = '<!-- FAQ_SECTION -->';

/**
 * Generate FAQs for an article using OpenAI
 * @param {string} title - Article title
 * @param {string} content - Article content
 * @return {Promise<string>} - FAQ section as MDX
 */
async function generateFAQs(title, content) {
  try {
    // Truncate content if too long (OpenAI has token limits)
    const truncatedContent = content.slice(0, 6000);
    
    const prompt = `
You are an expert in insurance and financial services. I will provide you with an article about insurance, and your task is to create 3-5 frequently asked questions (FAQs) with detailed answers based on the article content.

Article Title: ${title}

Article Content:
${truncatedContent}

Please generate 3-5 relevant FAQs with answers that:
1. Address common questions readers might have after reading the article
2. Cover important concepts mentioned in the article
3. Provide valuable additional information
4. Are formatted in proper MDX with each Q&A wrapped in an accordion-style component

Format your response exactly like this example:
\`\`\`jsx
<FAQ>
  <FAQItem question="What is the main benefit of comprehensive auto insurance?">
    Comprehensive auto insurance provides coverage for damage to your vehicle caused by events other than collisions, such as theft, vandalism, natural disasters, falling objects, and animal collisions. This protection fills important gaps left by collision-only policies, giving you more complete financial protection for your vehicle.
  </FAQItem>
  
  <FAQItem question="How much does comprehensive coverage typically cost?">
    The cost of comprehensive coverage varies based on factors including your vehicle's value, your location, driving history, and chosen deductible. On average, comprehensive coverage adds $134-$205 annually to your premium. Many drivers find this additional cost worthwhile considering the protection it provides against unpredictable events.
  </FAQItem>
</FAQ>
\`\`\`

Generate only the FAQ section.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const faqContent = response.choices[0].message.content.trim();
    
    // Extract just the FAQ component part
    const faqMatch = faqContent.match(/```(?:jsx|mdx)?\s*(.*?)```/s);
    if (faqMatch && faqMatch[1]) {
      return faqMatch[1].trim();
    }
    
    // Fallback if the regex doesn't match
    if (faqContent.includes('<FAQ>')) {
      return faqContent.replace(/```(?:jsx|mdx)?|```/g, '').trim();
    }
    
    throw new Error('Failed to parse FAQ response format');
    
  } catch (error) {
    console.error('Error generating FAQs:', error);
    return `<FAQ>
  <FAQItem question="Error generating FAQs">
    We couldn't generate FAQs for this article automatically. Please try again later.
  </FAQItem>
</FAQ>`;
  }
}

/**
 * Processes a single MDX file
 * @param {string} filePath - Path to the MDX file
 * @return {Promise<void>}
 */
async function processMdxFile(filePath) {
  try {
    // Skip if file is already being processed by another instance
    if (process.env.SKIP_FILES && process.env.SKIP_FILES.includes(path.basename(filePath))) {
      console.log(`Skipping ${filePath} as it's in the skip list.`);
      return;
    }

    const fileContent = await readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Skip if the file already has an FAQ section
    if (fileContent.includes('<FAQ>')) {
      console.log(`FAQ section already exists in ${filePath}, skipping...`);
      return;
    }
    
    console.log(`Generating FAQs for ${filePath}...`);
    
    // Generate FAQs based on the article content
    const faqSection = await generateFAQs(data.title || '', content);
    
    // Append FAQ section to the end of the file
    let updatedContent;
    if (content.includes(FAQ_MARKER)) {
      // Replace the marker if it exists
      updatedContent = content.replace(FAQ_MARKER, faqSection);
    } else {
      // Otherwise append to the end with a separator
      updatedContent = `${content}\n\n---\n\n${faqSection}`;
    }
    
    // Reconstruct the file with frontmatter and updated content
    const updatedFileContent = matter.stringify(updatedContent, data);
    
    // Write the updated file back to disk
    await writeFile(filePath, updatedFileContent);
    console.log(`✅ Updated ${filePath} with FAQ section`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

/**
 * Main function to process all MDX files in the content/learn directory
 */
async function main() {
  try {
    // Get all MDX files in the content directory
    const files = await readDir(CONTENT_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
    
    if (mdxFiles.length === 0) {
      console.log('No MDX files found in the content directory.');
      return;
    }
    
    console.log(`Found ${mdxFiles.length} MDX files to process.`);
    
    // Process one file at a time to avoid rate limiting
    for (const file of mdxFiles) {
      const filePath = path.join(CONTENT_DIR, file);
      await processMdxFile(filePath);
      
      // Add a small delay between API calls to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('All MDX files processed successfully.');
  } catch (error) {
    console.error('Error processing MDX files:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
