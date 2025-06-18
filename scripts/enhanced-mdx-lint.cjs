#!/usr/bin/env node

/**
 * Enhanced MDX Linting and Standardization Script
 * 
 * This script audits and standardizes MDX content files using remark-lint.
 * It ensures consistent heading levels, list styles, code block syntax, and that every file has:
 * - A title in H1
 * - A description in frontmatter
 * - A reading time badge
 * - Other required frontmatter fields
 * - Consistent formatting
 * - Proper link usage
 * 
 * It also converts .md files to .mdx format
 */

var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
var util = require('util');
var promisify = util.promisify;
var remark = require('remark');
var remarkLint = require('remark-lint');
var remarkPresetLintRecommended = require('remark-preset-lint-recommended');
var remarkPresetLintConsistent = require('remark-preset-lint-consistent');
var remarkGfm = require('remark-gfm');
var strip = require('strip-markdown');
var readingTime = require('reading-time');

var readDir = promisify(fs.readdir);
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);
var stat = promisify(fs.stat);
var rename = promisify(fs.rename);

// Configuration
var CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'learn');
var CODE_LANGUAGES = ['js', 'jsx', 'ts', 'tsx', 'json', 'html', 'css', 'bash', 'sh', 'markdown', 'md', 'yaml', 'yml'];

// Required frontmatter fields
var REQUIRED_FRONTMATTER = [
  'title',
  'description',
  'date',
  'coverImage',
  'readingTime',
  'category'
];

// Rules for standardizing content
var RULES = {
  MUST_HAVE_H1: 'Must have exactly one H1 heading that matches the title in frontmatter',
  CONSISTENT_LIST_STYLE: 'Lists should use consistent markers (- for unordered, 1. for ordered)',
  HEADING_HIERARCHY: 'Headings must follow proper hierarchy (H1 > H2 > H3)',
  CODE_BLOCK_SYNTAX: 'Code blocks must use triple backticks with language specified',
  FULL_DESCRIPTION: 'Description must be complete and not contain ellipsis (...) or end with >-',
  LINK_COMPONENT_USAGE: 'All internal links should use <Link> component',
  READING_TIME_FORMAT: 'Reading time should follow the format "X min read"',
  CONVERT_MD_TO_MDX: 'Convert .md files to .mdx format'
};

// Category mapping
var CATEGORY_MAP = {
  'auto': 'Auto Insurance',
  'car': 'Auto Insurance', 
  'home': 'Home Insurance',
  'homeowners': 'Home Insurance',
  'property': 'Home Insurance',
  'life': 'Life Insurance',
  'health': 'Health Insurance',
  'disability': 'Disability Insurance',
  'insurance': 'Insurance'
};

/**
 * Convert plain Markdown links to Next.js Link component
 */
function convertToNextLinks(content) {
  var parsed = matter(content);
  var data = parsed.data;
  var mdxContent = parsed.content;
  
  // Replace markdown links to internal pages with Link component
  // This regex finds markdown links like [text](/path)
  var updatedContent = mdxContent.replace(
    /\[([^\]]+)\]\(\/([^)]+)\)/g, 
    '<Link href="/$2">$1</Link>'
  );
  
  if (updatedContent !== mdxContent) {
    return matter.stringify(updatedContent, data);
  }
  
  return content;
}

/**
 * Fix or add H1 heading
 */
