# Nodes Plus Website Scripts

This directory contains utility scripts for maintaining and optimizing the Nodes Plus website.

## Available Scripts

### optimize-images.js

A script to optimize images used in the website, particularly node screenshots. It:

- Converts JPG and PNG images to the more efficient WebP format
- Resizes large images to a maximum width of 800px
- Compresses images with a quality setting of 85 (good balance of size/quality)
- Skips already processed images to avoid unnecessary work

#### Usage

```bash
# Install dependencies first
npm install

# Run the script
npm run optimize-images
```

#### Requirements

This script depends on:
- `sharp`: For image processing
- `glob`: For finding image files

These dependencies are included in the project's package.json.

## Adding New Scripts

When adding new scripts:
1. Place the script in this directory
2. Document it in this README
3. Add a corresponding npm script in package.json if appropriate
4. Ensure any dependencies are added to package.json 