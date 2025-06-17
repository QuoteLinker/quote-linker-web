/**
 * Simplified OG Image Generator
 * Using minimal configuration with Puppeteer for maximum stability
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Product-specific content for OG images
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

// Generate HTML template for each OG image
const generateHtml = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      width: 1200px;
      height: 630px;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    }
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 60px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    }
    .top-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 8px;
      background: linear-gradient(to right, #00EEFD, #00D4E5);
    }
    .top-section {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
    }
    .logo-placeholder {
      width: 100px;
      height: 100px;
      margin-right: 20px;
      border-radius: 10px;
      background: #00EEFD;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 36px;
    }
    .brand-name {
      font-size: 38px;
      font-weight: 700;
      color: #00EEFD;
    }
    .main-section {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .headline {
      font-size: 68px;
      font-weight: 800;
      line-height: 1.1;
      color: #0c4a6e;
      margin-bottom: 30px;
      max-width: 85%;
    }
    .sub-headline {
      font-size: 32px;
      color: #475569;
      max-width: 75%;
      line-height: 1.4;
      font-weight: 500;
    }
    .bottom-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 50px;
      border-top: 1px solid #e2e8f0;
      padding-top: 24px;
    }
    .tagline {
      font-size: 24px;
      color: #64748b;
      font-weight: 500;
    }
    .website {
      font-size: 26px;
      color: #00EEFD;
      font-weight: 600;
    }
    .trust-badge {
      position: absolute;
      top: 60px;
      right: 60px;
      background-color: #ffffff;
      border-radius: 50px;
      padding: 10px 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
    }
    .trust-badge-text {
      color: #475569;
      font-weight: 600;
      font-size: 16px;
    }
    .check-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #00EEFD;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="top-bar"></div>
    <div class="top-section">
      <div class="logo-placeholder">QL</div>
      <span class="brand-name">QuoteLinker</span>
    </div>
    <div class="main-section">
      <h1 class="headline">${content.headline}</h1>
      <p class="sub-headline">${content.subheadline}</p>
    </div>
    <div class="bottom-section">
      <span class="tagline">Auto • Home • Life • Health</span>
      <span class="website">quotelinker.com</span>
    </div>
    <div class="trust-badge">
      <div class="check-icon">✓</div>
      <span class="trust-badge-text">${content.badgeText}</span>
    </div>
  </div>
</body>
</html>
`;

async function generateOGImages() {
  console.log('Starting OG image generation (simplified approach)...');
  
  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  await fs.mkdir(imagesDir, { recursive: true }).catch(err => {
    if (err.code !== 'EEXIST') {
      console.error(`Error creating directory: ${err}`);
    }
  });

  // Use minimal browser configuration for stability
  const browser = await puppeteer.launch({
    headless: "new", // Use the new headless mode for better performance
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Create a new page for each image rather than reusing
    for (const [key, content] of Object.entries(PRODUCTS)) {
      console.log(`Processing: ${key}`);
      
      // Create a new page for each product - helps avoid state issues
      const page = await browser.newPage();
      
      try {
        // Set viewport for high-quality images
        await page.setViewport({
          width: 1200,
          height: 630,
          deviceScaleFactor: 2
        });
        
        // Set HTML content directly
        const html = generateHtml(content);
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        // Define file paths
        let ogImagePath, twitterImagePath;
        
        if (key === 'default') {
          ogImagePath = path.join(__dirname, '..', 'public', 'og-image.png');
          twitterImagePath = path.join(__dirname, '..', 'public', 'twitter-image.png');
        } else {
          ogImagePath = path.join(__dirname, '..', 'public', 'images', `${key}-og-image.png`);
          twitterImagePath = path.join(__dirname, '..', 'public', 'images', `${key}-twitter-image.png`);
        }
        
        // Take screenshots
        await page.screenshot({ path: ogImagePath, type: 'png' });
        console.log(`✓ Created OG image: ${ogImagePath}`);
        
        // Slight adjustment for Twitter image size
        await page.setViewport({ width: 1200, height: 628, deviceScaleFactor: 2 });
        await page.screenshot({ path: twitterImagePath, type: 'png' });
        console.log(`✓ Created Twitter image: ${twitterImagePath}`);
        
        // Close this page to free resources
        await page.close();
        
      } catch (err) {
        console.error(`Error processing ${key}:`, err);
        // Continue with next product despite errors
      }
    }
    
    console.log('All OG images generated successfully!');
    
  } catch (error) {
    console.error('Fatal error:', error);
  } finally {
    await browser.close();
    console.log('🎉 Image generation process completed');
  }
}

// Execute the script
generateOGImages().catch(console.error);