function fixHeadingHierarchy(content) {
  var parsed = matter(content);
  var data = parsed.data;
  var mdxContent = parsed.content;
  
  // Check if H1 exists and matches title
  var h1Match = mdxContent.match(/^#\s+(.*?)$/m);
  
  if (!h1Match) {
    // Add H1 that matches the title
    var updatedContent = "# " + data.title + "\n\n" + mdxContent;
    return matter.stringify(updatedContent, data);
  } else if (h1Match[1] !== data.title) {
    // Replace the existing H1 with title from frontmatter
    var updatedContent = mdxContent.replace(/^#\s+.*$/m, "# " + data.title);
    return matter.stringify(updatedContent, data);
  }
  
  return content;
}

/**
 * Fix code block syntax
 */
function fixCodeBlockSyntax(content) {
  var parsed = matter(content);
  var data = parsed.data;
  var mdxContent = parsed.content;
  
  // Replace code blocks without language specification
  var updatedContent = mdxContent.replace(
    /```\s*\n([^`]+?)```/g, 
    function(match, codeContent) {
      // Try to guess the language or default to "js"
      var language = "js";
      
      // Simple heuristics for language detection
      if (codeContent.includes('<html>') || codeContent.includes('</div>')) {
        language = "html";
      } else if (codeContent.includes(':root') || codeContent.includes('@media')) {
        language = "css";
      } else if (codeContent.includes('import React') || codeContent.includes('export default')) {
        language = "jsx";
      } else if (codeContent.includes('interface ') || codeContent.includes('type ')) {
        language = "ts";
      } else if (codeContent.includes('$') || codeContent.includes('apt-get')) {
        language = "bash";
      }
      
      return '```' + language + '\n' + codeContent + '```';
    }
  );
  
  if (updatedContent !== mdxContent) {
    return matter.stringify(updatedContent, data);
  }
  
  return content;
}

/**
 * Fix list style consistency
 */
function fixListStyles(content) {
  var parsed = matter(content);
  var data = parsed.data;
  var mdxContent = parsed.content;
  
  // Standardize unordered lists to use dashes
  var updatedContent = mdxContent.replace(
    /^(\s*)[*+](\s+)/gm,
    '$1-$2'
  );
  
  if (updatedContent !== mdxContent) {
    return matter.stringify(updatedContent, data);
  }
  
  return content;
}

/**
 * Fix or add reading time
 */
function fixReadingTimeFormat(content) {
  var parsed = matter(content);
  var data = parsed.data;
  var mdxContent = parsed.content;
  
  var readingTimeValue = data.readingTime;
  
  // If no reading time exists, calculate it
  if (!readingTimeValue) {
    var stats = readingTime(mdxContent);
    readingTimeValue = Math.ceil(stats.minutes) + " min read";
  } else {
    // Ensure reading time is in format "X min read"
    var readingTimeStr = readingTimeValue.toString();
    
    // If it's just a number, add "min read"
    if (/^\d+$/.test(readingTimeStr.trim())) {
      readingTimeStr = readingTimeStr + " min read";
    }
    // If it's "X min", change to "X min read"
    else if (/^\d+\s*min$/.test(readingTimeStr.trim())) {
      readingTimeStr = readingTimeStr.trim().replace(/min$/, 'min read');
    }
    // If it doesn't have "read", add it
    else if (!readingTimeStr.toLowerCase().includes('read')) {
      readingTimeStr = readingTimeStr.trim() + " read";
    }
    
    readingTimeValue = readingTimeStr;
  }
  
  // Update frontmatter
  var updatedFrontmatter = {};
  for (var key in data) {
    updatedFrontmatter[key] = data[key];
  }
  updatedFrontmatter.readingTime = readingTimeValue;

  // Reconstruct the file content
  return matter.stringify(mdxContent, updatedFrontmatter);
}

/**
 * Fix incomplete or missing description
 */
function fixDescription(content) {
  var parsed = matter(content);
  var data = parsed.data;
  var mdxContent = parsed.content;
  
  if (!data.description || typeof data.description === 'string' && 
     (data.description.endsWith('>-') || data.description.includes('...'))) {
    
    var textContent = mdxContent
      .replace(/^#.*$/m, '') // Remove H1
      .trim();
    
    // Try to find the first paragraph
    var firstParagraph = textContent.split(/\n\n/)[0];
    
    var newDescription = firstParagraph || '';
    newDescription = newDescription.replace(/<.*?>/g, ''); // Remove HTML tags
    newDescription = newDescription.replace(/\[.*?\]\(.*?\)/g, ''); // Remove Markdown links
    
    // Trim to reasonable length
    if (newDescription.length > 155) {
      newDescription = newDescription.substring(0, 155).trim() + '...';
    }
    
    // Update frontmatter
    var updatedFrontmatter = {};
    for (var key in data) {
      updatedFrontmatter[key] = data[key];
    }
    updatedFrontmatter.description = newDescription;

    // Reconstruct the file content
    return matter.stringify(mdxContent, updatedFrontmatter);
  }
  
  return content;
}

/**
 * Add missing frontmatter fields
 */
function addMissingFrontmatter(content, fileName) {
  var parsed = matter(content);
  var data = parsed.data;
  var mdxContent = parsed.content;
  
  var updated = {};
  for (var key in data) {
    updated[key] = data[key];
  }
  
  var isUpdated = false;
  
  // Extract title root for slugs
  var titleRoot = data.title || path.basename(fileName, path.extname(fileName))
    .replace(/-/g, ' ')
    .replace(/\b\w/g, function(l) { return l.toUpperCase(); });
  
  // Add missing title
  if (!updated.title) {
    updated.title = titleRoot;
    isUpdated = true;
  }
  
  // Add missing description
  if (!updated.description) {
    updated.description = "A comprehensive guide to understanding " + titleRoot.toLowerCase();
    isUpdated = true;
  }
  
  // Add missing date
  if (!updated.date) {
    updated.date = new Date().toISOString().split('T')[0];
    isUpdated = true;
  }
  
  // Add missing coverImage
  if (!updated.coverImage) {
    // Generate a default cover image path based on slug or title
    var slug = data.slug || fileName.replace(/\.(mdx?|js|ts)$/, '');
    updated.coverImage = "/images/learn/" + slug + "-cover.jpg";
    isUpdated = true;
  }
  
  // Add missing category
  if (!updated.category) {
    // Try to extract category from title or filename
    var category = "Insurance";
    var lowerTitle = titleRoot.toLowerCase();
    
    for (var cKey in CATEGORY_MAP) {
      if (lowerTitle.includes(cKey)) {
        category = CATEGORY_MAP[cKey];
        break;
      }
    }
    
    updated.category = category;
    isUpdated = true;
  }
  
  // Add reading time if missing
  if (!updated.readingTime) {
    var stats = readingTime(mdxContent);
    updated.readingTime = Math.ceil(stats.minutes) + " min read";
    isUpdated = true;
  }
  
  if (isUpdated) {
    return matter.stringify(mdxContent, updated);
  }
  
  return content;
}

/**
 * Get list of rule violations in a file
 */
function lintFile(content, fileName) {
  var issues = [];
  var parsed = matter(content);
  var data = parsed.data;
  
  // Check required frontmatter
  for (var i = 0; i < REQUIRED_FRONTMATTER.length; i++) {
    var field = REQUIRED_FRONTMATTER[i];
    if (!data[field]) {
      issues.push("Missing required frontmatter field: " + field);
    }
  }
  
  // Check for H1
  var h1Match = content.match(/^#\s+(.*?)$/m);
  if (!h1Match) {
    issues.push(RULES.MUST_HAVE_H1);
  } else if (data.title && h1Match[1] !== data.title) {
    issues.push("H1 heading \"" + h1Match[1] + "\" does not match title in frontmatter \"" + data.title + "\"");
  }
  
  // Check description format
  if (typeof data.description === 'string' && 
     (data.description.endsWith('>-') || data.description.includes('...'))) {
    issues.push(RULES.FULL_DESCRIPTION);
  }
  
  // Check reading time format
  if (data.readingTime) {
    var readingTimeStr = data.readingTime.toString();
    if (!readingTimeStr.match(/^\d+\s*min\s*read$/i)) {
      issues.push(RULES.READING_TIME_FORMAT);
    }
  }
  
  // Check for code blocks without language
  if (content.match(/```\s*\n[^`]+?```/g)) {
    issues.push(RULES.CODE_BLOCK_SYNTAX);
  }
  
  // Check for inconsistent list styles
  if (content.match(/^(\s*)[*+](\s+)/gm)) {
    issues.push(RULES.CONSISTENT_LIST_STYLE);
  }
  
  // Check for markdown links to internal pages (should use Link component)
  if (content.match(/\[([^\]]+)\]\(\/([^)]+)\)/g)) {
    issues.push(RULES.LINK_COMPONENT_USAGE);
  }
  
  return issues;
}

