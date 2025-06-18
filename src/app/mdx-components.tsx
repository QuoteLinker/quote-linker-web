import Link from 'next/link';
import Image from 'next/image';
import { FAQ } from '@/components/MDXComponents/FAQ';

// Define custom MDX components - Next.js app router looks for this specific export
export function useMDXComponents(components: Record<string, React.ComponentType>) {
  return {
    ...components,
    // Map HTML elements to React components
    a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      if (!href) return <a {...props} />;
      
      return href.startsWith('/') || href.startsWith('#') ? (
        <Link href={href} {...props} />
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
      );
    },
    img: ({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
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
  };
}
