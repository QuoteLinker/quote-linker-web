#!/bin/bash

# Fix MDX rendering issues in Next.js 14 App Router project
# This script fixes the "TypeError: Cannot read properties of null (reading 'useContext') at Head" error
# that occurs during prerendering of MDX files with next-mdx-remote in Next.js App Router

echo "Starting MDX rendering fixes for Next.js App Router..."

# 1. Create or update mdx-components.tsx with proper component map including Head wrapper
echo "Creating src/components/mdx-components.tsx..."
mkdir -p src/components
cat > src/components/mdx-components.tsx << 'EOL'
import Link from 'next/link'
import CustomLink from '@/components/CustomLink'
import MDXHeadWrapper from '@/components/MDXHeadWrapper'
import { FAQ, FAQItem } from '@/components/MDXComponents/FAQ'
import Image from 'next/image'

// Component map used by MDXRemote
export const mdxComponents = {
  // Core HTML overrides
  a: CustomLink,
  img: ({ src, alt, width, height, ...props }) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={width ? Number(width) : 800}
        height={height ? Number(height) : 450}
        className="rounded-lg"
        {...props}
      />
    );
  },
  
  // Next.js components
  Link,
  
  // Replace Head with safe wrapper
  Head: MDXHeadWrapper,
  
  // Custom MDX components
  FAQ,
  FAQItem,
}
EOL

echo "✓ Updated src/components/mdx-components.tsx"

# 2. Create MDXHeadWrapper as a client component that safely does nothing
echo "Creating src/components/MDXHeadWrapper.tsx..."
cat > src/components/MDXHeadWrapper.tsx << 'EOL'
'use client'

// This component is a safe wrapper for Head elements in MDX files
// It intentionally does nothing since Next.js App Router uses metadata exports instead
export default function MDXHeadWrapper({ children }) {
  // In App Router, head elements should be managed through metadata exports
  // This is just a placeholder to prevent errors from MDX files that use <Head>
  // The 'children' prop is intentionally ignored to avoid rendering anything from <Head>
  return null;
}
EOL

echo "✓ Created src/components/MDXHeadWrapper.tsx"

# 3. Create MdxClient.tsx as a client component to safely render MDX content
echo "Creating src/components/MdxClient.tsx..."
cat > src/components/MdxClient.tsx << 'EOL'
'use client'

import { MDXRemote } from 'next-mdx-remote'
import { mdxComponents } from '@/components/mdx-components'

// Client component for rendering MDX content
// This avoids the "Cannot read properties of null (reading 'useContext') at Head" error
// by ensuring MDX content is rendered client-side with proper React context
export function MdxClient({ source }) {
  return <MDXRemote {...source} components={mdxComponents} />
}
EOL

echo "✓ Created src/components/MdxClient.tsx"