/**
 * Fix all issues in a file
 */
function fixIssues(content, fileName) {
  var updatedContent = content;
  
  // Add missing frontmatter
  updatedContent = addMissingFrontmatter(updatedContent, fileName);
  
  // Fix or ensure H1 heading
  updatedContent = fixHeadingHierarchy(updatedContent);
  
  // Fix code block syntax
  updatedContent = fixCodeBlockSyntax(updatedContent);
  
  // Fix list styles
  updatedContent = fixListStyles(updatedContent);
  
  // Fix reading time
  updatedContent = fixReadingTimeFormat(updatedContent);
  
  // Fix description
  updatedContent = fixDescription(updatedContent);
  
  // Convert Markdown links to Next.js Link components
  updatedContent = convertToNextLinks(updatedContent);
  
  return updatedContent;
}

/**
 * Convert MD files to MDX
 */
function convertMdToMdx(filePath) {
  return new Promise(function(resolve, reject) {
    if (filePath.endsWith('.md')) {
      readFile(filePath, 'utf8')
        .then(function(content) {
          var newPath = filePath.replace(/\.md$/, '.mdx');
          
          // Apply all standardizations before conversion
          var updatedContent = fixIssues(content, path.basename(filePath));
          
          // Write the new MDX file
          return writeFile(newPath, updatedContent, 'utf8')
            .then(function() {
              // Remove the old MD file
              return fs.promises.unlink(filePath);
            })
            .then(function() {
              console.log("✅ Converted " + path.basename(filePath) + " to " + path.basename(newPath));
              resolve(true);
            });
        })
        .catch(function(err) {
          reject(err);
        });
    } else {
      resolve(false);
    }
  });
}

