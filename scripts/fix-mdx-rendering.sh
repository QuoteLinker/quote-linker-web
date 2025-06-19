#!/bin/bash

# Fix MDX rendering issues in Next.js project
# This script updates MDX components to use a shared components file

echo "Updating MDX rendering components..."

# 1. First, ensure the mdx-components.tsx file has the correct content
cat > src/components/mdx-components.tsx << 'EOL'
import Head from 'next/head'
import Link from 'next/link'
import CustomLink from '@/components/CustomLink'

export const mdxComponents = {
  Head,
  Link,
  a: CustomLink
}
EOL

echo "✓ Updated src/components/mdx-components.tsx"

# 2. Find all file paths that might use MDXRemote
echo "Looking for files that use MDXRemote..."

# Store all files that need to be processed
MDX_FILES=$(grep -l "MDXRemote" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" -r src/)

if [ -z "$MDX_FILES" ]; then
  echo "No files using MDXRemote found."
else
  echo "Found files using MDXRemote. Updating imports and component usage..."
  
  for FILE in $MDX_FILES; do
    echo "Processing $FILE"
    
    # 3. Add mdxComponents import if it doesn't exist
    if ! grep -q "import { mdxComponents } from '@/components/mdx-components'" "$FILE"; then
      # Add the import after the last import statement
      sed -i '' '/^import/!b;:a;n;/^import/ba;i\
import { mdxComponents } from '"'"'@/components/mdx-components'"'"';
      ' "$FILE"
      echo "  ✓ Added mdxComponents import"
    else
      echo "  ✓ mdxComponents import already exists"
    fi
    
    # 4. Update MDXRemote component calls to include components={mdxComponents}
    if grep -q "<MDXRemote" "$FILE" && ! grep -q "components={mdxComponents}" "$FILE"; then
      sed -i '' 's/<MDXRemote\([^>]*\)>/<MDXRemote\1 components={mdxComponents}>/' "$FILE"
      echo "  ✓ Updated MDXRemote to include components prop"
    elif grep -q "components={mdxComponents}" "$FILE"; then
      echo "  ✓ MDXRemote already includes components prop"
    fi
  done
fi

# 5. Remove unnecessary Head and Link imports from MDX files
echo "Removing unnecessary Head and Link imports from MDX files..."

# Check for any .mdx files with Head or Link imports
MDX_WITH_IMPORTS=$(grep -l "import.*from 'next/\(head\|link\)'" --include="*.mdx" -r src/)

if [ -z "$MDX_WITH_IMPORTS" ]; then
  echo "No MDX files with direct Head/Link imports found."
else
  for FILE in $MDX_WITH_IMPORTS; do
    echo "Cleaning $FILE"
    # Remove import statements
    sed -i '' "/import.*from 'next\/head'/d" "$FILE"
    sed -i '' "/import.*from 'next\/link'/d" "$FILE"
    echo "  ✓ Removed unnecessary imports"
  done
fi

# 6. Remove duplicate Head and Link imports from page files that use MDXRemote
echo "Cleaning up page files that use MDXRemote..."

for FILE in $MDX_FILES; do
  if grep -q "mdxComponents" "$FILE"; then
    # If we have mdxComponents, we can remove direct imports of Head and Link
    # but only if they're not used directly in the file for other purposes
    
    # This is a bit risky as it could remove needed imports, so we'll check for usage first
    # Only remove Head import if it's not used directly
    if grep -q "import Head from 'next/head'" "$FILE" && ! grep -q "<Head>" "$FILE" && ! grep -q "Head\." "$FILE" && ! grep -q "Head(" "$FILE"; then
      sed -i '' "/import Head from 'next\/head'/d" "$FILE"
      echo "  ✓ Removed unnecessary Head import from $FILE"
    fi
    
    # Only remove Link import if it's not used directly
    if grep -q "import Link from 'next/link'" "$FILE" && ! grep -q "<Link" "$FILE" && ! grep -q "Link\." "$FILE" && ! grep -q "Link(" "$FILE"; then
      sed -i '' "/import Link from 'next\/link'/d" "$FILE"
      echo "  ✓ Removed unnecessary Link import from $FILE"
    fi
  fi
done

echo "All done! MDX rendering issues should now be fixed."
