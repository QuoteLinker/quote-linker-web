/**
 * Simplified OG Image Generator
 * Using minimal configuration with Puppeteer for maximum stability
 */

var puppeteer = require('puppeteer');
var path = require('path');
var fs = require('fs');

// Product-specific content for OG images
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
var generateHtml = function(content) {
  return (
    '<!DOCTYPE html>' +
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
    '      font-family: system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif;' +
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
    '</html>'
  );
};

function generateOGImages() {
  console.log('Starting OG image generation (simplified approach)...');

  var imagesDir = path.join(__dirname, '..', 'public', 'images');
  var browser;

  fs.promises.mkdir(imagesDir, { recursive: true })
    .catch(function(err) {
      if (err.code !== 'EEXIST') {
        console.error('Error creating directory: ' + err);
        throw err; // Propagate error
      }
    })
    .then(function() {
      return puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    })
    .then(function(b) {
      browser = b;
      var productKeys = Object.keys(PRODUCTS);
      var promiseChain = Promise.resolve();

      productKeys.forEach(function(key) {
        promiseChain = promiseChain.then(function() {
          var content = PRODUCTS[key];
          console.log('Processing: ' + key);
          var page;

          return browser.newPage()
            .then(function(p) {
              page = p;
              return page.setViewport({
                width: 1200,
                height: 630,
                deviceScaleFactor: 2
              });
            })
            .then(function() {
              var html = generateHtml(content);
              return page.setContent(html, { waitUntil: 'networkidle0' });
            })
            .then(function() {
              var ogImagePath, twitterImagePath;
              if (key === 'default') {
                ogImagePath = path.join(__dirname, '..', 'public', 'og-image.png');
                twitterImagePath = path.join(__dirname, '..', 'public', 'twitter-image.png');
              } else {
                ogImagePath = path.join(__dirname, '..', 'public', 'images', key + '-og-image.png');
                twitterImagePath = path.join(__dirname, '..', 'public', 'images', key + '-twitter-image.png');
              }
              return page.screenshot({ path: ogImagePath, type: 'png' })
                .then(function() {
                  console.log('✓ Created OG image: ' + ogImagePath);
                  return page.setViewport({ width: 1200, height: 628, deviceScaleFactor: 2 });
                })
                .then(function() {
                  return page.screenshot({ path: twitterImagePath, type: 'png' });
                })
                .then(function() {
                  console.log('✓ Created Twitter image: ' + twitterImagePath);
                });
            })
            .then(function() {
              return page.close();
            })
            .catch(function(err) {
              console.error('Error processing ' + key + ':', err);
              if (page) {
                return page.close();
              }
            });
        });
      });

      return promiseChain;
    })
    .then(function() {
      console.log('All OG images generated successfully!');
    })
    .catch(function(error) {
      console.error('Fatal error:', error);
    })
    .finally(function() {
      if (browser) {
        return browser.close().then(function() {
          console.log('🎉 Image generation process completed');
        });
      }
    });
}

// Execute the script
generateOGImages();
