import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const BASE = "/avangard-clone";
const OUT = "./out";

function fixFile(filePath) {
  if (!filePath.endsWith(".html")) return;
  let html = readFileSync(filePath, "utf-8");

  // Fix image src paths missing basePath
  html = html.replace(/src="\/images\//g, `src="${BASE}/images/`);
  html = html.replace(/href="\/images\//g, `href="${BASE}/images/`);

  // Fix preload links for images
  html = html.replace(/href="\/images\//g, `href="${BASE}/images/`);

  // Fix widget.js script path
  html = html.replace(/href="\/widget\.js"/g, `href="${BASE}/widget.js"`);

  writeFileSync(filePath, html, "utf-8");
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    statSync(full).isDirectory() ? walk(full) : fixFile(full);
  }
}

walk(OUT);
console.log("✓ Пути к изображениям исправлены в out/");
