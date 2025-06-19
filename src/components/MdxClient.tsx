'use client'

import { MDXRemote } from 'next-mdx-remote'
import { mdxComponents } from '@/components/mdx-components'

// Client component for rendering MDX content
// This avoids the "Cannot read properties of null (reading 'useContext') at Head" error
// by ensuring MDX content is rendered client-side with proper React context
export function MdxClient({ source }) {
  return <MDXRemote {...source} components={mdxComponents} />
}
