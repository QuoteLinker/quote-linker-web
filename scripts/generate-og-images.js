import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { promises as fsPromises } from 'fs';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

/**
 * Product-specific content for OG images
 */
const PRODUCTS = {
  default: {
    headline: 'Your Link to Smarter Insurance',
    subheadline: 'Compare personalized quotes from trusted local agents and save up to 30% on coverage.',
    badgeText: 'Trusted by 10,000+ Customers'
  },
  auto: {
    headline: 'Auto Insurance Quotes',
    subheadline: 'Compare personalized auto insurance quotes from top-rated providers and save on premiums.',
    badgeText: 'Average savings of $500/year'
  },
  home: {
    headline: 'Home Insurance Quotes',
    subheadline: 'Protect your home with the right coverage at competitive rates from top-rated insurers.',
    badgeText: '5-star customer satisfaction'
  },
  life: {
    headline: 'Life Insurance Quotes',
    subheadline: "Secure your family's future with affordable term & whole life insurance plans.",
    badgeText: 'Coverage starts at $15/month'
  },
  health: {
    headline: 'Health Insurance Quotes',
    subheadline: 'Find comprehensive health coverage that fits your needs and budget from leading providers.',
    badgeText: 'Plans for every budget'
  },
  learn: {
    headline: 'Insurance Learning Hub',
    subheadline: 'Make informed insurance decisions with our expert guides, tips, and resources.',
    badgeText: 'Trusted by 10,000+ Customers'
  },
  agents: {
    headline: 'Insurance Agent Portal',
    subheadline: 'Connect with high-intent insurance customers and grow your book of business.',
    badgeText: '100% Exclusive Leads'
  }
};

/**
 * Generate social media sharing images using a template
 */
async function generateOGImages() {
  console.log('Generating social sharing images...');
  
  // Create the images directory if it doesn't exist
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  try {
    await fsPromises.mkdir(imagesDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(`Error creating directory: ${err.message}`);
      return;
    }
  }
  
  // Launch a headless browser with higher quality settings and more stable configuration
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--font-render-hinting=none' // Improves font rendering
    ],
    timeout: 60000 // Increase timeout to 60s
  });
  
  try {
    const page = await browser.newPage();
    
    // Enable console logs from the browser to help with debugging
    page.on('console', msg => console.log(`Browser console: ${msg.text()}`));
    page.on('pageerror', error => console.error(`Browser page error: ${error.message}`));
    page.on('error', err => console.error(`Browser error: ${err}`));
    page.on('requestfailed', request => console.error(`Request failed: ${request.url()}`));
    
    // Load the template HTML file
    const templatePath = path.join(__dirname, '..', 'templates', 'og-image-template.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');
    
    // Replace any references to local files with absolute paths
    const publicDir = path.join(__dirname, '..', 'public');
    const modifiedHtml = templateHtml.replace(
      /src=['"]([^'"]+)['"]/g, 
      (match, src) => {
        // Skip if it's already a data URL, http URL, or absolute path
        if (src.startsWith('data:') || src.startsWith('http') || src.startsWith('/')) {
          return match;
        }
        
        // Create absolute path to the public resource
        const absolutePath = path.join(publicDir, src);
        console.log(`Resolving image src from ${src} to ${absolutePath}`);
        
        // Check if the file exists
        if (fs.existsSync(absolutePath)) {
          const dataUri = `file://${absolutePath}`;
          return `src="${dataUri}"`;
        }
        
        console.warn(`Warning: File not found: ${absolutePath}`);
        return match;
      }
    );
    
    // Improved quality settings
    const screenshotOptions = {
      type: 'png',
      omitBackground: false,
      encoding: 'binary',
      quality: 100 // For when using jpeg format
    };
    
    // Set viewport for device pixel ratio 2 for better quality on retina displays
    const viewportOptions = {
      width: 1200,
      height: 630,
      deviceScaleFactor: 2, // Using higher DPR for better quality
    };
    
    // Generate images for each product type
    for (const [key, content] of Object.entries(PRODUCTS)) {
      console.log(`Generating images for ${key}...`);
      
      // Set the content with a longer waitUntil timeout
      await page.setContent(modifiedHtml, {
        waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
        timeout: 30000
      });
      
      // Set the product-specific content
      await page.evaluate((content) => {
        document.querySelector('.headline').textContent = content.headline;
        document.querySelector('.sub-headline').textContent = content.subheadline;
        document.querySelector('.trust-badge-text').textContent = content.badgeText;
      }, content);
      
      // Set viewport for OG image
      await page.setViewport(viewportOptions);
      
      // Determine file paths
      let ogImagePath, twitterImagePath;
      
      if (key === 'default') {
        // Main OG and Twitter images in the public root
        ogImagePath = path.join(__dirname, '..', 'public', 'og-image.png');
        twitterImagePath = path.join(__dirname, '..', 'public', 'twitter-image.png');
      } else {
        // Product-specific images in the images folder
        ogImagePath = path.join(__dirname, '..', 'public', 'images', `${key}-og-image.png`);
        twitterImagePath = path.join(__dirname, '..', 'public', 'images', `${key}-twitter-image.png`);
      }
      
      // Generate OG Image
      await page.screenshot({ 
        path: ogImagePath, 
        ...screenshotOptions 
      });
      console.log(`✅ Generated OG image: ${ogImagePath}`);
      
      // Adjust viewport slightly for Twitter
      await page.setViewport({
        ...viewportOptions,
        height: 628
      });
      
      // Generate Twitter Image
      await page.screenshot({ 
        path: twitterImagePath, 
        ...screenshotOptions 
      });
      console.log(`✅ Generated Twitter image: ${twitterImagePath}`);
    }
    
  } catch (error) {
    console.error('Error generating images:', error);
  } finally {
    await browser.close();
    console.log('🎉 Social sharing images generation complete!');
  }
}

// Run the function
generateOGImages().catch(error => {
  console.error('Fatal error in generateOGImages:', error);
  process.exit(1);
});