/**
 * Process a single file
 */
function processFile(filePath) {
  return new Promise(function(resolve, reject) {
    // Convert MD to MDX if needed
    convertMdToMdx(filePath)
      .then(function(wasConverted) {
        // If the file was converted, we're already using the new path
        var currentPath = wasConverted ? filePath.replace(/\.md$/, '.mdx') : filePath;
        
        return readFile(currentPath, 'utf8')
          .then(function(content) {
            var issues = lintFile(content, path.basename(currentPath));
            var updatedContent = fixIssues(content, path.basename(currentPath));
            
            // Write back the updated content if it changed
            if (updatedContent !== content) {
              return writeFile(currentPath, updatedContent, 'utf8')
                .then(function() {
                  console.log("✅ Fixed issues in " + path.basename(currentPath));
                  resolve({
                    file: path.basename(currentPath),
                    issues: issues,
                    fixed: true,
                    wasConverted: wasConverted
                  });
                });
            } else if (issues.length === 0) {
              console.log("✅ No issues found in " + path.basename(currentPath));
              resolve({
                file: path.basename(currentPath),
                issues: issues,
                fixed: false,
                wasConverted: wasConverted
              });
            } else {
              console.log("❌ Unfixed issues in " + path.basename(currentPath) + ":");
              issues.forEach(function(issue) {
                console.log("   - " + issue);
              });
              resolve({
                file: path.basename(currentPath),
                issues: issues,
                fixed: false,
                wasConverted: wasConverted
              });
            }
          });
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

/**
 * Process all files in a directory recursively
 */
function processDirectory(dirPath) {
  return readDir(dirPath, { withFileTypes: true })
    .then(function(entries) {
      var promises = [];
      
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var entryPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          promises.push(processDirectory(entryPath));
        } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
          promises.push(processFile(entryPath).then(function(result) {
            return [result];
          }));
        }
      }
      
      return Promise.all(promises)
        .then(function(results) {
          // Flatten the array of arrays
          return results.reduce(function(acc, val) {
            return acc.concat(val);
          }, []);
        });
    });
}

/**
 * Generate a report of the linting and fixing process
 */
function generateReport(results) {
  var fixedCount = 0;
  var fileWithIssues = 0;
  var convertedCount = 0;
  
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    if (result.fixed) fixedCount++;
    if (result.issues.length > 0) fileWithIssues++;
    if (result.wasConverted) convertedCount++;
  }
  
  console.log('\n===== MDX Lint & Standardization Report =====');
  console.log("Total MDX/MD files processed: " + results.length);
  console.log("MD files converted to MDX: " + convertedCount);
  console.log("Files with issues: " + fileWithIssues);
  console.log("Files fixed automatically: " + fixedCount);
  console.log('==========================================\n');
  
  if (fileWithIssues > fixedCount) {
    console.log('⚠️  Some issues require manual fixing. Please review the logs above.');
  } else if (fileWithIssues > 0) {
    console.log('✅ All issues were fixed automatically.');
  } else {
    console.log('✅ All files meet the standards.');
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Starting MDX linting and standardization process...');
  processDirectory(CONTENT_DIR)
    .then(function(results) {
      generateReport(results);
    })
    .catch(function(error) {
      console.error('Error:', error);
      process.exit(1);
    });
}

main();
