'use client'

// This component is a safe wrapper for Head elements in MDX files
// It intentionally does nothing since Next.js App Router uses metadata exports instead
export default function MDXHeadWrapper({ children }) {
  // In App Router, head elements should be managed through metadata exports
  // This is just a placeholder to prevent errors from MDX files that use <Head>
  // The 'children' prop is intentionally ignored to avoid rendering anything from <Head>
  return null;
}
