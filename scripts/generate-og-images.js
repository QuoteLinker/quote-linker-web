var puppeteer = require('puppeteer');
var path = require('path');
var fs = require('fs');
var fsPromises = fs.promises;

// Handle unhandled promise rejections
process.on('unhandledRejection', function(error) {
  console.error('Unhandled promise rejection:', error);
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
 * Generate social media sharing images using a template
 */
function generateOGImages() {
  return new Promise(function(resolve, reject) {
    var browser;
    console.log('Generating social sharing images...');

    var imagesDir = path.join(__dirname, '..', 'public', 'images');
    fsPromises.mkdir(imagesDir, { recursive: true })
      .catch(function(err) {
        if (err.code !== 'EEXIST') {
          console.error('Error creating directory: ' + err.message);
          return reject(err);
        }
      })
      .then(function() {
        return puppeteer.launch({
          headless: 'new',
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--font-render-hinting=none'
          ],
          timeout: 60000
        });
      })
      .then(function(b) {
        browser = b;
        return browser.newPage();
      })
      .then(function(page) {
        page.on('console', function(msg) { console.log('Browser console: ' + msg.text()); });
        page.on('pageerror', function(error) { console.error('Browser page error: ' + error.message); });
        page.on('error', function(err) { console.error('Browser error event:', err); });
        page.on('requestfailed', function(request) { console.error('Browser request failed:', request.url(), request.failure()); });

        var templatePath = path.join(__dirname, '..', 'templates', 'og-image-template.html');
        var templateHtml = fs.readFileSync(templatePath, 'utf8');

        var publicDir = path.join(__dirname, '..', 'public');
        var modifiedHtml = templateHtml.replace(
          /src=['\"]([^'\"]+)['\"]/g,
          function(match, src) {
            if (src.indexOf('data:') === 0 || src.indexOf('http') === 0 || src.indexOf('/') === 0) {
              return match;
            }
            var absolutePath = path.join(publicDir, src);
            if (fs.existsSync(absolutePath)) {
              var dataUri = 'file://' + absolutePath;
              return 'src="' + dataUri + '"';
            }
            console.warn('Warning: File not found: ' + absolutePath);
            return match;
          }
        );

        var screenshotOptions = {
          type: 'png',
          omitBackground: false,
          encoding: 'binary',
          quality: 100
        };
        var viewportOptions = {
          width: 1200,
          height: 630,
          deviceScaleFactor: 2,
        };

        var imagePromises = Object.keys(PRODUCTS).map(function(key) {
          var content = PRODUCTS[key];
          console.log('Generating images for ' + key + '...');

          return page.setContent(modifiedHtml, {
            waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
            timeout: 30000
          })
          .then(function() {
            return page.evaluate(function(content) {
              document.querySelector('.headline').textContent = content.headline;
              document.querySelector('.sub-headline').textContent = content.subheadline;
              document.querySelector('.trust-badge-text').textContent = content.badgeText;
            }, content);
          })
          .then(function() {
            return page.setViewport(viewportOptions);
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

            var ogScreenshotOptions = {};
            for (var k in screenshotOptions) ogScreenshotOptions[k] = screenshotOptions[k];
            ogScreenshotOptions.path = ogImagePath;
            return page.screenshot(ogScreenshotOptions)
            .then(function() {
              console.log('Generated OG image: ' + ogImagePath);

              var twitterViewportOptions = {};
              for (var k in viewportOptions) twitterViewportOptions[k] = viewportOptions[k];
              twitterViewportOptions.height = 628;
              return page.setViewport(twitterViewportOptions);
            })
            .then(function() {
              var twitterScreenshotOptions = {};
              for (var k in screenshotOptions) twitterScreenshotOptions[k] = screenshotOptions[k];
              twitterScreenshotOptions.path = twitterImagePath;
              return page.screenshot(twitterScreenshotOptions);
            })
            .then(function() {
              console.log('Generated Twitter image: ' + twitterImagePath);
            });
          });
        });

        return Promise.all(imagePromises);
      })
      .then(function() {
        console.log('🎉 Social sharing images generation complete!');
        resolve();
      })
      .catch(function(err) {
        console.error('Error generating social sharing images: ' + err.message, err.stack);
        reject(err);
      })
      .finally(function() {
        if (browser) {
          browser.close();
        }
      });
  });
}

// Run the function
generateOGImages().catch(function(error) {
  console.error('Fatal error in generateOGImages:', error);
  process.exit(1);
});
