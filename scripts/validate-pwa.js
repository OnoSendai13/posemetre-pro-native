#!/usr/bin/env node

/**
 * Script de validation PWA pour PWABuilder
 * Verifie que tous les fichiers requis sont presents et valides
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

const requiredFiles = [
  'index.html',
  'manifest.json',
  'sw.js',
  'styles.css',
  'app.js',
  'icon-192.png',
  'icon-512.png',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

const requiredManifestFields = [
  'name',
  'short_name',
  'description',
  'start_url',
  'display',
  'background_color',
  'theme_color',
  'icons'
];

let hasErrors = false;

console.log('🔍 Validation PWA pour PWABuilder...\n');

// Verifier les fichiers requis
console.log('📁 Verification des fichiers requis:');
requiredFiles.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MANQUANT`);
    hasErrors = true;
  }
});

// Verifier le manifest.json
console.log('\n📋 Verification du manifest.json:');
try {
  const manifestPath = path.join(ROOT_DIR, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  requiredManifestFields.forEach(field => {
    if (manifest[field]) {
      console.log(`  ✅ ${field}: ${typeof manifest[field] === 'object' ? 'present' : manifest[field]}`);
    } else {
      console.log(`  ❌ ${field} - MANQUANT`);
      hasErrors = true;
    }
  });

  // Verifier les icones
  if (manifest.icons && Array.isArray(manifest.icons)) {
    const sizes = manifest.icons.map(icon => icon.sizes);
    const has192 = sizes.some(s => s === '192x192');
    const has512 = sizes.some(s => s === '512x512');
    
    console.log(`\n🖼️  Verification des icones:`);
    console.log(`  ${has192 ? '✅' : '❌'} Icone 192x192`);
    console.log(`  ${has512 ? '✅' : '❌'} Icone 512x512`);
    
    if (!has192 || !has512) hasErrors = true;
  }

  // Verifier les screenshots
  if (manifest.screenshots && manifest.screenshots.length > 0) {
    console.log(`\n📸 Screenshots: ${manifest.screenshots.length} trouve(s)`);
  } else {
    console.log(`\n📸 Screenshots: ⚠️  Aucun (recommande pour PWABuilder)`);
  }

} catch (err) {
  console.log(`  ❌ Erreur lors de la lecture du manifest: ${err.message}`);
  hasErrors = true;
}

// Verifier le service worker
console.log('\n⚙️  Verification du Service Worker:');
try {
  const swPath = path.join(ROOT_DIR, 'sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');
  
  const hasInstall = swContent.includes("addEventListener('install'");
  const hasFetch = swContent.includes("addEventListener('fetch'");
  const hasActivate = swContent.includes("addEventListener('activate'");
  
  console.log(`  ${hasInstall ? '✅' : '❌'} Event install`);
  console.log(`  ${hasFetch ? '✅' : '❌'} Event fetch`);
  console.log(`  ${hasActivate ? '✅' : '❌'} Event activate`);
  
  if (!hasInstall || !hasFetch || !hasActivate) hasErrors = true;
} catch (err) {
  console.log(`  ❌ Erreur: ${err.message}`);
  hasErrors = true;
}

// Resume
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Validation echouee - Des problemes ont ete detectes');
  process.exit(1);
} else {
  console.log('✅ Validation reussie - PWA prete pour PWABuilder!');
  console.log('\n📝 Prochaines etapes:');
  console.log('   1. Deployer sur un serveur HTTPS (ex: GitHub Pages)');
  console.log('   2. Aller sur https://pwabuilder.com');
  console.log('   3. Entrer l\'URL de votre application');
  console.log('   4. Generer les packages pour Windows/Android/iOS');
  process.exit(0);
}
