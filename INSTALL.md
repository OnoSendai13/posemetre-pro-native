# Installation et Deploiement - Assistant Posemetre Pro

## Installation locale avec npm

### Prerequis
- Node.js >= 16.0.0
- npm >= 8.0.0

### Etapes d'installation

```bash
# 1. Cloner le projet
git clone https://github.com/votre-utilisateur/assistant-posemetre-pro.git
cd assistant-posemetre-pro

# 2. Installer les dependances
npm install

# 3. Lancer le serveur de developpement
npm run dev
# ou
npm start

# 4. Ouvrir dans le navigateur
# http://localhost:8000
```

## Validation PWA

Avant de deployer, validez que votre PWA est prete:

```bash
npm run validate
```

## Deploiement

### Option 1: GitHub Pages

```bash
# Installer gh-pages si pas deja fait
npm install --save-dev gh-pages

# Deployer
npm run deploy:gh-pages
```

### Option 2: Netlify / Vercel

1. Connectez votre repo GitHub
2. Configurez le build:
   - Build command: `npm run build`
   - Publish directory: `.` (racine)

### Option 3: Serveur web classique

Copiez tous les fichiers sur votre serveur web. Assurez-vous que:
- Le serveur supporte HTTPS (obligatoire pour les PWA)
- Les types MIME sont correctement configures

## PWABuilder - Creer des applications natives

### Prerequis PWABuilder

Votre PWA doit avoir:
- [x] Un fichier `manifest.json` valide
- [x] Un Service Worker fonctionnel (`sw.js`)
- [x] Des icones 192x192 et 512x512
- [x] Etre servie en HTTPS
- [x] Des screenshots (recommande)

### Etapes PWABuilder

1. **Deployer votre PWA** sur un serveur HTTPS (GitHub Pages, Netlify, etc.)

2. **Aller sur PWABuilder**: https://pwabuilder.com

3. **Entrer l'URL** de votre application deployee

4. **Analyser** - PWABuilder va verifier votre manifest et service worker

5. **Corriger** les eventuels problemes signales

6. **Generer les packages**:
   - **Windows**: Package MSIX pour le Microsoft Store
   - **Android**: APK ou AAB pour le Google Play Store
   - **iOS**: Projet Xcode pour l'App Store

### Structure des fichiers pour PWABuilder

```
project/
├── index.html          # Page principale
├── manifest.json       # Manifest PWA (OBLIGATOIRE)
├── sw.js              # Service Worker (OBLIGATOIRE)
├── browserconfig.xml   # Config Windows
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png  # OBLIGATOIRE
│   ├── icon-384x384.png
│   └── icon-512x512.png  # OBLIGATOIRE
├── screenshots/
│   ├── screenshot-wide.png
│   └── screenshot-narrow.png
├── styles.css
├── app.js
└── ...
```

## Checklist avant publication

- [ ] Toutes les icones sont presentes
- [ ] Le manifest.json est valide (tester sur https://manifest-validator.appspot.com/)
- [ ] Le Service Worker fonctionne hors ligne
- [ ] L'application est accessible en HTTPS
- [ ] Les screenshots sont a jour
- [ ] La validation `npm run validate` passe

## Support

Pour toute question:
- Ouvrir une issue sur GitHub
- Consulter la documentation PWABuilder: https://docs.pwabuilder.com/

---

Developpe par Laurent Suchet - IG: @ono_sendai
