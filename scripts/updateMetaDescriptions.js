#!/usr/bin/env node

/**
 * This script automatically updates meta descriptions in MDX files.
 * It reads MDX files from the content/learn directory,
 * extracts the title from frontmatter, sends it to AI to generate 
 * a 155-character meta description, and updates the frontmatter.
 */

var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
var axios = require('axios');
var promisify = require('util').promisify;

var readDir = promisify(fs.readdir);
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);
var stat = promisify(fs.stat);

// Configuration
var CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'learn');
var API_PROVIDER = process.env.AI_PROVIDER || 'openai'; // 'vertex' or 'openai'
var OPENAI_API_KEY = process.env.OPENAI_API_KEY;
var VERTEX_AI_PROJECT = process.env.VERTEX_AI_PROJECT;
var VERTEX_AI_LOCATION = process.env.VERTEX_AI_LOCATION || 'us-central1';
var VERTEX_AI_MODEL = process.env.VERTEX_AI_MODEL || 'text-bison';
var BATCH_SIZE = 5; // Number of files to process in parallel
var RATE_LIMIT_DELAY = 1000; // Delay between API calls in ms

/**
 * Generates a meta description using OpenAI
 * @param {string} title - The title to generate a description for
 * @param {string} existingContent - The existing content for context
 * @returns {Promise<string>} - The generated description
 */
async function generateOpenAIDescription(title, existingContent) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful SEO assistant that writes concise meta descriptions.'
          },
          {
            role: 'user',
            content: `Write a compelling meta description for an insurance article with the title: "${title}". 
            The description should be exactly 155 characters or less to fit in search results. 
            Focus on value to the reader and include relevant keywords.
            Here's some context from the article: ${existingContent.substring(0, 500)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    var description = response.data.choices[0].message.content.trim();
    
    // Remove quotes if the API returns them
    if ((description.startsWith('"') && description.endsWith('"')) || 
        (description.startsWith("'") && description.endsWith("'"))) {
      description = description.substring(1, description.length - 1);
    }
    
    // Ensure the description is under 155 characters
    if (description.length > 155) {
      description = description.substring(0, 152) + '...';
    }
    
    return description;
  } catch (error) {
    console.error('Error generating description with OpenAI:', error.response ? error.response.data : error.message);
    throw error;
  }
}

/**
 * Generates a meta description using Vertex AI
 * @param {string} title - The title to generate a description for 
 * @param {string} existingContent - The existing content for context
 * @returns {Promise<string>} - The generated description
 */
async function generateVertexAIDescription(title, existingContent) {
  if (!VERTEX_AI_PROJECT) {
    throw new Error('VERTEX_AI_PROJECT environment variable is required');
  }

  try {
    const endpoint = `https://${VERTEX_AI_LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_AI_PROJECT}/locations/${VERTEX_AI_LOCATION}/publishers/google/models/${VERTEX_AI_MODEL}:predict`;
    
    const response = await axios.post(
      endpoint,
      {
        instances: [
          {
            prompt: `Write a compelling meta description for an insurance article with the title: "${title}". 
            The description should be exactly 155 characters or less to fit in search results. 
            Focus on value to the reader and include relevant keywords.
            Here's some context from the article: ${existingContent.substring(0, 500)}`
          }
        ],
        parameters: {
          temperature: 0.7,
          maxOutputTokens: 100,
          topK: 40,
          topP: 0.95
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
          'Content-Type': 'application/json'
        }
      }
    );

    var description = response.data.predictions[0].content.trim();
    
    // Remove quotes if the API returns them
    if ((description.startsWith('"') && description.endsWith('"')) || 
        (description.startsWith("'") && description.endsWith("'"))) {
      description = description.substring(1, description.length - 1);
    }
    
    // Ensure the description is under 155 characters
    if (description.length > 155) {
      description = description.substring(0, 152) + '...';
    }
    
    return description;
  } catch (error) {
    console.error('Error generating description with Vertex AI:', error.response ? error.response.data : error.message);
    throw error;
  }
}

