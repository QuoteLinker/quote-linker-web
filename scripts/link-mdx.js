#!/usr/bin/env node

/**
 * This script automatically links keywords in MDX files.
 * It reads MDX files from the content/learn directory,
 * finds keywords in the frontmatter, and wraps their occurrences
 * in the content with <Link> components.
 */

var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
var promisify = require('util').promisify;

var readDir = promisify(fs.readdir);
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);

var CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'learn');

// Fields to check for keywords, in order of preference
var KEYWORD_FIELDS = ['keywords', 'tags', 'categories', 'category'];

/**
 * Escapes special characters in a string for use in a RegExp
 * @param {string} string - The string to escape
 * @return {string} - The escaped string
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Transforms content by wrapping keywords with Link components
 * @param {string} content - The MDX content
 * @param {string[]} keywords - List of keywords to wrap
 * @param {string} slug - The slug for the current file
 * @return {string} - The transformed content
 */
/**
 * Checks if the position is inside a Markdown special section (code block, link, etc)
 * @param {string} content - The full content
 * @param {number} position - Position to check
 * @return {boolean} - True if inside a special section
 */
function isInsideSpecialSection(content, position) {
  // Check if inside code block
  var codeBlockRegex = /```[\s\S]*?```/g;
  var match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (position >= match.index && position < match.index + match[0].length) {
      return true;
    }
  }
  
  // Check if inside inline code
  var inlineCodeRegex = /`[^`]+`/g;
  while ((match = inlineCodeRegex.exec(content)) !== null) {
    if (position >= match.index && position < match.index + match[0].length) {
      return true;
    }
  }
  
  // Check if inside a link (Markdown or JSX)
  var linkRegex = /\[.+?\]\(.+?\)|<[aA][ >].*?<\/[aA]>|<Link.*?<\/Link>/g;
  while ((match = linkRegex.exec(content)) !== null) {
    if (position >= match.index && position < match.index + match[0].length) {
      return true;
    }
  }
  
  // Check if inside a heading
  var headingRegex = /^#{1,6}\s+.+$/gm;
  while ((match = headingRegex.exec(content)) !== null) {
    if (position >= match.index && position < match.index + match[0].length) {
      return true;
    }
  }
  
  return false;
}

function addLinksToContent(content, keywords, currentSlug) {
  // Sort keywords by length (descending) to avoid linking substrings first
  var sortedKeywords = keywords.slice().sort(function(a, b) { return b.length - a.length; });
  
  var transformedContent = content;
  
  // Track keywords that have already been linked to avoid duplication
  var processedKeywords = {};
  // Track positions where we've already added links to avoid overlapping
  var linkedPositions = [];
  
  // Split content into sections we can safely modify
  var sections = [];
  var currentPosition = 0;
  
  // First, identify "safe" sections to modify
  var specialSectionRegex = /(```[\s\S]*?```)|(`[^`]+`)|(\[.+?\]\(.+?\))|(<[aA][ >].*?<\/[aA]>)|(<Link.*?<\/Link>)|(^#{1,6}\s+.+$)/gm;
  var lastIndex = 0;
  var match;
  
  while ((match = specialSectionRegex.exec(transformedContent)) !== null) {
    // Add the text before this special section
    if (match.index > lastIndex) {
      sections.push({
        text: transformedContent.substring(lastIndex, match.index),
        start: lastIndex,
        safe: true
      });
    }
    
    // Add the special section (which we won't modify)
    sections.push({
      text: match[0],
      start: match.index,
      safe: false
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < transformedContent.length) {
    sections.push({
      text: transformedContent.substring(lastIndex),
      start: lastIndex,
      safe: true
    });
  }
  
  // Now process each keyword, but only in safe sections
  for (var i = 0; i < sortedKeywords.length; i++) {
    var keyword = sortedKeywords[i];
    if (processedKeywords[keyword]) continue;
    
    // Skip keywords that are too short
    if (keyword.length < 4) continue;
    
    var keywordRegex = new RegExp('\\b(' + escapeRegExp(keyword) + ')\\b', 'gi');
    var changed = false;
    
    // Process each safe section
    for (var j = 0; j < sections.length; j++) {
      var section = sections[j];
      if (!section.safe) continue;
      
      // Replace only the first occurrence in this section
      var sectionText = section.text;
      var foundMatch = keywordRegex.exec(sectionText);
      
      if (foundMatch) {
        var matchStart = section.start + foundMatch.index;
        var matchEnd = matchStart + foundMatch[0].length;
        var alreadyLinked = false;
        
        // Check if this match overlaps with existing links
        for (var k = 0; k < linkedPositions.length; k++) {
          var pos = linkedPositions[k];
          if ((matchStart >= pos.start && matchStart <= pos.end) ||
              (matchEnd >= pos.start && matchEnd <= pos.end)) {
            alreadyLinked = true;
            break;
          }
        }
        
        if (!alreadyLinked) {
          // Add the link
          var replacement = '<Link href="/learn/' + currentSlug + '">' + foundMatch[0] + '</Link>';
          section.text = sectionText.substring(0, foundMatch.index) + 
                       replacement + 
                       sectionText.substring(foundMatch.index + foundMatch[0].length);
          
          // Update the section's text and track the linked position
          linkedPositions.push({
            start: matchStart,
            end: matchStart + replacement.length
          });
          
          // Adjust other section positions after this one
          var lengthDifference = replacement.length - foundMatch[0].length;
          for (var m = j + 1; m < sections.length; m++) {
            sections[m].start += lengthDifference;
          }
          
          processedKeywords[keyword] = true;
          changed = true;
          break;
        }
      }
    }
    
    if (changed) {
      // Reconstruct the transformed content
      transformedContent = sections.map(function(section) {
        return section.text;
      }).join('');
    }
  }
  
  return transformedContent;
}

/**
 * Processes a single MDX file
 * @param {string} filePath - Path to the MDX file
 * @return {Promise<void>}
 */
function processMdxFile(filePath) {
  return readFile(filePath, 'utf8')
    .then(function(fileContent) {
      var parsed = matter(fileContent);
      var data = parsed.data;
      var content = parsed.content;
      
      // Find keywords from available frontmatter fields
      var keywords = [];
      
      // Try each field in order until we find one with values
      for (var i = 0; i < KEYWORD_FIELDS.length; i++) {
        var field = KEYWORD_FIELDS[i];
        if (data[field]) {
          // If it's an array, use it directly
          if (Array.isArray(data[field])) {
            keywords = data[field];
            break;
          }
          // If it's a string, use it as a single keyword
          else if (typeof data[field] === 'string') {
            keywords = [data[field]];
            break;
          }
        }
      }
      
      // If no keywords found in frontmatter fields, try to extract from title and description
      if (keywords.length === 0) {
        // Extract potential keywords from title (words or phrases between quotes)
        if (data.title) {
          var titleMatches = data.title.match(/"([^"]+)"/g);
          if (titleMatches) {
            titleMatches.forEach(function(match) {
              keywords.push(match.replace(/"/g, ''));
            });
          }
          
          // Also add main topic from title (usually first few words)
          var mainTopic = data.title.split(':')[0].trim();
          if (mainTopic && mainTopic.length > 3) {
            keywords.push(mainTopic);
          }
        }
        
        // Extract important terms from description
        if (data.description && typeof data.description === 'string') {
          // Look for insurance types and common terms
          var insuranceTypes = ['auto insurance', 'car insurance', 'life insurance', 
                              'health insurance', 'disability insurance', 'homeowners insurance'];
          
          insuranceTypes.forEach(function(type) {
            if (data.description.toLowerCase().includes(type.toLowerCase())) {
              keywords.push(type);
            }
          });
        }
      }
      
      // Skip if still no keywords found
      if (keywords.length === 0) {
        console.log('No keywords could be extracted from ' + filePath + ', skipping...');
        return Promise.resolve();
      }
      
      // Filter out duplicates and very short keywords
      keywords = keywords.filter(function(value, index, self) {
        return self.indexOf(value) === index && value.length >= 4;
      });
      
      console.log('Using keywords for ' + filePath + ':', keywords);
      var fileName = path.basename(filePath);
      var slug = fileName.replace(/\.(mdx|md)$/, '');
      
      // Process the content to add links
      var transformedContent = addLinksToContent(content, keywords, slug);
      
      // Skip if no changes were made
      if (transformedContent === content) {
        console.log('No changes made to ' + filePath);
        return Promise.resolve();
      }
      
      // Reconstruct the file with frontmatter and transformed content
      var updatedFileContent = matter.stringify(transformedContent, data);
      
      // Write the updated file back to disk
      return writeFile(filePath, updatedFileContent)
        .then(function() {
          console.log('Updated ' + filePath);
        });
    })
    .catch(function(error) {
      console.error('Error processing ' + filePath + ':', error);
      return Promise.resolve();
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
      
      // Process each MDX file in sequence
      return mdxFiles.reduce(function(chain, file) {
        return chain.then(function() {
          var filePath = path.join(CONTENT_DIR, file);
          return processMdxFile(filePath);
        });
      }, Promise.resolve())
      .then(function() {
        console.log('All MDX files processed successfully.');
      });
    })
    .catch(function(error) {
      console.error('Error processing MDX files:', error);
      process.exit(1);
    });
}

// Run the script
main();
