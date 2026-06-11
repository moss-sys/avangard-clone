// Дублирует out/v2.html в out/v2/index.html, чтобы URL /v2/ (со слэшем) тоже работал на GitHub Pages
import { mkdirSync, copyFileSync, existsSync } from "node:fs";

if (existsSync("out/v2.html")) {
  mkdirSync("out/v2", { recursive: true });
  copyFileSync("out/v2.html", "out/v2/index.html");
  console.log("✓ out/v2/index.html создан");
}
