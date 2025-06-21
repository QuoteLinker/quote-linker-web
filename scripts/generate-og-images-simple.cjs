/**
 * Simplified OG Image Generator
 * Using minimal configuration with Puppeteer for maximum stability
 */

var puppeteer = require('puppeteer');
var path = require('path');
var fs = require('fs');

var MAX_RETRIES = 3;
var RETRY_DELAY = 1000; // 1 second

/** @type {{ [key: string]: { headline: string, subheadline: string, badgeText: string } }} */
var PRODUCTS = {
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
function generateHtml(content) {
  return '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '  <meta charset="utf-8">' +
    '  <style>' +
    '    body {' +
    '      width: 1200px;' +
    '      height: 630px;' +
    '      margin: 0;' +
    '      padding: 0;' +
    '      background-color: #ffffff;' +
    '      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;' +
    '    }' +
    '    .container {' +
    '      display: flex;' +
    '      flex-direction: column;' +
    '      height: 100%;' +
    '      padding: 60px;' +
    '      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);' +
    '    }' +
    '    .top-bar {' +
    '      position: absolute;' +
    '      top: 0;' +
    '      left: 0;' +
    '      width: 100%;' +
    '      height: 8px;' +
    '      background: linear-gradient(to right, #00EEFD, #00D4E5);' +
    '    }' +
    '    .top-section {' +
    '      display: flex;' +
    '      align-items: center;' +
    '      margin-bottom: 40px;' +
    '    }' +
    '    .logo-placeholder {' +
    '      width: 100px;' +
    '      height: 100px;' +
    '      margin-right: 20px;' +
    '      border-radius: 10px;' +
    '      background: #00EEFD;' +
    '      display: flex;' +
    '      align-items: center;' +
    '      justify-content: center;' +
    '      color: white;' +
    '      font-weight: bold;' +
    '      font-size: 36px;' +
    '    }' +
    '    .brand-name {' +
    '      font-size: 38px;' +
    '      font-weight: 700;' +
    '      color: #00EEFD;' +
    '    }' +
    '    .content-section {' +
    '      flex-grow: 1;' +
    '      display: flex;' +
    '      flex-direction: column;' +
    '      justify-content: center;' +
    '      align-items: center;' +
    '      text-align: center;' +
    '    }' +
    '    h1 {' +
    '      font-size: 72px;' +
    '      font-weight: 800;' +
    '      color: #1e293b;' +
    '      margin: 0 0 20px;' +
    '      line-height: 1.2;' +
    '    }' +
    '    p {' +
    '      font-size: 36px;' +
    '      color: #475569;' +
    '      margin: 0;' +
    '      max-width: 900px;' +
    '    }' +
    '    .badge {' +
    '      position: absolute;' +
    '      bottom: 40px;' +
    '      right: 40px;' +
    '      background-color: #e0f2fe;' +
    '      color: #0c4a6e;' +
    '      padding: 10px 20px;' +
    '      border-radius: 15px;' +
    '      font-size: 20px;' +
    '      font-weight: 500;' +
    '    }' +
    '  </style>' +
    '</head>' +
    '<body>' +
    '  <div class="top-bar"></div>' +
    '  <div class="container">' +
    '    <div class="top-section">' +
    '      <div class="logo-placeholder">QL</div>' +
    '      <div class="brand-name">QuoteLinker</div>' +
    '    </div>' +
    '    <div class="content-section">' +
    '      <h1>' + content.headline + '</h1>' +
    '      <p>' + content.subheadline + '</p>' +
    '    </div>' +
    '    <div class="badge">' + content.badgeText + '</div>' +
    '  </div>' +
    '</body>' +
    '</html>';
}

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

function generateOGImage(browser, key, content, imagesDir, retryCount) {
  retryCount = retryCount || 0;
  
  return browser.newPage()
    .then(function(page) {
      return page.setViewport({
        width: 1200,
        height: 630,
        deviceScaleFactor: 2
      })
      .then(function() {
        var html = generateHtml(content);
        return page.setContent(html, { waitUntil: 'networkidle0' });
      })
      .then(function() {
        var imagePath = path.join(imagesDir, key + '-og-image.png');
        return page.screenshot({
          path: imagePath,
          quality: 100
        });
      })
      .then(function() {
        console.log('Generated: ' + key + '-og-image.png');
        return page.close();
      })
      .catch(function(error) {
        if (retryCount < MAX_RETRIES) {
          console.log('Retrying ' + key + ' (attempt ' + (retryCount + 1) + ')...');
          return sleep(RETRY_DELAY)
            .then(function() {
              return generateOGImage(browser, key, content, imagesDir, retryCount + 1);
            });
        }
        throw error;
      });
    });
}

function generateOGImages() {
  console.log('Starting OG image generation (simplified approach)...');

  var imagesDir = path.join(__dirname, '..', 'public', 'images');
  var browser;

  return fs.promises.mkdir(imagesDir, { recursive: true })
    .then(function() {
      return puppeteer.launch({
        headless: "new",
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
    })
    .then(function(b) {
      browser = b;
      var entries = Object.entries(PRODUCTS);
      
      return entries.reduce(function(promise, entry) {
        return promise.then(function() {
          var key = entry[0];
          var content = entry[1];
          console.log('Processing:', key);
          return generateOGImage(browser, key, content, imagesDir);
        });
      }, Promise.resolve());
    })
    .catch(function(error) {
      console.error('Error generating OG images:', error);
      throw error;
    })
    .finally(function() {
      if (browser) {
        return browser.close();
      }
    });
}

// Execute the script
generateOGImages()
  .then(function() {
    console.log('OG image generation completed successfully!');
  })
  .catch(function(error) {
    console.error('Fatal error:', error);
    process.exit(1);
  });
