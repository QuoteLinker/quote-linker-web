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
