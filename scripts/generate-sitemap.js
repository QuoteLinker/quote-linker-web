import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add new URLs to this array as pages are added to the site
const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/get-quote', priority: 1.0, changefreq: 'weekly' },
  
  // Insurance Product Pages
  { path: '/auto', priority: 0.9, changefreq: 'weekly' },
  { path: '/home', priority: 0.9, changefreq: 'weekly' },
  { path: '/life', priority: 0.9, changefreq: 'weekly' },
  { path: '/health', priority: 0.9, changefreq: 'weekly' },
  { path: '/term-life', priority: 0.8, changefreq: 'weekly' },
  { path: '/permanent-life', priority: 0.8, changefreq: 'weekly' },
  { path: '/disability', priority: 0.8, changefreq: 'weekly' },
  { path: '/short-term-disability', priority: 0.7, changefreq: 'weekly' },
  { path: '/supplemental-health', priority: 0.7, changefreq: 'weekly' },
  
  // Insurance Quotes Category Pages
  { path: '/insurance-quotes', priority: 0.9, changefreq: 'weekly' },
  { path: '/quote/auto', priority: 0.8, changefreq: 'weekly' },
  { path: '/quote/home', priority: 0.8, changefreq: 'weekly' },
  { path: '/quote/life', priority: 0.8, changefreq: 'weekly' },
  { path: '/quote/health', priority: 0.8, changefreq: 'weekly' },
  
  // Educational Content
  { path: '/learn', priority: 0.8, changefreq: 'weekly' },
  { path: '/resources', priority: 0.7, changefreq: 'weekly' },
  
  // Agent Pages
  { path: '/agents', priority: 0.8, changefreq: 'weekly' },
  { path: '/agents/packages', priority: 0.7, changefreq: 'weekly' },
  
  // Company Pages
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/data-and-cookies', priority: 0.2, changefreq: 'yearly' },
];

function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.quotelinker.com';
  
  // XML sitemap header
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
  
  // Add each route to the sitemap
  routes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>`;
    
    // Add image information for homepage (can be expanded for other pages)
    if (route.path === '/') {
      sitemap += `
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>QuoteLinker - Your Link to Smarter Insurance</image:title>
    </image:image>`;
    }
    
    sitemap += `
  </url>`;
  });
  
  // Close the sitemap
  sitemap += `
</urlset>`;
  
  // Write sitemap to file
  const filePath = path.join(path.dirname(__dirname), 'public', 'sitemap.xml');
  fs.writeFileSync(filePath, sitemap);
  
  console.log('Sitemap generated successfully at', filePath);
}

// Call the function to generate the sitemap
generateSitemap();
