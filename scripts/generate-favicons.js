const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-192x192.png': 192,
  'favicon-512x512.png': 512,
  'apple-touch-icon.png': 180,
  'og-image.png': [1200, 630],
  'twitter-image.png': [1200, 600],
  'favicon.png': 32, // This will be used as favicon.ico
};

async function generateFavicons() {
  const inputFile = path.join(process.cwd(), 'public', 'ql.png');
  const publicDir = path.join(process.cwd(), 'public');

  // Generate PNG favicons
  for (const [filename, size] of Object.entries(sizes)) {
    const outputFile = path.join(publicDir, filename);
    const width = Array.isArray(size) ? size[0] : size;
    const height = Array.isArray(size) ? size[1] : size;

    await sharp(inputFile)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(outputFile);

    console.log(`Generated ${filename}`);
  }

  // Copy favicon.png to favicon.ico
  await fs.copyFile(
    path.join(publicDir, 'favicon.png'),
    path.join(publicDir, 'favicon.ico')
  );
  console.log('Generated favicon.ico');

  // Create webmanifest file
  const manifest = {
    name: 'QuoteLinker',
    short_name: 'QuoteLinker',
    description: 'Compare insurance quotes from top providers',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0066FF',
    icons: [
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  await fs.writeFile(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('Generated site.webmanifest');
}

generateFavicons().catch(console.error); 