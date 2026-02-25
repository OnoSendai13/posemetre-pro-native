# 📱 Guide de Build Natif - Posemètre Pro

Ce guide explique comment compiler l'application Posemètre Pro pour iOS et Android en utilisant Capacitor.

## 📋 Prérequis

### Pour iOS
- **macOS** (obligatoire)
- **Xcode 14+** avec les outils de ligne de commande
- **CocoaPods**: `sudo gem install cocoapods`
- **Compte Apple Developer** (pour la distribution)

### Pour Android
- **Android Studio** (Arctic Fox ou plus récent)
- **Java JDK 17+**
- **Android SDK** (API level 22 minimum, 34 recommandé)
- **Gradle** (inclus avec Android Studio)

### Général
- **Node.js 16+**
- **npm 8+**

## 🚀 Installation Rapide

```bash
# 1. Cloner le dépôt
git clone https://github.com/OnoSendai13/posemetre-pro.git
cd posemetre-pro

# 2. Installer les dépendances
npm install

# 3. Build natif complet (iOS + Android)
npm run build:native

# Ou pour une plateforme spécifique
npm run build:ios
npm run build:android
```

## 📱 Build iOS

### Étape 1: Préparer les assets
```bash
npm run build:ios
```

### Étape 2: Ouvrir dans Xcode
```bash
npx cap open ios
# ou
npm run cap:open:ios
```

### Étape 3: Configuration dans Xcode

1. **Sélectionner l'équipe de signature**
   - Ouvrir `ios/App/App.xcworkspace`
   - Cible `App` → Signing & Capabilities
   - Sélectionner votre Team
   - Définir un Bundle Identifier unique (ex: `com.votredomaine.posemetrepro`)

2. **Vérifier les paramètres**
   - Deployment Target: iOS 13.0 minimum
   - Device: iPhone (ou Universal)

3. **Icônes et Splash Screen**
   - Les icônes sont dans `ios/App/App/Assets.xcassets/AppIcon.appiconset`
   - Le splash screen dans `ios/App/App/Assets.xcassets/Splash.imageset`

### Étape 4: Build et Test
```bash
# Tester sur simulateur
npx cap run ios

# Build pour distribution
# Dans Xcode: Product → Archive
```

### Distribution iOS
1. **TestFlight**: Archive → Distribute App → App Store Connect
2. **App Store**: Après validation TestFlight, soumettre à Review

## 🤖 Build Android

### Étape 1: Préparer les assets
```bash
npm run build:android
```

### Étape 2: Ouvrir dans Android Studio
```bash
npx cap open android
# ou
npm run cap:open:android
```

### Étape 3: Configuration dans Android Studio

1. **Synchroniser Gradle**
   - Android Studio synchronise automatiquement
   - Si nécessaire: File → Sync Project with Gradle Files

2. **Vérifier les paramètres** (`android/app/build.gradle`)
   ```gradle
   android {
       compileSdkVersion 34
       defaultConfig {
           applicationId "com.onosendai.posemetrepro"
           minSdkVersion 22
           targetSdkVersion 34
           versionCode 1
           versionName "1.3.0"
       }
   }
   ```

3. **Icônes**
   - Les icônes sont dans `android/app/src/main/res/mipmap-*`
   - Format adaptatif (foreground + background) depuis Android 8.0

### Étape 4: Build APK
```bash
# Tester sur émulateur/device
npx cap run android

# Ou dans Android Studio:
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

### Étape 5: Build Release (Signé)

1. **Générer une clé de signature**
   ```bash
   keytool -genkey -v -keystore posemetre-release.keystore \
     -alias posemetre -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configurer la signature** (`android/app/build.gradle`)
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file('posemetre-release.keystore')
               storePassword 'your_store_password'
               keyAlias 'posemetre'
               keyPassword 'your_key_password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               minifyEnabled true
               proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
           }
       }
   }
   ```

3. **Build APK signé**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   L'APK sera dans: `android/app/build/outputs/apk/release/`

### Distribution Android
- **Google Play Store**: Upload de l'AAB (Android App Bundle)
- **APK Direct**: Pour distribution hors store

## 🎨 Personnalisation des Ressources

### Icônes

#### Pour iOS (Tailles requises)
| Taille | Usage |
|--------|-------|
| 1024x1024 | App Store |
| 180x180 | iPhone (3x) |
| 120x120 | iPhone (2x) |
| 167x167 | iPad Pro |
| 152x152 | iPad |

#### Pour Android (Icônes adaptatives)
| Dossier | Taille | Densité |
|---------|--------|---------|
| mipmap-mdpi | 48x48 | 1x |
| mipmap-hdpi | 72x72 | 1.5x |
| mipmap-xhdpi | 96x96 | 2x |
| mipmap-xxhdpi | 144x144 | 3x |
| mipmap-xxxhdpi | 192x192 | 4x |

**Outil recommandé**: [App Icon Generator](https://www.appicon.co/)

### Splash Screen

Le splash screen est configuré dans `capacitor.config.json`:
```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#1a1a1a",
      "showSpinner": true,
      "spinnerColor": "#ff6b35"
    }
  }
}
```

## 🔧 Scripts NPM Disponibles

| Commande | Description |
|----------|-------------|
| `npm run build:native` | Build complet (iOS + Android) |
| `npm run build:ios` | Build iOS uniquement |
| `npm run build:android` | Build Android uniquement |
| `npm run cap:sync` | Synchroniser les assets web |
| `npm run cap:open:ios` | Ouvrir dans Xcode |
| `npm run cap:open:android` | Ouvrir dans Android Studio |
| `npm run cap:run:ios` | Lancer sur simulateur iOS |
| `npm run cap:run:android` | Lancer sur émulateur Android |

## 🐛 Résolution de Problèmes

### iOS

**Erreur: "Pod install failed"**
```bash
cd ios/App
pod install --repo-update
```

**Erreur de signature**
- Vérifier que le Bundle ID est unique
- Renouveler les certificats si expirés

### Android

**Erreur Gradle**
```bash
cd android
./gradlew clean
./gradlew --refresh-dependencies
```

**Erreur SDK**
- Vérifier que les SDK sont installés dans Android Studio
- Tools → SDK Manager → SDK Platforms

### Général

**Assets web non mis à jour**
```bash
rm -rf www
npm run build:native
```

**Plugins non reconnus**
```bash
npx cap sync
```

## 📦 Structure du Projet Natif

```
posemetre-pro/
├── www/                    # Assets web compilés
├── ios/                    # Projet Xcode
│   └── App/
│       ├── App/
│       │   ├── public/     # Web assets (copie)
│       │   └── Assets.xcassets/
│       └── Podfile
├── android/                # Projet Android Studio
│   └── app/
│       └── src/main/
│           ├── assets/public/  # Web assets (copie)
│           └── res/           # Ressources Android
├── capacitor.config.json   # Config Capacitor
└── package.json
```

## 📝 Notes Importantes

1. **Toujours exécuter `npm run build:native`** avant d'ouvrir les IDEs
2. **Ne pas modifier** les fichiers dans `ios/` ou `android/` directement pour le web
3. **Sauvegarder** vos keystores et mots de passe de signature
4. **Tester** sur de vrais appareils avant la publication

## 🔗 Ressources Utiles

- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Guide iOS Distribution](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases)
- [Guide Android Publishing](https://developer.android.com/studio/publish)

---

**Besoin d'aide ?** Ouvrez une issue sur GitHub !
