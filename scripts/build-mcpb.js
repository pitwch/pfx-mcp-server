#!/usr/bin/env node

/**
 * Build MCPB bundle and sync the canonical bridge into the Claude Code plugin.
 *
 *   npm run build:mcpb
 *   npm run sync:bridge
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const BUNDLE_DIR = path.join(ROOT_DIR, 'bundle');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const BUILD_DIR = path.join(ROOT_DIR, '.mcpb-build');
const OUTPUT_FILE = path.join(DIST_DIR, 'pfx-mcp-server.mcpb');
const BRIDGE_SRC = path.join(ROOT_DIR, 'mcp-http-bridge.js');
const BRIDGE_PLUGIN_DEST = path.join(ROOT_DIR, 'plugins', 'pfx-mcp-server', 'mcp-http-bridge.js');

const ROOT_FILES = ['mcp-http-bridge.js', 'LICENSE'];
const BUNDLE_FILES = ['manifest.json', 'icon.png'];
const BUNDLE_DIRS = ['locales'];

function syncBridge() {
  fs.copyFileSync(BRIDGE_SRC, BRIDGE_PLUGIN_DEST);
  console.log('Synced mcp-http-bridge.js -> plugins/pfx-mcp-server/');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyIfExists(src, dest, label) {
  if (!fs.existsSync(src)) {
    console.warn(`Warning: ${label} not found, skipping`);
    return false;
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied ${label}`);
  return true;
}

function createZipArchive() {
  if (fs.existsSync(OUTPUT_FILE)) {
    fs.unlinkSync(OUTPUT_FILE);
  }

  try {
    execSync('zip --version', { stdio: 'ignore' });
    execSync(`zip -r "${OUTPUT_FILE}" .`, { cwd: BUILD_DIR, stdio: 'inherit' });
    return;
  } catch {
    // try 7z next
  }

  try {
    execSync('7z', { stdio: 'ignore' });
    execSync(`7z a -tzip "${OUTPUT_FILE}" "${BUILD_DIR}${path.sep}*"`, { stdio: 'inherit' });
    return;
  } catch {
    // try PowerShell Compress-Archive on Windows
  }

  if (process.platform === 'win32') {
    const tempZip = OUTPUT_FILE.replace(/\.mcpb$/i, '.zip');
    if (fs.existsSync(tempZip)) fs.unlinkSync(tempZip);
    const ps = `
      Compress-Archive -Path '${BUILD_DIR}\\*' -DestinationPath '${tempZip}' -Force
    `;
    execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, ' ')}"`, { stdio: 'inherit' });
    fs.renameSync(tempZip, OUTPUT_FILE);
    return;
  }

  throw new Error('No zip tool found. Install zip, 7-Zip, or use Windows PowerShell.');
}

function build() {
  console.log('Building MCPB bundle...');

  syncBridge();
  ensureDir(DIST_DIR);

  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true, force: true });
  }
  ensureDir(BUILD_DIR);

  try {
    for (const file of BUNDLE_FILES) {
      copyIfExists(path.join(BUNDLE_DIR, file), path.join(BUILD_DIR, file), file);
    }

    for (const dir of BUNDLE_DIRS) {
      const src = path.join(BUNDLE_DIR, dir);
      const dest = path.join(BUILD_DIR, dir);
      if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true });
        console.log(`Copied ${dir}/`);
      } else {
        console.warn(`Warning: ${dir}/ not found, skipping`);
      }
    }

    for (const file of ROOT_FILES) {
      copyIfExists(path.join(ROOT_DIR, file), path.join(BUILD_DIR, file), file);
    }

    console.log('Creating MCPB archive...');
    createZipArchive();

    const sizeKb = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);
    console.log('');
    console.log('Build complete');
    console.log(`Output: ${OUTPUT_FILE}`);
    console.log(`Size: ${sizeKb} KB`);
  } finally {
    if (fs.existsSync(BUILD_DIR)) {
      fs.rmSync(BUILD_DIR, { recursive: true, force: true });
      console.log('Cleaned temporary files');
    }
  }
}

const mode = process.argv[2] || 'build';
if (mode === 'sync' || mode === 'sync:bridge') {
  syncBridge();
} else {
  build();
}