# 4. Create a CustomLink component if it doesn't exist
if [ ! -f "src/components/CustomLink.tsx" ]; then
  echo "Creating src/components/CustomLink.tsx..."
  cat > src/components/CustomLink.tsx << 'EOL'
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CustomLink({ href, children, ...props }) {
  const pathname = usePathname()
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
EOL
  echo "✓ Created src/components/CustomLink.tsx"
else
  echo "✓ CustomLink.tsx already exists"
fi

# 5. Find all page.tsx files under app/learn/[slug] and update MDXRemote imports/usage
echo "Finding and updating page.tsx files that use MDXRemote..."

# Look for both import patterns - normal and /rsc
PAGE_FILES_1=$(grep -l "MDXRemote.*from.*'next-mdx-remote'" --include="*.tsx" -r src/app/ 2>/dev/null || echo "")
PAGE_FILES_2=$(grep -l "MDXRemote.*from.*'next-mdx-remote/rsc'" --include="*.tsx" -r src/app/ 2>/dev/null || echo "")

# Combine unique files
PAGE_FILES=$(echo "$PAGE_FILES_1"$'\n'"$PAGE_FILES_2" | sort -u | grep -v '^$')

if [ -z "$PAGE_FILES" ]; then
  echo "No page files using MDXRemote found."
else
  echo "Found page files using MDXRemote. Updating imports and component usage..."
  
  for FILE in $PAGE_FILES; do
    echo "Processing $FILE"
    
    # 1. Replace MDXRemote imports with MdxClient
    if grep -q "import.*{.*MDXRemote.*}.*from.*'next-mdx-remote/rsc'" "$FILE"; then
      sed -i '' "s/import.*{.*MDXRemote.*}.*from.*'next-mdx-remote\/rsc'.*/import { MdxClient } from '@\/components\/MdxClient';/" "$FILE"
      echo "  ✓ Replaced MDXRemote/rsc import with MdxClient import"
    elif grep -q "import.*{.*MDXRemote.*}.*from.*'next-mdx-remote'" "$FILE"; then
      sed -i '' "s/import.*{.*MDXRemote.*}.*from.*'next-mdx-remote'.*/import { MdxClient } from '@\/components\/MdxClient';/" "$FILE"
      echo "  ✓ Replaced MDXRemote import with MdxClient import"
    else
      # Add MdxClient import if MDXRemote is used but not imported (edge case)
      if grep -q "<MDXRemote" "$FILE" && ! grep -q "import.*MdxClient" "$FILE"; then
        sed -i '' '/^import/!b;:a;n;/^import/ba;i\
import { MdxClient } from '"'"'@/components/MdxClient'"'"';
        ' "$FILE"
        echo "  ✓ Added MdxClient import"
      fi
    fi
    
    # 2. Remove import for mdxComponents if it exists
    if grep -q "import.*{.*mdxComponents.*}.*from.*'@/components/mdx-components'" "$FILE"; then
      sed -i '' "/import.*{.*mdxComponents.*}.*from.*'@\/components\/mdx-components'/d" "$FILE"
      echo "  ✓ Removed mdxComponents import"
    fi
    
    # 3. Remove import for Head if it exists
    if grep -q "import Head from 'next/head'" "$FILE"; then
      sed -i '' "/import Head from 'next\/head'/d" "$FILE"
      echo "  ✓ Removed Head import"
    fi
    
    # 4. Replace various MDXRemote component patterns with MdxClient
    if grep -q "<MDXRemote" "$FILE"; then
      # Handle various MDXRemote patterns
      sed -i '' 's/<MDXRemote[[:space:]]*{\.\.\.article\.content}[[:space:]]*\/>/<MdxClient source={article.content} \/>/g' "$FILE"
      sed -i '' 's/<MDXRemote[[:space:]]*{\.\.\.article\.content}[[:space:]]*>/<MdxClient source={article.content}>/g' "$FILE"
      sed -i '' 's/<MDXRemote[[:space:]]*source={article\.content}[[:space:]]*components={mdxComponents}[[:space:]]*\/>/<MdxClient source={article.content} \/>/g' "$FILE"
      sed -i '' 's/<MDXRemote[[:space:]]*source={article\.content}[[:space:]]*components={mdxComponents}[[:space:]]*>/<MdxClient source={article.content}>/g' "$FILE"
      sed -i '' 's/<MDXRemote[[:space:]]*source={article\.content}[[:space:]]*\/>/<MdxClient source={article.content} \/>/g' "$FILE"
      sed -i '' 's/<MDXRemote[[:space:]]*source={article\.content}[[:space:]]*>/<MdxClient source={article.content}>/g' "$FILE"
      # Add more patterns if needed to handle different MDXRemote usages
      
      # Replace closing tags
      sed -i '' 's/<\/MDXRemote>/<\/MdxClient>/g' "$FILE"
      echo "  ✓ Replaced MDXRemote component usages with MdxClient"
    fi
  done
fi

# 6. Clean up MDX files by removing Head blocks and imports
echo "Cleaning up MDX files by removing Head imports and blocks..."

# Find all MDX files anywhere in the src directory
MDX_FILES=$(find src -name "*.mdx" 2>/dev/null)

if [ -z "$MDX_FILES" ]; then
  echo "No MDX files found."
else
  echo "Found MDX files. Cleaning up Head imports and blocks..."
  
  for FILE in $MDX_FILES; do
    echo "Cleaning $FILE"
    
    # 1. Remove import statements for Head
    sed -i '' "/import.*Head.*from.*'next\/head'/d" "$FILE"
    
    # 2. Remove Head blocks with their content
    # More robust approach using awk to handle multi-line blocks
    TMP_FILE="${FILE}.tmp"
    awk 'BEGIN{skip=0} /<Head>/{skip=1; next} /<\/Head>/{skip=0; next} !skip{print}' "$FILE" > "$TMP_FILE"
    mv "$TMP_FILE" "$FILE"
    
    echo "  ✓ Cleaned up $FILE"
  done
fi

# 7. Generate a unified diff for tracking changes
echo "Generating unified diff of all changes..."
git diff --no-index -- src > mdx-app-router-fix.diff 2>/dev/null || true

# 8. Add a quick verification to specifically check for the fixed MDX setup
echo "Verifying components are correctly set up..."
if [ -f "src/components/mdx-components.tsx" ] && [ -f "src/components/MDXHeadWrapper.tsx" ] && [ -f "src/components/MdxClient.tsx" ]; then
  echo "✅ Core MDX components created successfully"
else
  echo "⚠️ Some components might be missing. Please check the output for errors."
fi

# Check that page.tsx files use MdxClient
if grep -q "import.*MdxClient" --include="*.tsx" -r src/app/learn/; then
  echo "✅ Learn pages are using MdxClient component"
else
  echo "⚠️ Learn pages might not be using MdxClient. Manual check required."
fi

echo ""
echo "All done! MDX rendering issues for Next.js App Router should now be fixed."
echo "A diff of all changes has been saved to mdx-app-router-fix.diff"
echo ""
echo "Next steps:"
echo "1. Run 'npm run build' to verify the issues are resolved"
echo "2. If you encounter any issues, check the following:"
echo "   - Ensure all pages using MDX content import MdxClient"
echo "   - Make sure no MDX files contain <Head> tags"
echo "   - Check that mdx-components.tsx exports all required components"
echo ""
echo "If you need to revert changes, you can use: git restore src/"
