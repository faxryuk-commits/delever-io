const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/logo/logo-compact.svg');
const outputDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-192.png', size: 192 },
  { name: 'favicon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from SVG...');
  
  const svgBuffer = fs.readFileSync(svgPath);
  
  for (const { name, size } of sizes) {
    const outputPath = path.join(outputDir, name);
    
    await sharp(svgBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated: ${name} (${size}x${size})`);
  }
  
  console.log('\n🎉 All favicons generated successfully!');
}

generateFavicons().catch(console.error);

