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
var remarkFn = require('remark');
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
  const { data, content: mdxContent } = matter(content);
  
  // Check if H1 exists and matches title
  const h1Match = mdxContent.match(/^#\s+(.*?)$/m);
  
  if (!h1Match) {
    // Add H1 that matches the title
    const updatedContent = `# ${data.title}\n\n${mdxContent}`;
    return matter.stringify(updatedContent, data);
  } else if (h1Match[1] !== data.title) {
    // Replace the existing H1 with title from frontmatter
    const updatedContent = mdxContent.replace(/^#\s+.*$/m, `# ${data.title}`);
    return matter.stringify(updatedContent, data);
  }
  
  return content;
}

/**
 * Fix code block syntax
 */
function fixCodeBlockSyntax(content) {
  const { data, content: mdxContent } = matter(content);
  
  // Replace code blocks without language specification
  let updatedContent = mdxContent.replace(
    /```\s*\n([^`]+?)```/g, 
    (match, codeContent) => {
      // Try to guess the language or default to "js"
      let language = "js";
      
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
  const { data, content: mdxContent } = matter(content);
  
  // Standardize unordered lists to use dashes
  let updatedContent = mdxContent.replace(
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
  const { data, content: mdxContent } = matter(content);
  
  let readingTimeValue = data.readingTime;
  
  // If no reading time exists, calculate it
  if (!readingTimeValue) {
    const stats = readingTime(mdxContent);
    readingTimeValue = `${Math.ceil(stats.minutes)} min read`;
  } else {
    // Ensure reading time is in format "X min read"
    let readingTimeStr = readingTimeValue.toString();
    
    // If it's just a number, add "min read"
    if (/^\d+$/.test(readingTimeStr.trim())) {
      readingTimeStr = `${readingTimeStr} min read`;
    }
    // If it's "X min", change to "X min read"
    else if (/^\d+\s*min$/.test(readingTimeStr.trim())) {
      readingTimeStr = readingTimeStr.trim().replace(/min$/, 'min read');
    }
    // If it doesn't have "read", add it
    else if (!readingTimeStr.toLowerCase().includes('read')) {
      readingTimeStr = `${readingTimeStr.trim()} read`;
    }
    
    readingTimeValue = readingTimeStr;
  }
  
  // Update frontmatter
  const updatedFrontmatter = {
    ...data,
    readingTime: readingTimeValue
  };

  // Reconstruct the file content
  return matter.stringify(mdxContent, updatedFrontmatter);
}

/**
 * Fix incomplete or missing description
 */
function fixDescription(content) {
  const { data, content: mdxContent } = matter(content);
  
  if (!data.description || typeof data.description === 'string' && 
     (data.description.endsWith('>-') || data.description.includes('...'))) {
    // Extract first paragraph for description
    const processor = remark().use(strip);
    
    let textContent = mdxContent
      .replace(/^#.*$/m, '') // Remove H1
      .trim();
    
    // Try to find the first paragraph
    const firstParagraph = textContent.split(/\n\n/)[0];
    
    let newDescription = firstParagraph || '';
    newDescription = newDescription.replace(/<.*?>/g, ''); // Remove HTML tags
    newDescription = newDescription.replace(/\[.*?\]\(.*?\)/g, ''); // Remove Markdown links
    
    // Trim to reasonable length
    if (newDescription.length > 155) {
      newDescription = newDescription.substring(0, 155).trim() + '...';
    }
    
    // Update frontmatter
    const updatedFrontmatter = {
      ...data,
      description: newDescription
    };

    // Reconstruct the file content
    return matter.stringify(mdxContent, updatedFrontmatter);
  }
  
  return content;
}

/**
 * Add missing frontmatter fields
 */
function addMissingFrontmatter(content, fileName) {
  const { data, content: mdxContent } = matter(content);
  const updated = { ...data };
  let isUpdated = false;
  
  // Extract title root for slugs
  const titleRoot = data.title || path.basename(fileName, path.extname(fileName))
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  // Add missing title
  if (!updated.title) {
    updated.title = titleRoot;
    isUpdated = true;
  }
  
  // Add missing description
  if (!updated.description) {
    updated.description = `A comprehensive guide to understanding ${titleRoot.toLowerCase()}`;
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
    const slug = data.slug || fileName.replace(/\.(mdx?|js|ts)$/, '');
    updated.coverImage = `/images/learn/${slug}-cover.jpg`;
    isUpdated = true;
  }
  
  // Add missing category
  if (!updated.category) {
    // Try to extract category from title or filename
    let category = "Insurance";
    const lowerTitle = titleRoot.toLowerCase();
    
    for (const [key, value] of Object.entries(CATEGORY_MAP)) {
      if (lowerTitle.includes(key)) {
        category = value;
        break;
      }
    }
    
    updated.category = category;
    isUpdated = true;
  }
  
  // Add reading time if missing
  if (!updated.readingTime) {
    const stats = readingTime(mdxContent);
    updated.readingTime = `${Math.ceil(stats.minutes)} min read`;
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
async function lintFile(content, fileName) {
  const issues = [];
  const { data } = matter(content);
  
  // Use remark to lint content
  const file = await remark()
    .use(remarkLint)
    .use(remarkPresetLintRecommended)
    .use(remarkPresetLintConsistent)
    .use(remarkGfm)
    .process(content);
  
  // Add remark-lint issues
  if (file.messages.length > 0) {
    file.messages.forEach(message => {
      issues.push(`${message.reason} (line ${message.position?.start?.line || '?'})`);
    });
  }
  
  // Check required frontmatter
  REQUIRED_FRONTMATTER.forEach(field => {
    if (!data[field]) {
      issues.push(`Missing required frontmatter field: ${field}`);
    }
  });
  
  // Check for H1
  const h1Match = content.match(/^#\s+(.*?)$/m);
  if (!h1Match) {
    issues.push(RULES.MUST_HAVE_H1);
  } else if (data.title && h1Match[1] !== data.title) {
    issues.push(`H1 heading "${h1Match[1]}" does not match title in frontmatter "${data.title}"`);
  }
  
  // Check description format
  if (typeof data.description === 'string' && 
     (data.description.endsWith('>-') || data.description.includes('...'))) {
    issues.push(RULES.FULL_DESCRIPTION);
  }
  
  // Check reading time format
  if (data.readingTime) {
    const readingTimeStr = data.readingTime.toString();
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
async function fixIssues(content, fileName) {
  let updatedContent = content;
  
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
async function convertMdToMdx(filePath) {
  if (filePath.endsWith('.md')) {
    const content = await readFile(filePath, 'utf8');
    const newPath = filePath.replace(/\.md$/, '.mdx');
    
    // Apply all standardizations before conversion
    const updatedContent = await fixIssues(content, path.basename(filePath));
    
    // Write the new MDX file
    await writeFile(newPath, updatedContent, 'utf8');
    
    // Remove the old MD file
    await fs.promises.unlink(filePath);
    
    console.log(`✅ Converted ${path.basename(filePath)} to ${path.basename(newPath)}`);
    return true;
  }
  return false;
}

/**
 * Process a single file
 */
async function processFile(filePath) {
  // Convert MD to MDX if needed
  const wasConverted = await convertMdToMdx(filePath);
  
  // If the file was converted, we're already using the new path
  const currentPath = wasConverted ? filePath.replace(/\.md$/, '.mdx') : filePath;
  
  const content = await readFile(currentPath, 'utf8');
  const issues = await lintFile(content, path.basename(currentPath));
  const updatedContent = await fixIssues(content, path.basename(currentPath));
  
  // Write back the updated content if it changed
  if (updatedContent !== content) {
    await writeFile(currentPath, updatedContent, 'utf8');
    console.log(`✅ Fixed issues in ${path.basename(currentPath)}`);
    return {
      file: path.basename(currentPath),
      issues,
      fixed: true,
      wasConverted
    };
  } else if (issues.length === 0) {
    console.log(`✅ No issues found in ${path.basename(currentPath)}`);
    return {
      file: path.basename(currentPath),
      issues,
      fixed: false,
      wasConverted
    };
  } else {
    console.log(`❌ Unfixed issues in ${path.basename(currentPath)}:`);
    issues.forEach(issue => console.log(`   - ${issue}`));
    return {
      file: path.basename(currentPath),
      issues,
      fixed: false,
      wasConverted
    };
  }
}

/**
 * Process all files in a directory recursively
 */
async function processDirectory(dirPath) {
  const entries = await readDir(dirPath, { withFileTypes: true });
  let results = [];
  
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      const subResults = await processDirectory(entryPath);
      results = [...results, ...subResults];
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      const result = await processFile(entryPath);
      results.push(result);
    }
  }
  
  return results;
}

/**
 * Generate a report of the linting and fixing process
 */
function generateReport(results) {
  let fixedCount = 0;
  let fileWithIssues = 0;
  let convertedCount = 0;
  
  results.forEach(result => {
    if (result.fixed) fixedCount++;
    if (result.issues.length > 0) fileWithIssues++;
    if (result.wasConverted) convertedCount++;
  });
  
  console.log('\n===== MDX Lint & Standardization Report =====');
  console.log(`Total MDX/MD files processed: ${results.length}`);
  console.log(`MD files converted to MDX: ${convertedCount}`);
  console.log(`Files with issues: ${fileWithIssues}`);
  console.log(`Files fixed automatically: ${fixedCount}`);
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
async function main() {
  try {
    console.log('🔍 Starting MDX linting and standardization process...');
    const results = await processDirectory(CONTENT_DIR);
    generateReport(results);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
