/**
 * A simplified approach to generating OG images using Puppeteer
 * This script uses simpler techniques to avoid connection issues
 */

var puppeteer = require('puppeteer');
var path = require('path');
var fs = require('fs');
var fsPromises = fs.promises;

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

/**
 * Generate social media sharing images using inline HTML instead of template file
 */
function generateOGImages() {
  console.log('Generating social sharing images using alternative approach...');

  var imagesDir = path.join(__dirname, '..', 'public', 'images');
  var browser;

  return fsPromises.mkdir(imagesDir, { recursive: true })
    .catch(function(err) {
      if (err.code !== 'EEXIST') {
        console.error('Error creating directory: ' + err.message);
        throw err;
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
      return browser.newPage();
    })
    .then(function(page) {
      var productKeys = Object.keys(PRODUCTS);
      var promiseChain = Promise.resolve();

      productKeys.forEach(function(key) {
        promiseChain = promiseChain.then(function() {
          var content = PRODUCTS[key];
          console.log('Generating images for ' + key + '...');

          var html = generateHTML(content);

          return page.setContent(html)
            .then(function() {
              return page.setViewport({
                width: 1200,
                height: 630,
                deviceScaleFactor: 2
              });
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
                  console.log('✓ Generated OG image: ' + ogImagePath);
                  return page.setViewport({
                    width: 1200,
                    height: 628,
                    deviceScaleFactor: 2
                  });
                })
                .then(function() {
                  return page.screenshot({ path: twitterImagePath, type: 'png' });
                })
                .then(function() {
                  console.log('✓ Generated Twitter image: ' + twitterImagePath);
                });
            });
        });
      });

      return promiseChain;
    })
    .then(function() {
      console.log('🎉 Social sharing images generation complete!');
    })
    .catch(function(error) {
      console.error('Error generating images:', error);
      throw error;
    })
    .finally(function() {
      if (browser) {
        return browser.close();
      }
    });
}

function generateHTML(content) {
  return ('<!DOCTYPE html>' +
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
          'align-items: center;' +
          'margin-bottom: 40px;' +
          'position: relative;' +
          'z-index: 2;' +
        '}' +
        '.logo-placeholder {' +
          'width: 100px;' +
          'height: 100px;' +
          'margin-right: 20px;' +
          'border-radius: 10px;' +
          'background: #00EEFD;' +
          'display: flex;' +
          'align-items: center;' +
          'justify-content: center;' +
          'color: white;' +
          'font-weight: bold;' +
          'font-size: 36px;' +
          'box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);' +
        '}' +
        '.brand-name {' +
          'font-size: 38px;' +
          'font-weight: 700;' +
          'color: #00EEFD;' +
          'letter-spacing: -0.5px;' +
        '}' +
        '.main-section {' +
          'flex-grow: 1;' +
          'display: flex;' +
          'flex-direction: column;' +
          'justify-content: center;' +
          'position: relative;' +
          'z-index: 2;' +
        '}' +
        '.headline {' +
          'font-size: 68px;' +
          'font-weight: 800;' +
          'line-height: 1.1;' +
          'color: #0c4a6e;' +
          'margin-bottom: 30px;' +
          'letter-spacing: -1.5px;' +
          'max-width: 85%;' +
          'text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);' +
        '}' +
        '.sub-headline {' +
          'font-size: 32px;' +
          'color: #475569;' +
          'max-width: 75%;' +
          'line-height: 1.4;' +
          'font-weight: 500;' +
        '}' +
        '.bottom-section {' +
          'display: flex;' +
          'justify-content: space-between;' +
          'align-items: flex-end;' +
          'margin-top: 50px;' +
          'border-top: 1px solid #e2e8f0;' +
          'padding-top: 24px;' +
          'position: relative;' +
          'z-index: 2;' +
        '}' +
        '.tagline {' +
          'font-size: 24px;' +
          'color: #64748b;' +
          'font-weight: 500;' +
        '}' +
        '.website {' +
          'font-size: 26px;' +
          'color: #00EEFD;' +
          'font-weight: 600;' +
        '}' +
        '.trust-badge {' +
          'position: absolute;' +
          'top: 60px;' +
          'right: 60px;' +
          'background-color: #ffffff;' +
          'border-radius: 50px;' +
          'padding: 10px 20px;' +
          'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);' +
          'display: flex;' +
          'align-items: center;' +
          'z-index: 2;' +
        '}' +
        '.trust-badge-text {' +
          'color: #475569;' +
          'font-weight: 600;' +
          'font-size: 16px;' +
        '}' +
        '.check-icon {' +
          'width: 24px;' +
          'height: 24px;' +
          'border-radius: 50%;' +
          'background-color: #00EEFD;' +
          'color: white;' +
          'display: flex;' +
          'align-items: center;' +
          'justify-content: center;' +
          'margin-right: 8px;' +
        '}' +
      '</style>' +
    '</head>' +
    '<body>' +
      '<div class="container">' +
        '<div class="top-bar"></div>' +
        '<div class="top-section">' +
          '<div class="logo-placeholder">QL</div>' +
          '<span class="brand-name">QuoteLinker</span>' +
        '</div>' +
        '<div class="main-section">' +
          '<h1 class="headline">' + content.headline + '</h1>' +
          '<p class="sub-headline">' + content.subheadline + '</p>' +
        '</div>' +
        '<div class="bottom-section">' +
          '<span class="tagline">Auto • Home • Life • Health</span>' +
          '<span class="website">quotelinker.com</span>' +
        '</div>' +
        '<div class="trust-badge">' +
          '<div class="check-icon">✓</div>' +
          '<span class="trust-badge-text">' + content.badgeText + '</span>' +
        '</div>' +
      '</div>' +
    '</body>' +
    '</html>');
}

generateOGImages().catch(function(error) {
  console.error('Fatal error in generateOGImages:', error);
  process.exit(1);
});
