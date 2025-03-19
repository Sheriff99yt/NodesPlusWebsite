/**
 * A simple image optimization script to process images in the public/images directory.
 * Run with: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Configuration
const IMAGES_DIR = path.join(__dirname, '../public/images');
const NODE_SCREENSHOTS_DIR = path.join(IMAGES_DIR, 'nodes');
const MAX_WIDTH = 800; // Maximum width for node screenshots
const QUALITY = 85; // JPEG/WebP quality (0-100)

// Create directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Process a single image
async function processImage(imagePath) {
  try {
    const outputPath = imagePath.replace(/\.(jpe?g|png)$/i, '.webp');
    
    // Skip if already processed
    if (fs.existsSync(outputPath) && 
        fs.statSync(outputPath).mtimeMs > fs.statSync(imagePath).mtimeMs) {
      console.log(`Skipping already processed: ${path.basename(imagePath)}`);
      return;
    }
    
    console.log(`Processing: ${path.basename(imagePath)}`);
    
    // Get image info
    const metadata = await sharp(imagePath).metadata();
    
    // Determine if we need to resize
    const needsResize = metadata.width > MAX_WIDTH;
    
    let pipeline = sharp(imagePath);
    
    // Resize if needed
    if (needsResize) {
      pipeline = pipeline.resize({
        width: MAX_WIDTH,
        withoutEnlargement: true
      });
    }
    
    // Convert to WebP with appropriate quality
    await pipeline
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    // Get file sizes for reporting
    const originalSize = fs.statSync(imagePath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savingsPercent = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`  Original: ${formatBytes(originalSize)}`);
    console.log(`  Optimized: ${formatBytes(optimizedSize)} (${savingsPercent}% savings)`);
    
    return {
      file: path.basename(imagePath),
      originalSize,
      optimizedSize,
      savingsPercent
    };
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
    return null;
  }
}

// Process all images in a directory
async function processDirectory(directory, pattern = '**/*.{jpg,jpeg,png}') {
  ensureDirectoryExists(directory);
  
  return new Promise((resolve) => {
    glob(path.join(directory, pattern), async (err, files) => {
      if (err) {
        console.error('Error finding files:', err);
        return resolve([]);
      }
      
      console.log(`Found ${files.length} images to process in ${directory}`);
      
      const results = [];
      for (const file of files) {
        const result = await processImage(file);
        if (result) {
          results.push(result);
        }
      }
      
      resolve(results);
    });
  });
}

// Format bytes to a human-readable string
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

// Main function
async function main() {
  console.log('Starting image optimization...');
  
  // Process node screenshots
  const nodeResults = await processDirectory(NODE_SCREENSHOTS_DIR);
  
  // Calculate total savings
  const totalOriginal = nodeResults.reduce((acc, item) => acc + item.originalSize, 0);
  const totalOptimized = nodeResults.reduce((acc, item) => acc + item.optimizedSize, 0);
  const totalSavingsPercent = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(2);
  
  console.log('\nOptimization Summary:');
  console.log('---------------------');
  console.log(`Total images processed: ${nodeResults.length}`);
  console.log(`Original size: ${formatBytes(totalOriginal)}`);
  console.log(`Optimized size: ${formatBytes(totalOptimized)}`);
  console.log(`Total savings: ${formatBytes(totalOriginal - totalOptimized)} (${totalSavingsPercent}%)`);
  console.log('\nOptimization complete!');
}

// Run the script
main().catch(console.error); 