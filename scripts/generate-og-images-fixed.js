/**
 * Fixed OG Image Generator with better error handling and connection stability
 * This combines best practices from both original scripts but with improved error handling
 */

var puppeteer = require('puppeteer');
var path = require('path');
var fs = require('fs').promises;

// Get the directory name
var __dirname = path.resolve();

// Handle unhandled promise rejections
process.on('unhandledRejection', function(error) {
  console.error('Unhandled promise rejection:', error);
  // Allow the process to continue rather than crash
});

/**
 * Product-specific content for OG images
 */
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

/**
 * Generate inline HTML content for OG images
 */
function generateHTML(content) {
  return '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
      '<meta charset="utf-8">' +
      '<style>' +
        'body {' +
          'width: 1200px;' +
          'height: 630px;' +
          'margin: 0;' +
          'padding: 0;' +
          'background-color: #ffffff;' +
          'display: flex;' +
          'flex-direction: column;' +
          'font-family: system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif;' +
          'overflow: hidden;' +
          'position: relative;' +
        '}' +
        '.container {' +
          'display: flex;' +
          'flex-direction: column;' +
          'height: 100%;' +
          'padding: 60px;' +
          'background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);' +
          'position: relative;' +
          'z-index: 1;' +
          'overflow: hidden;' +
        '}' +
        '.top-bar {' +
          'position: absolute;' +
          'top: 0;' +
          'left: 0;' +
          'width: 100%;' +
          'height: 8px;' +
          'background: linear-gradient(to right, #00EEFD, #00D4E5);' +
        '}' +
        '.top-section {' +
          'display: flex;' +
          'justify-content: space-between;' +
          'align-items: flex-start;' +
          'width: 100%;' +
        '}' +
        '.logo-container {' +
          'display: flex;' +
          'align-items: center;' +
        '}' +
        '.logo {' +
          'width: 80px;' +
          'height: 80px;' +
          'margin-right: 20px;' +
        '}' +
        '.logo-text {' +
          'font-size: 36px;' +
          'font-weight: 600;' +
          'color: #1e293b;' +
        '}' +
        '.badge {' +
          'background-color: #e0f2fe;' +
          'color: #0c4a6e;' +
          'padding: 12px 24px;' +
          'border-radius: 9999px;' +
          'font-size: 24px;' +
          'font-weight: 500;' +
          'border: 2px solid #7dd3fc;' +
        '}' +
        '.content-section {' +
          'flex-grow: 1;' +
          'display: flex;' +
          'flex-direction: column;' +
          'justify-content: center;' +
          'align-items: center;' +
          'text-align: center;' +
        '}' +
        'h1 {' +
          'font-size: 84px;' +
          'font-weight: 800;' +
          'color: #0f172a;' +
          'margin: 0 0 20px;' +
          'line-height: 1.1;' +
        '}' +
        'p {' +
          'font-size: 48px;' +
          'color: #475569;' +
          'margin: 0;' +
          'max-width: 1000px;' +
        '}' +
        '.pattern {' +
          'position: absolute;' +
          'bottom: -100px;' +
          'left: -100px;' +
          'width: 500px;' +
          'height: 500px;' +
          'opacity: 0.05;' +
          'z-index: 0;' +
        '}' +
      '</style>' +
    '</head>' +
    '<body>' +
      '<div class="top-bar"></div>' +
      '<div class="container">' +
        '<img src="data:image/svg+xml;base64,' + Buffer.from('<svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#0EA5E9" d="M100 0L0 100l100 100 100-100z"/></svg>').toString('base64') + '" class="pattern" />' +
        '<div class="top-section">' +
          '<div class="logo-container">' +
            '<img src="https://www.quotelinker.com/quotelinker_icon.png" class="logo" />' +
            '<div class="logo-text">QuoteLinker</div>' +
          '</div>' +
          '<div class="badge">' + content.badgeText + '</div>' +
        '</div>' +
        '<div class="content-section">' +
          '<h1>' + content.headline + '</h1>' +
          '<p>' + content.subheadline + '</p>' +
        '</div>' +
      '</div>' +
    '</body>' +
    '</html>';
}

/**
 * Main function to generate OG images
 */
function generateOGImages() {
  var browser;
  console.log('Initializing Puppeteer...');
  puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    protocolTimeout: 60000, // Increase timeout to 60 seconds
  }).then(function(b) {
    browser = b;
    return browser.newPage();
  }).then(function(page) {
    return page.setViewport({ width: 1200, height: 630 }).then(function() {
      var outputDir = path.join(__dirname, '..', 'public', 'images');
      return fs.mkdir(outputDir, { recursive: true }).then(function() {
        var products = Object.keys(PRODUCTS);
        var promiseChain = Promise.resolve();

        products.forEach(function(product) {
          promiseChain = promiseChain.then(function() {
            var content = PRODUCTS[product];
            var html = generateHTML(content);
            var fileName = product + '-og-image.png';
            var filePath = path.join(outputDir, fileName);

            console.log('Generating OG image for ' + product + '...');

            var attempts = 3;
            function setContentWithRetry() {
              return page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 })
                .catch(function(error) {
                  attempts--;
                  console.error('Error setting content for ' + product + ' (attempt ' + (3 - attempts) + '):', error.message);
                  if (attempts === 0) {
                    return Promise.reject(new Error('Failed to set content for ' + product + ' after 3 attempts.'));
                  }
                  return new Promise(function(resolve) { setTimeout(resolve, 2000); }).then(setContentWithRetry);
                });
            }

            return setContentWithRetry().then(function() {
              return new Promise(function(resolve) { setTimeout(resolve, 1000); });
            }).then(function() {
              return page.screenshot({ path: filePath });
            }).then(function() {
              console.log('Successfully generated ' + filePath);
            });
          });
        });

        return promiseChain;
      });
    });
  }).catch(function(error) {
    console.error('Error generating OG images:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1); // Exit with an error code
  }).finally(function() {
    if (browser) {
      return browser.close().then(function() {
        console.log('Browser closed successfully.');
      }).catch(function(closeError) {
        console.error('Error closing browser:', closeError.message);
      });
    }
  });
}

generateOGImages();
