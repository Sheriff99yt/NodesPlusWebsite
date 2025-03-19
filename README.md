# Nodes Plus Website

Official website for the Nodes Plus Unreal Engine plugin.

## Overview

The Nodes Plus website serves as the official site for the Unreal Engine plugin, hosted on GitHub Pages and built with Vite + React. The site features a streamlined landing page for users interested in the plugin.

## Development

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Getting Started

1. Clone the repository
   ```
   git clone <repository-url>
   cd NodesPlusWebsite
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Project Structure

```
nodespluswebsite/
├── public/              # Static assets
│   └── images/          # Images for the website
├── src/                 # Source code
│   ├── components/      # Reusable components
│   │   └── common/      # Common components
│   ├── pages/           # Page components
│   ├── styles/          # CSS styles
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React context providers
│   ├── App.tsx          # Main App component with routes
│   └── main.tsx         # Entry point with HashRouter
├── scripts/             # Utility scripts
├── .github/             # GitHub configuration
│   └── workflows/       # GitHub Actions workflows
├── index.html           # HTML template
└── package.json         # Dependencies and scripts
```

### Routing

The site uses HashRouter for GitHub Pages compatibility. This means all URLs in the application will be in the format `/#/path` instead of `/path`. The main routes are:

- `/` - Home page
- `/features` - Feature voting page

All internal navigation links use leading slashes for consistency, even though HashRouter would typically handle other formats.

### Building for Production

To build the website for production:

```
npm run build
```

The build output will be in the `dist` directory.

### Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

#### Manual Deployment to GitHub Pages

If you need to deploy manually:

1. Build the project
   ```
   npm run build
   ```

2. Create a new branch for GitHub Pages if it doesn't exist
   ```
   git checkout -b gh-pages
   ```

3. Add the built files to the branch
   ```
   git add dist -f
   git commit -m "Deploy website to GitHub Pages"
   ```

4. Push to GitHub
   ```
   git push origin gh-pages -f
   ```

5. On GitHub, go to repository Settings > Pages and set the source to the gh-pages branch

#### GitHub Actions Deployment

The repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml` that automatically builds and deploys the site when changes are pushed to the main branch.

Make sure to enable GitHub Pages in your repository settings and grant the necessary permissions for GitHub Actions.

### Performance Optimizations

The website includes several performance optimizations:

1. **Code Splitting**: Uses React.lazy and Suspense to split the code into smaller chunks that are loaded on demand.

2. **Image Optimization**: Includes a script to optimize images to WebP format with appropriate sizing:
   ```
   npm run optimize-images
   ```

3. **Analytics**: Includes a lightweight analytics implementation to track page views and important user interactions.

### Accessibility Features

The website follows accessibility best practices:

1. **ARIA Attributes**: All interactive elements include appropriate ARIA attributes.

2. **Keyboard Navigation**: The site is fully navigable using keyboard controls.

3. **Focus Styles**: Visible focus indicators for keyboard users.

4. **Screen Reader Support**: Includes hidden text specifically for screen readers where necessary.

### Additional Scripts

#### Image Optimization

```
npm run optimize-images
```

This script processes images in the `public/images` directory, converting them to WebP format and resizing them as needed for better performance.

## License

[License details]

## Contact

For questions or support, please join our [Discord server](https://discord.gg/2Pu9ywaptN).
