# Nodes Plus Website

Official documentation site for Nodes Plus, a Blueprint function library for Unreal Engine by Sherif Hany / 99 Studios.

Live site: https://sheriff99yt.github.io/NodesPlusWebsite/

## Stack

- Vite + React + TypeScript
- BrowserRouter with basename /NodesPlusWebsite (GitHub Pages project site)
- Node.js 20

## Routes

- / - home
- /architecture - how the plugin and site fit together
- /documentation - category landing
- /documentation/:categoryId - category
- /documentation/:categoryId/:nodeId - node

The plugin is listed on Fab under Sherif Hany.
Questions go to the Discord server.

## Development

Repo: Sheriff99yt/NodesPlusWebsite
Use Node 20. Install, then run the Vite dev server.
Local URL: http://localhost:5173/NodesPlusWebsite/
Scripts: test, lint, build. Build typechecks, bundles, then prerenders routes from src/data/nodes.ts and writes sitemap.xml.

## Deployment

Pushes to main run GitHub Actions: lint, test, typecheck, build, then publish dist/ to the gh-pages branch.

## License

See the repository for license details.
