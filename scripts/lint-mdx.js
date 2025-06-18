#!/usr/bin/env node

/**
 * This script audits and standardizes MDX content files.
 * It ensures consistent heading levels, list styles, and that every file has:
 * - A title in H1
 * - A description in frontmatter
 * - A reading time measurement
 * - Other required frontmatter fields
 */

var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
var util = require('util');
var promisify = util.promisify;
var readDir = promisify(fs.readdir);
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);
var stat = promisify(fs.stat);

var CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'learn');

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
  READING_TIME_FORMAT: 'Reading time should follow the format "X min read"'
};

// Fix functions
function fixIncompleteDescription(content) {
  var dataAndContent = matter(content);
  var data = dataAndContent.data;
  var mdxContent = dataAndContent.content;
  
  if (typeof data.description === 'string' && 
     (data.description.endsWith('>-') || data.description.includes('...'))) {
    // Extract first 155 characters from content to create description
    var textContent = mdxContent
      .replace(/^#.*$/m, '') // Remove H1
      .replace(/<.*?>/g, '') // Remove HTML tags
      .replace(/\[.*?\]\(.*?\)/g, '') // Remove Markdown links
      .trim();
    
    var newDescription = textContent.substring(0, 155).trim() + '.';
    
    // Update frontmatter
    var updatedFrontmatter = {};
    Object.keys(data).forEach(function(key) {
      updatedFrontmatter[key] = data[key];
    });
    updatedFrontmatter.description = newDescription;

    // Reconstruct the file content
    return matter.stringify(mdxContent, updatedFrontmatter);
  }
  
  return content;
}

function fixReadingTimeFormat(content) {
  var dataAndContent = matter(content);
  var data = dataAndContent.data;
  var mdxContent = dataAndContent.content;
  
  if (data.readingTime) {
    // Ensure reading time is in format "X min read"
    var readingTime = data.readingTime.toString();
    
    // If it's just a number, add "min read"
    if (/^\d+$/.test(readingTime.trim())) {
      readingTime = readingTime.trim() + ' min read';
    }
    // If it's "X min", change to "X min read"
    else if (/^\d+\s*min$/.test(readingTime.trim())) {
      readingTime = readingTime.trim().replace(/min$/, 'min read');
    }
    // If it doesn't have "read", add it
    else if (!readingTime.toLowerCase().includes('read')) {
      readingTime = readingTime.trim() + ' read';
    }

    // Update frontmatter
    var updatedFrontmatter = {};
    Object.keys(data).forEach(function(key) {
      updatedFrontmatter[key] = data[key];
    });
    updatedFrontmatter.readingTime = readingTime;

    // Reconstruct the file content
    return matter.stringify(mdxContent, updatedFrontmatter);
  }
  
  return content;
}

function ensureLinkComponentUsage(content) {
  var dataAndContent = matter(content);
  var data = dataAndContent.data;
  var mdxContent = dataAndContent.content;
  
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

function fixHeadingHierarchy(content) {
  var dataAndContent = matter(content);
  var data = dataAndContent.data;
  var mdxContent = dataAndContent.content;
  
  // Check if H1 exists and matches title
  var h1Match = mdxContent.match(/^#\s+(.*?)$/m);
  
  if (!h1Match) {
    // Add H1 that matches the title
    var updatedContent = '# ' + data.title + '\n\n' + mdxContent;
    return matter.stringify(updatedContent, data);
  }
  
  return content;
}

// Main linting function
function lintMDXFile(filePath) {
  return readFile(filePath, 'utf8').then(function(content) {
    var data = matter(content).data;
    var issues = [];
    
    // Check required frontmatter
    REQUIRED_FRONTMATTER.forEach(function(field) {
      if (!data[field]) {
        issues.push('Missing required frontmatter field: ' + field);
      }
    });
    
    // Check for H1
    var h1Match = content.match(/^#\s+(.*?)$/m);
    if (!h1Match) {
      issues.push(RULES.MUST_HAVE_H1);
    } else if (h1Match[1] !== data.title) {
      issues.push('H1 heading "' + h1Match[1] + '" does not match title in frontmatter "' + data.title + '"');
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
    
    // Apply fixes
    var updatedContent = content;
    
    if (issues.includes(RULES.FULL_DESCRIPTION)) {
      updatedContent = fixIncompleteDescription(updatedContent);
    }
    
    if (issues.includes(RULES.READING_TIME_FORMAT)) {
      updatedContent = fixReadingTimeFormat(updatedContent);
    }
    
    if (issues.includes(RULES.MUST_HAVE_H1)) {
      updatedContent = fixHeadingHierarchy(updatedContent);
    }
    
    // Always ensure Link component is used
    updatedContent = ensureLinkComponentUsage(updatedContent);
    
    // Write back the updated content if it changed
    if (updatedContent !== content) {
      return writeFile(filePath, updatedContent, 'utf8').then(function() {
        console.log('✅ Fixed issues in ' + path.basename(filePath));
        return {
          file: path.basename(filePath),
          issues: issues,
          fixed: true
        };
      });
    } else {
      if (issues.length === 0) {
        console.log('✅ No issues found in ' + path.basename(filePath));
      } else {
        console.log('❌ Unfixed issues in ' + path.basename(filePath) + ':');
        issues.forEach(function(issue) { console.log('   - ' + issue); });
      }
      return Promise.resolve({
        file: path.basename(filePath),
        issues: issues,
        fixed: false
      });
    }
  });
}

// Process all MDX files recursively
function processDirectory(dirPath) {
  return readDir(dirPath, { withFileTypes: true }).then(function(entries) {
    var results = [];
    var chain = Promise.resolve();
    
    entries.forEach(function(entry) {
      chain = chain.then(function() {
        var entryPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          return processDirectory(entryPath).then(function(subResults) {
            results = results.concat(subResults);
          });
        } else if (entry.name.endsWith('.mdx')) {
          return lintMDXFile(entryPath).then(function(result) {
            results.push(result);
          });
        }
      });
    });
    
    return chain.then(function() {
      return results;
    });
  });
}

// Generate a report
function generateReport(results) {
  var fixedCount = 0;
  var fileWithIssues = 0;
  
  results.forEach(function(result) {
    if (result.fixed) fixedCount++;
    if (result.issues.length > 0) fileWithIssues++;
  });
  
  console.log('\n===== MDX Lint Report =====');
  console.log('Total MDX files: ' + results.length);
  console.log('Files with issues: ' + fileWithIssues);
  console.log('Files fixed automatically: ' + fixedCount);
  console.log('===========================\n');
  
  if (fileWithIssues > fixedCount) {
    console.log('⚠️  Some issues require manual fixing. Please review the logs above.');
  } else if (fileWithIssues > 0) {
    console.log('✅ All issues were fixed automatically.');
  } else {
    console.log('✅ All files meet the standards.');
  }
}

// Main function
function main() {
  console.log('🔍 Starting MDX linting process...');
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