/**
 * Generates a meta description using the configured AI provider
 * @param {string} title - The title to generate a description for
 * @param {string} existingContent - The existing content for context
 * @returns {Promise<string>} - The generated description
 */
async function generateMetaDescription(title, existingContent) {
  if (API_PROVIDER === 'openai') {
    return generateOpenAIDescription(title, existingContent);
  } else if (API_PROVIDER === 'vertex') {
    return generateVertexAIDescription(title, existingContent);
  } else {
    throw new Error(`Unsupported API provider: ${API_PROVIDER}`);
  }
}

/**
 * Sleep for a specified duration
 * @param {number} ms - The duration in milliseconds
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Processes a single MDX file
 * @param {string} filePath - Path to the MDX file
 * @param {boolean} force - Whether to force regeneration of existing descriptions
 * @returns {Promise<boolean>} - Whether the file was updated
 */
async function processMdxFile(filePath, force = false) {
  try {
    var fileContent = await readFile(filePath, 'utf8');
    var { data, content } = matter(fileContent);
    
    // Skip if already has a description and not forcing
    if (data.description && !force) {
      console.log(`Skipping ${filePath} - already has description`);
      return false;
    }
    
    // Check for title
    if (!data.title) {
      console.warn(`Warning: No title found in ${filePath}, skipping...`);
      return false;
    }
    
    console.log(`Processing ${filePath} - title: ${data.title}`);
    
    // Generate description from title
    var description = await generateMetaDescription(data.title, content);
    console.log(`Generated description (${description.length} chars): ${description}`);
    
    // Update frontmatter
    data.description = description;
    
    // Write updated file
    var updatedFileContent = matter.stringify(content, data);
    await writeFile(filePath, updatedFileContent);
    
    console.log(`Updated ${filePath} with new description`);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

/**
 * Gets all MDX files in a directory recursively
 * @param {string} dir - The directory to scan
 * @returns {Promise<string[]>} - Array of file paths
 */
async function getMdxFiles(dir) {
  var allFiles = [];
  var files = await readDir(dir);
  
  for (var i = 0; i < files.length; i++) {
    var filePath = path.join(dir, files[i]);
    var stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      var subFiles = await getMdxFiles(filePath);
      allFiles = allFiles.concat(subFiles);
    } else if (filePath.endsWith('.mdx') || filePath.endsWith('.md')) {
      allFiles.push(filePath);
    }
  }
  
  return allFiles;
}

/**
 * Process files in batches to respect rate limits
 * @param {string[]} files - Array of file paths
 * @param {boolean} force - Whether to force regeneration
 * @returns {Promise<number>} - Number of files updated
 */
async function processBatches(files, force) {
  var updated = 0;
  
  for (var i = 0; i < files.length; i += BATCH_SIZE) {
    var batch = files.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(files.length / BATCH_SIZE)}`);
    
    // Process each file in the batch
    for (var j = 0; j < batch.length; j++) {
      var wasUpdated = await processMdxFile(batch[j], force);
      if (wasUpdated) updated++;
      
      // Respect rate limits
      if (j < batch.length - 1) {
        await sleep(RATE_LIMIT_DELAY);
      }
    }
    
    // Add extra delay between batches
    if (i + BATCH_SIZE < files.length) {
      console.log('Waiting between batches...');
      await sleep(RATE_LIMIT_DELAY * 2);
    }
  }
  
  return updated;
}

/**
 * Main function
 */
async function main() {
  try {
    // Parse command line arguments
    var args = process.argv.slice(2);
    var force = args.includes('--force');
    
    console.log(`Starting meta description updates (${API_PROVIDER})...`);
    console.log(`Force mode: ${force ? 'enabled' : 'disabled'}`);
    
    // Get all MDX files
    var files = await getMdxFiles(CONTENT_DIR);
    console.log(`Found ${files.length} MDX files to process`);
    
    if (files.length === 0) {
      console.log('No files to process');
      return;
    }
    
    // Process files in batches
    var updatedCount = await processBatches(files, force);
    
    console.log(`Completed! Updated ${updatedCount}/${files.length} files`);
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

// Run the script
main();
