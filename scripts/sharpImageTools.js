// convert-images.mjs

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Get the current directory
const __dirname = path.dirname('../public/images/');

const outputDir = path.join(__dirname, '../public/images/');

// Ensure the output directory exists
if (!fs.existsSync(__dirname)) {
  fs.mkdirSync(__dirname, { recursive: true });
}

// Image sizes to generate
const sizes = [300, 600, 1200, 2000];

// Function to convert image to different formats
const convertImage = async () => {
  try {
    for (const size of sizes) {
      // Generate WebP files
      await sharp(path.join(outputDir, `sample-${size}.jpg`))
        .webp({ quality: 80 })
        .toFile(path.join(outputDir, `sample-${size}.webp`));

      // Generate AVIF files
      await sharp(path.join(outputDir, `sample-${size}.jpg`))
        .avif({ quality: 80 })
        .toFile(path.join(outputDir, `sample-${size}.avif`));
    }

    console.log('✅ Image conversion completed successfully.');
  } catch (error) {
    console.error('❌ Error converting images:', error);
  }
};

convertImage();