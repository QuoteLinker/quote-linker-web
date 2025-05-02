'use client';

import Image from 'next/image';

interface ArticleImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
}

export default function ArticleImage({ src, alt, fallbackSrc }: ArticleImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-200 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = fallbackSrc;
      }}
    />
  );
} 