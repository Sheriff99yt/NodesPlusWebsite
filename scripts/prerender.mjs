import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const indexPath = path.join(dist, "index.html");
const SITE = "https://sheriff99yt.github.io/NodesPlusWebsite";

function extractArray(src, exportName) {
  const start = src.indexOf(`export const ${exportName}`);
  if (start < 0) throw new Error("missing " + exportName);
  const eq = src.indexOf("= [", start);
  let i = eq + 2;
  let depth = 0;
  const begin = i;
  for (; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) {
        return src.slice(begin, i + 1);
      }
    }
  }
  throw new Error("unclosed " + exportName);
}

function loadCatalog(src = fs.readFileSync(path.resolve("src/data/nodes.ts"), "utf8")) {
  const catBlock = extractArray(src, "nodeCategories");
  const categories = [];
  const catRe = /id:\s*'([^']+)'\s*,\s*name:\s*'([^']+)'\s*,\s*description:\s*'([^']*)'/g;
  let m;
  while ((m = catRe.exec(catBlock))) {
    categories.push({ id: m[1], name: m[2], description: m[3] });
  }

  const nodeBlock = extractArray(src, "nodes");
  const nodes = [];
  const objRe = /id:\s*'([^']+)'\s*,\s*name:\s*'([^']+)'\s*,\s*category:\s*'([^']+)'/g;
  while ((m = objRe.exec(nodeBlock))) {
    nodes.push({ id: m[1], name: m[2], category: m[3] });
  }
  return { categories, nodes };
}

function sitemapXml(categories, nodes) {
  const urls = [
    `${SITE}/`,
    `${SITE}/architecture/`,
    `${SITE}/documentation/`,
    ...categories.map((c) => `${SITE}/documentation/${c.id}/`),
    ...nodes.map((n) => `${SITE}/documentation/${n.category}/${n.id}/`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc, idx) => `  <url>
    <loc>${loc}</loc>
    <changefreq>${idx < 3 ? "weekly" : "monthly"}</changefreq>
    <priority>${idx === 0 ? "1.0" : idx === 2 ? "0.9" : idx === 1 ? "0.8" : "0.6"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

const { categories, nodes } = loadCatalog();
console.log("catalog", categories.length, "categories", nodes.length, "nodes");

if (process.env.SITEMAP_ONLY) {
  fs.writeFileSync(path.resolve("public/sitemap.xml"), sitemapXml(categories, nodes), "utf8");
  process.exit(0);
}

if (!fs.existsSync(indexPath)) {
  console.error("prerender: dist/index.html is missing. Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(indexPath, "utf8");
const routes = [
  {
    file: "index.html",
    title: "Nodes Plus - Blueprint nodes for Unreal Engine",
    h1: "Nodes Plus: Blueprint nodes for Unreal Engine",
    copy: "Nodes Plus is a Blueprint function library for Unreal Engine. Browse the documentation in your browser, get the plugin on Fab, and ask questions on Discord.",
  },
  {
    file: path.join("architecture", "index.html"),
    title: "Architecture | Nodes Plus",
    h1: "How Nodes Plus is put together",
    copy: "Architecture of the Nodes Plus Blueprint function library for Unreal Engine.",
  },
  {
    file: path.join("documentation", "index.html"),
    title: "Documentation | Nodes Plus",
    h1: "Documentation",
    copy: "Documentation for Nodes Plus custom Blueprint nodes for Unreal Engine.",
  },
];
for (const cat of categories) {
  routes.push({
    file: path.join("documentation", cat.id, "index.html"),
    title: `${cat.name} | Nodes Plus`,
    h1: "Documentation",
    copy: `${cat.name} documentation for Nodes Plus.`,
  });
}
for (const node of nodes) {
  routes.push({
    file: path.join("documentation", node.category, node.id, "index.html"),
    title: `${node.name} | Nodes Plus`,
    h1: "Documentation",
    copy: `Docs for the ${node.name} Blueprint node.`,
  });
}

function inject(html, route) {
  const markup = "<main data-prerendered=\"true\"><h1>" + route.h1 + "</h1><p>" + route.copy + "</p></main>";
  let out = html.replace(/<div id="root"[^>]*>\s*<\/div>/, "<div id=\"root\">" + markup + "</div>");
  if (out === html) throw new Error("prerender: could not find empty #root in dist/index.html");
  return out.replace(/<title>[^<]*<\/title>/, "<title>" + route.title + "</title>");
}

for (const route of routes) {
  const target = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, inject(template, route), "utf8");
  console.log("prerendered", route.file);
}

const xml = sitemapXml(categories, nodes);
fs.writeFileSync(path.join(dist, "sitemap.xml"), xml, "utf8");
fs.writeFileSync(path.resolve("public/sitemap.xml"), xml, "utf8");