// App Router compatible MDX components
import Link from 'next/link';
import Image from 'next/image';
import { FAQ } from '@/components/MDXComponents/FAQ';
import MDXHeadWrapper from '@/components/MDXHeadWrapper';
import CustomLink from '@/components/CustomLink';

// Define custom MDX components - Next.js app router looks for this specific export
export function useMDXComponents() {
  return {
    // Map HTML elements to React components
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
    // Add custom components
    Link,
    FAQ,
    // Use a wrapper for Head that's safe with App Router
    Head: MDXHeadWrapper,
  };
}
