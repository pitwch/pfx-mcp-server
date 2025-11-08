#!/usr/bin/env node

/**
 * Build script for creating MCPB bundle
 * Creates a .mcpb file (ZIP archive) containing the MCP bridge and manifest
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const BUNDLE_DIR = path.join(ROOT_DIR, 'bundle');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'pfx-mcp-server.mcpb');

// Files to include in the bundle
const FILES_TO_BUNDLE = [
  'mcp-http-bridge.js',
  'LICENSE'
];

// Files to copy from bundle directory
const BUNDLE_FILES = [
  'manifest.json',
  'icon.png'
];

// Directories to copy from bundle directory
const BUNDLE_DIRS = [
  'locales'
];

console.log('🔨 Building MCPB bundle...');

// Create dist directory if it doesn't exist
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  console.log('✓ Created dist directory');
}

// Create temporary build directory
const BUILD_DIR = path.join(ROOT_DIR, '.mcpb-build');
if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true, force: true });
}
fs.mkdirSync(BUILD_DIR, { recursive: true });
console.log('✓ Created temporary build directory');

try {
  // Copy files from bundle directory
  for (const file of BUNDLE_FILES) {
    const src = path.join(BUNDLE_DIR, file);
    const dest = path.join(BUILD_DIR, file);
    
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Copied ${file}`);
    } else {
      console.warn(`⚠ Warning: ${file} not found in bundle/, skipping`);
    }
  }

  // Copy directories from bundle directory
  for (const dir of BUNDLE_DIRS) {
    const src = path.join(BUNDLE_DIR, dir);
    const dest = path.join(BUILD_DIR, dir);
    
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true });
      console.log(`✓ Copied ${dir}/ directory`);
    } else {
      console.warn(`⚠ Warning: ${dir}/ not found in bundle/, skipping`);
    }
  }

  // Copy bridge script and other files
  for (const file of FILES_TO_BUNDLE) {
    const src = path.join(ROOT_DIR, file);
    const dest = path.join(BUILD_DIR, file);
    
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Copied ${file}`);
    } else {
      console.warn(`⚠ Warning: ${file} not found, skipping`);
    }
  }

  // Create ZIP archive (MCPB file)
  console.log('📦 Creating MCPB archive...');
  
  // Check if zip command is available
  let zipCommand;
  try {
    execSync('zip --version', { stdio: 'ignore' });
    zipCommand = 'zip';
  } catch {
    try {
      execSync('7z', { stdio: 'ignore' });
      zipCommand = '7z';
    } catch {
      throw new Error('Neither zip nor 7z command found. Please install zip or 7-Zip.');
    }
  }

  // Remove existing MCPB file if it exists
  if (fs.existsSync(OUTPUT_FILE)) {
    fs.unlinkSync(OUTPUT_FILE);
  }

  // Create the archive
  if (zipCommand === 'zip') {
    execSync(`cd "${BUILD_DIR}" && zip -r "${OUTPUT_FILE}" .`, { stdio: 'inherit' });
  } else {
    execSync(`7z a -tzip "${OUTPUT_FILE}" "${BUILD_DIR}\\*"`, { stdio: 'inherit' });
  }

  console.log('✓ Created MCPB archive');

  // Get file size
  const stats = fs.statSync(OUTPUT_FILE);
  const fileSizeKB = (stats.size / 1024).toFixed(2);
  
  console.log('');
  console.log('✅ Build complete!');
  console.log(`📦 Output: ${OUTPUT_FILE}`);
  console.log(`📊 Size: ${fileSizeKB} KB`);
  console.log('');
  console.log('To test: Open the .mcpb file with Claude Desktop');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Clean up temporary build directory
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true, force: true });
    console.log('✓ Cleaned up temporary files');
  }
}
