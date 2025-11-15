// Simple build-time scanner to ensure no secret phrases ship to the browser.
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const targets = [];
const pushIfExists = (p) => { if (fs.existsSync(p)) targets.push(p); };

// Scan dist if present, else scan root HTML/CSS/JS
pushIfExists(path.join(ROOT, "dist"));
if (targets.length === 0) {
  ["index.html","about.html","how-it-works.html","pricing.html","support.html","blog.html","privacy.html","terms.html","style.css"]
    .forEach(f => { if (fs.existsSync(path.join(ROOT,f))) targets.push(path.join(ROOT,f)); });
}

const forbidden = [
  "You are Sage",
  "SAGEDASH_PROMPT_",
  "SAGEDASH_RULES_",
  "SAGEDASH_MAPPINGS_",
  "Hard Rules",
  "system prompt",
  "Empathy first — always acknowledge"
];

let violations = [];

function scanFile(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    if (filePath.includes("node_modules") || filePath.includes("netlify/functions")) return;
    for (const name of fs.readdirSync(filePath)) {
      scanFile(path.join(filePath, name));
    }
  } else {
    const ext = path.extname(filePath);
    if (![".html",".css",".js",".mjs"].includes(ext)) return;
    const txt = fs.readFileSync(filePath, "utf8");
    forbidden.forEach(word => {
      if (txt.includes(word)) violations.push({ filePath, word });
    });
  }
}

targets.forEach(scanFile);

if (violations.length) {
  console.error("❌ Leak scan failed. Found forbidden phrases in client files:");
  violations.forEach(v => console.error(`- ${v.word} @ ${v.filePath}`));
  process.exit(1);
} else {
  console.log("✅ Leak scan passed.");
}
