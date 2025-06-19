'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Custom Link component that handles both internal and external links
export interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}

export function CustomLink({ href, children, ...props }: CustomLinkProps) {
  const pathname = usePathname();
  
  if (!href) {
    return <a {...props}>{children}</a>;
  }
  
  const isInternalLink = href.startsWith('/') || href.startsWith('#');
  
  if (isInternalLink) {
    return <Link href={href} {...props}>{children}</Link>;
  }
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props}
    >
      {children}
    </a>
  );
}

export default CustomLink;
