#!/bin/bash

# Fix MDX rendering issues in Next.js App Router project
# This script updates the MDX components and rendering approach to work with server components

echo "Starting MDX rendering fixes for App Router..."

# 1. Update or create mdx-components.tsx
echo "Creating or updating src/components/mdx-components.tsx..."
mkdir -p src/components
cat > src/components/mdx-components.tsx << 'EOL'
import Link from 'next/link'
import CustomLink from '@/components/CustomLink'
import MDXHeadWrapper from '@/components/MDXHeadWrapper'

export const mdxComponents = {
  // Use MDXHeadWrapper instead of Head for App Router compatibility
  Head: MDXHeadWrapper,
  Link,
  a: CustomLink
}
EOL

echo "✓ Updated src/components/mdx-components.tsx"

# 2. Create MdxClient.tsx
echo "Creating src/components/MdxClient.tsx..."
cat > src/components/MdxClient.tsx << 'EOL'
'use client'

import { MDXRemote } from 'next-mdx-remote'
import { mdxComponents } from '@/components/mdx-components'

export function MdxClient({ source }) {
  return <MDXRemote {...source} components={mdxComponents} />
}
EOL

echo "✓ Created src/components/MdxClient.tsx"

# 3. Create MDXHeadWrapper if it doesn't exist
echo "Creating src/components/MDXHeadWrapper.tsx if needed..."
if [ ! -f "src/components/MDXHeadWrapper.tsx" ]; then
  cat > src/components/MDXHeadWrapper.tsx << 'EOL'
'use client'

// This component is a safe wrapper for Head in MDX files with App Router
// It intentionally does nothing since App Router uses metadata exports instead
export default function MDXHeadWrapper({ children }) {
  // In App Router, head elements should be managed through metadata exports
  // This is just a placeholder to prevent errors from MDX files that use <Head>
  return null;
}
EOL
  echo "✓ Created src/components/MDXHeadWrapper.tsx"
else
  echo "✓ MDXHeadWrapper.tsx already exists"
fi

# 4. Find all page.tsx files under app/learn/[slug] (and similar patterns)
echo "Finding and updating page.tsx files that use MDXRemote..."

# Store all page files that need to be processed
PAGE_FILES=$(grep -l "MDXRemote" --include="*page.tsx" -r src/app/)

if [ -z "$PAGE_FILES" ]; then
  echo "No page files using MDXRemote found."
else
  echo "Found page files using MDXRemote. Updating imports and component usage..."
  
  for FILE in $PAGE_FILES; do
    echo "Processing $FILE"
    
    # 1. Add MdxClient import if it doesn't exist
    if ! grep -q "import { MdxClient } from '@/components/MdxClient'" "$FILE"; then
      # Add the import after the last import statement
      sed -i '' '/^import/!b;:a;n;/^import/ba;i\
import { MdxClient } from '"'"'@/components/MdxClient'"'"';
      ' "$FILE"
      echo "  ✓ Added MdxClient import"
    else
      echo "  ✓ MdxClient import already exists"
    fi
    
    # 2. Remove import for mdxComponents if it exists
    if grep -q "import { mdxComponents } from '@/components/mdx-components'" "$FILE"; then
      sed -i '' "/import { mdxComponents } from '@\/components\/mdx-components'/d" "$FILE"
      echo "  ✓ Removed mdxComponents import"
    fi
    
    # 3. Remove import for Head if it exists (since we handle it in mdxComponents)
    if grep -q "import Head from 'next/head'" "$FILE"; then
      sed -i '' "/import Head from 'next\/head'/d" "$FILE"
      echo "  ✓ Removed Head import"
    fi
    
    # 4. Replace MDXRemote component with MdxClient
    if grep -q "<MDXRemote" "$FILE"; then
      # Replace MDXRemote component with MdxClient
      # Different patterns to match various ways MDXRemote is used
      sed -i '' 's/<MDXRemote source={[^}]*} components={mdxComponents} \/>/<MdxClient source={article.content} \/>/g' "$FILE"
      sed -i '' 's/<MDXRemote source={[^}]*} components={mdxComponents}[^/>]*\/>/<MdxClient source={article.content} \/>/g' "$FILE"
      sed -i '' 's/<MDXRemote source={[^}]*} components={mdxComponents}>/<MdxClient source={article.content}>/g' "$FILE"
      sed -i '' 's/<MDXRemote source={[^}]*}[^/>]*\/>/<MdxClient source={article.content} \/>/g' "$FILE"
      sed -i '' 's/<MDXRemote source={[^}]*}>/<MdxClient source={article.content}>/g' "$FILE"
      sed -i '' 's/<MDXRemote[^>]*source={article.content}[^>]*>/<MdxClient source={article.content}>/g' "$FILE"
      sed -i '' 's/<\/MDXRemote>/<\/MdxClient>/g' "$FILE"
      echo "  ✓ Replaced MDXRemote with MdxClient"
    fi
  done
fi

# 5. Clean up MDX files by removing Head blocks and imports
echo "Cleaning up MDX files by removing Head imports and blocks..."

# Find all MDX files
MDX_FILES=$(find src/content -name "*.mdx" 2>/dev/null)

if [ -z "$MDX_FILES" ]; then
  echo "No MDX files found in src/content. Checking other directories..."
  MDX_FILES=$(find src -name "*.mdx" 2>/dev/null)
fi

if [ -z "$MDX_FILES" ]; then
  echo "No MDX files found."
else
  echo "Found MDX files. Cleaning up Head imports and blocks..."
  
  for FILE in $MDX_FILES; do
    echo "Cleaning $FILE"
    
    # Remove import statements for Head
    sed -i '' "/import Head from 'next\/head'/d" "$FILE"
    
    # Remove Head blocks (this is more complex and might need adjustment)
    # Simple approach: remove lines between <Head> and </Head>
    sed -i '' '/<Head>/,/<\/Head>/d' "$FILE"
    
    echo "  ✓ Cleaned up $FILE"
  done
fi

echo "All done! MDX rendering issues for App Router should now be fixed."
echo "Please build and test your application."
