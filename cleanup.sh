#!/bin/bash

# Remove unnecessary files and directories
echo "Cleaning up unnecessary files..."

# Remove old favicon
rm -f public/favicon.ico
rm -f public/favicon.svg

# Remove unused directories
rm -rf src/pages
rm -rf src/styles
rm -rf src/utils
rm -rf src/lib
rm -rf src/hooks
rm -rf src/context
rm -rf src/assets

# Remove test files
rm -rf __tests__
rm -rf src/**/*.test.*
rm -rf src/**/*.spec.*

# Remove development files
rm -f .env.development
rm -f .env.local
rm -f .env.test

# Remove old build artifacts
rm -rf .next
rm -rf out
rm -rf build
rm -rf dist

echo "Cleanup complete!" 