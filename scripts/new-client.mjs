#!/usr/bin/env node

/**
 * Initializes the template for a new client.
 *
 * Usage:
 *   node scripts/new-client.mjs "Nombre del Negocio"
 *
 * What it does:
 *   1. Resets git history (clean first commit)
 *   2. Updates package.json name to a slug of the business name
 *   3. Clears assets-cliente/
 *   4. Prints next steps
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, unlinkSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const name = process.argv[2];

if (!name) {
  console.error("\n  Usage: node scripts/new-client.mjs \"Nombre del Negocio\"\n");
  process.exit(1);
}

const slug = name
  .normalize("NFD")
  .replace(/\p{Diacritic}/gu, "")
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const root = resolve(import.meta.dirname, "..");

// 1. Update package.json name
const pkgPath = join(root, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
pkg.name = slug;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
console.log(`✓ package.json name → "${slug}"`);

// 2. Clear assets-cliente/
const assetsDir = join(root, "assets-cliente");
if (existsSync(assetsDir)) {
  const files = readdirSync(assetsDir).filter((f) => f !== ".gitkeep");
  for (const file of files) {
    unlinkSync(join(assetsDir, file));
  }
  console.log(`✓ assets-cliente/ limpiado (${files.length} archivos)`);
} else {
  mkdirSync(assetsDir);
  console.log("✓ assets-cliente/ creado");
}

// 3. Reset git history
execSync("git checkout --orphan temp-branch", { cwd: root, stdio: "ignore" });
execSync("git add -A", { cwd: root, stdio: "ignore" });
execSync(`git commit -m "init: ${name}"`, { cwd: root, stdio: "ignore" });
execSync("git branch -D main", { cwd: root, stdio: "ignore" });
execSync("git branch -m main", { cwd: root, stdio: "ignore" });
console.log("✓ Git history reseteado (commit inicial limpio)");

console.log(`
Listo. Próximos pasos:

  1. Completar BRIEF.md con los datos del negocio
  2. Poner imágenes en assets-cliente/
  3. Editar config/site.config.ts
  4. Ajustar colores en app/globals.css (o copiar un preset de config/presets/)
  5. Ajustar fuentes en app/layout.tsx
  6. pnpm build
  7. git remote set-url origin <nuevo-repo>
  8. git push -u origin main
`);
