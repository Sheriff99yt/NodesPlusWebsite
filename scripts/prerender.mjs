import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const indexPath = path.join(dist, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('prerender: dist/index.html is missing. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, 'utf8');

const routes = [
  {
    file: 'index.html',
    title: 'Nodes Plus - Blueprint nodes for Unreal Engine',
    h1: 'Nodes Plus: Blueprint nodes for Unreal Engine',
    copy: 'Nodes Plus is a Blueprint function library for Unreal Engine. Browse the documentation in your browser, get the plugin on Fab, and ask questions on Discord.',
  },
  {
    file: path.join('architecture', 'index.html'),
    title: 'Architecture | Nodes Plus',
    h1: 'How Nodes Plus is put together',
    copy: 'Architecture of the Nodes Plus Blueprint function library for Unreal Engine.',
  },
  {
    file: path.join('documentation', 'index.html'),
    title: 'Documentation | Nodes Plus',
    h1: 'Nodes Plus Library',
    copy: 'Documentation for Nodes Plus custom Blueprint nodes for Unreal Engine.',
  },
  {
    file: path.join('documentation', 'debug', 'index.html'),
    title: 'Debug and Utilities | Nodes Plus',
    h1: 'Nodes Plus Library',
    copy: 'Debug and utility documentation for Nodes Plus.',
  },
  {
    file: path.join('documentation', 'math', 'index.html'),
    title: 'Math and Calculations | Nodes Plus',
    h1: 'Nodes Plus Library',
    copy: 'Math documentation for Nodes Plus.',
  },
  {
    file: path.join('documentation', 'string', 'index.html'),
    title: 'String Operations | Nodes Plus',
    h1: 'Nodes Plus Library',
    copy: 'String documentation for Nodes Plus.',
  },
  {
    file: path.join('documentation', 'utility', 'index.html'),
    title: 'Utility | Nodes Plus',
    h1: 'Nodes Plus Library',
    copy: 'Utility documentation for Nodes Plus.',
  },
  {
    file: path.join('documentation', 'array', 'index.html'),
    title: 'Array and Collection Operations | Nodes Plus',
    h1: 'Nodes Plus Library',
    copy: 'Array documentation for Nodes Plus.',
  },
];

function inject(html, route) {
  const markup = '<main data-prerendered="true"><h1>' + route.h1 + '</h1><p>' + route.copy + '</p></main>';
  let out = html.replace(/<div id="root"[^>]*>\s*<\/div>/, '<div id="root">' + markup + '</div>');
  if (out === html) {
    throw new Error('prerender: could not find empty #root in dist/index.html');
  }
  out = out.replace(/<title>[^<]*<\/title>/, '<title>' + route.title + '</title>');
  return out;
}

for (const route of routes) {
  const target = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, inject(template, route), 'utf8');
  console.log('prerendered', route.file);
}
