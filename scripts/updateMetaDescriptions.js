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
function generateOpenAIDescription(title, existingContent) {
  if (!OPENAI_API_KEY) {
    return Promise.reject(new Error('OPENAI_API_KEY environment variable is required'));
  }

  return axios.post(
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
          content: 'Write a compelling meta description for an insurance article with the title: "' + title + '". ' +
                  'The description should be exactly 155 characters or less to fit in search results. ' + 
                  'Focus on value to the reader and include relevant keywords. ' +
                  'Here\'s some context from the article: ' + existingContent.substring(0, 500)
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    },
    {
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json'
      }
    }
  ).then(function(response) {
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
  }).catch(function(error) {
    console.error('Error generating description with OpenAI:', error.response ? error.response.data : error.message);
    throw error;
  });
}

/**
 * Generates a meta description using Vertex AI
 * @param {string} title - The title to generate a description for 
 * @param {string} existingContent - The existing content for context
 * @returns {Promise<string>} - The generated description
 */
function generateVertexAIDescription(title, existingContent) {
  if (!VERTEX_AI_PROJECT) {
    return Promise.reject(new Error('VERTEX_AI_PROJECT environment variable is required'));
  }

  var endpoint = 'https://' + VERTEX_AI_LOCATION + '-aiplatform.googleapis.com/v1/projects/' + 
                VERTEX_AI_PROJECT + '/locations/' + VERTEX_AI_LOCATION + 
                '/publishers/google/models/' + VERTEX_AI_MODEL + ':predict';
  
  return axios.post(
    endpoint,
    {
      instances: [
        {
          prompt: 'Write a compelling meta description for an insurance article with the title: "' + title + '". ' +
                 'The description should be exactly 155 characters or less to fit in search results. ' + 
                 'Focus on value to the reader and include relevant keywords. ' +
                 'Here\'s some context from the article: ' + existingContent.substring(0, 500)
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
        'Authorization': 'Bearer ' + process.env.GOOGLE_APPLICATION_CREDENTIALS,
        'Content-Type': 'application/json'
      }
    }
  ).then(function(response) {
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
  }).catch(function(error) {
    console.error('Error generating description with Vertex AI:', error.response ? error.response.data : error.message);
    throw error;
  });
}

/**
 * Generates a meta description using the configured AI provider
 * @param {string} title - The title to generate a description for
 * @param {string} existingContent - The existing content for context
 * @returns {Promise<string>} - The generated description
 */
function generateMetaDescription(title, existingContent) {
  if (API_PROVIDER === 'openai') {
    return generateOpenAIDescription(title, existingContent);
  } else if (API_PROVIDER === 'vertex') {
    return generateVertexAIDescription(title, existingContent);
  } else {
    return Promise.reject(new Error('Invalid AI provider: ' + API_PROVIDER));
  }
}

/**
 * Sleep for a specified duration
 * @param {number} ms - The duration in milliseconds
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

/**
 * Processes a single MDX file
 * @param {string} filePath - Path to the MDX file
 * @param {boolean} force - Whether to force regeneration of existing descriptions
 * @returns {Promise<boolean>} - Whether the file was updated
 */
function processMdxFile(filePath, force) {
  if (force === undefined) force = false;
  
  return readFile(filePath, 'utf8')
    .then(function(fileContent) {
      var parsed = matter(fileContent);
      var data = parsed.data;
      var content = parsed.content;
      
      // Skip if already has a description and not forcing
      if (data.description && !force) {
        console.log('Skipping ' + filePath + ' (already has description)');
        return false;
      }
      
      // Check for title
      if (!data.title) {
        console.warn('Skipping ' + filePath + ' (no title)');
        return false;
      }
      
      console.log('Processing ' + filePath + ' - title: ' + data.title);
      
      // Generate description from title
      return generateMetaDescription(data.title, content)
        .then(function(description) {
          console.log('Generated description (' + description.length + ' chars): ' + description);
          
          // Update frontmatter
          data.description = description;
          
          // Write updated file
          var updatedFileContent = matter.stringify(content, data);
          return writeFile(filePath, updatedFileContent)
            .then(function() {
              console.log('Updated ' + filePath + ' with new description');
              return true;
            });
        });
    })
    .catch(function(error) {
      console.error('Error processing ' + filePath + ':', error);
      return false;
    });
}

/**
 * Gets all MDX files in a directory recursively
 * @param {string} dir - The directory to scan
 * @returns {Promise<string[]>} - Array of file paths
 */
function getMdxFiles(dir) {
  var allFiles = [];
  
  return readDir(dir)
    .then(function(files) {
      var promises = files.map(function(file) {
        var filePath = path.join(dir, file);
        return stat(filePath)
          .then(function(stats) {
            if (stats.isDirectory()) {
              return getMdxFiles(filePath);
            } else if (file.endsWith('.mdx')) {
              return [filePath];
            }
            return [];
          });
      });
      
      return Promise.all(promises);
    })
    .then(function(fileArrays) {
      return fileArrays.flat();
    });
}

/**
 * Process files in batches to respect rate limits
 * @param {string[]} files - Array of file paths
 * @param {boolean} force - Whether to force regeneration
 * @returns {Promise<number>} - Number of files updated
 */
function processBatches(files, force) {
  var updated = 0;
  
  // Process each batch sequentially
  function processBatch(startIndex) {
    if (startIndex >= files.length) {
      return Promise.resolve(updated);
    }
    
    var endIndex = Math.min(startIndex + BATCH_SIZE, files.length);
    var batch = files.slice(startIndex, endIndex);
    console.log('Processing batch ' + (Math.floor(startIndex / BATCH_SIZE) + 1) + '/' + 
                Math.ceil(files.length / BATCH_SIZE));
    
    // Process files in the current batch
    var promises = batch.map(function(file) {
      return processMdxFile(file, force)
        .then(function(wasUpdated) {
          if (wasUpdated) updated++;
        });
    });
    
    return Promise.all(promises)
      .then(function() {
        if (endIndex < files.length) {
          // Add delay between batches
          return sleep(RATE_LIMIT_DELAY)
            .then(function() {
              return processBatch(endIndex);
            });
        }
        return updated;
      });
  }
  
  // Start processing from the first batch
  return processBatch(0);
}

/**
 * Main function
 */
function main() {
  // Parse command line arguments
  var args = process.argv.slice(2);
  var force = args.includes('--force');
  
  console.log('Starting meta description updates (' + API_PROVIDER + ')...');
  console.log('Force mode: ' + (force ? 'enabled' : 'disabled'));
  
  // Get all MDX files
  getMdxFiles(CONTENT_DIR)
    .then(function(files) {
      console.log('Found ' + files.length + ' MDX files');
      return processBatches(files, force);
    })
    .then(function(updatedCount) {
      console.log('Completed! Updated ' + updatedCount + ' files');
      process.exit(0);
    })
    .catch(function(error) {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

// Run the script
main();
