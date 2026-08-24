import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

/**
 * Import the live TypeScript catalog so sitemap/prerender stay in sync.
 * Fails hard on an empty or orphaned catalog instead of dropping routes.
 */
export async function loadCatalog() {
  const sourcePath = path.resolve("src/data/nodes.ts");
  const src = fs.readFileSync(sourcePath, "utf8");
  const { outputText } = ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: "nodes.ts",
  });

  const tmp = path.join(os.tmpdir(), `nodesplus-catalog-${process.pid}.mjs`);
  fs.writeFileSync(tmp, outputText, "utf8");
  try {
    const mod = await import(`${pathToFileURL(tmp).href}?t=${Date.now()}`);
    const categories = mod.nodeCategories;
    const nodes = mod.nodes;
    if (!Array.isArray(categories) || categories.length === 0) {
      throw new Error("loadCatalog: nodeCategories is empty or missing");
    }
    if (!Array.isArray(nodes) || nodes.length === 0) {
      throw new Error("loadCatalog: nodes is empty or missing");
    }
    for (const category of categories) {
      if (!category?.id || !category?.name) {
        throw new Error("loadCatalog: category missing id/name");
      }
    }
    const catIds = new Set(categories.map((category) => category.id));
    const orphan = [];
    for (const node of nodes) {
      if (!node?.id || !node?.name || !node?.category) {
        throw new Error("loadCatalog: node missing id/name/category");
      }
      if (!catIds.has(node.category)) orphan.push(node.id);
    }
    if (orphan.length) {
      throw new Error(`loadCatalog: nodes with unknown category: ${orphan.join(", ")}`);
    }
    return { categories, nodes };
  } finally {
    try {
      fs.unlinkSync(tmp);
    } catch {
      // ignore
    }
  }
}
