import Script from 'next/script';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

function ArticleBreadcrumbSchema({ slug }: { slug: string }) {
  return (
    <Script
      id="article-breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': 'https://www.quotelinker.com',
                name: 'Home'
              }
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': 'https://www.quotelinker.com/education',
                name: 'Education'
              }
            },
            {
              '@type': 'ListItem',
              position: 3,
              item: {
                '@id': `https://www.quotelinker.com/education/${slug}`,
                name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              }
            }
          ]
        })
      }}
    />
  );
}

export default function ArticleLayout({ children, params }: LayoutProps) {
  return (
    <>
      <ArticleBreadcrumbSchema slug={params.slug} />
      {children}
    </>
  );
} 