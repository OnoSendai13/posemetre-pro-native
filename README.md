# 📷 Light Meter Pro Assistant

<div align="center">

![Version](https://img.shields.io/badge/version-1.2-blue.svg)
![PWA](https://img.shields.io/badge/PWA-ready-green.svg)
![Capacitor](https://img.shields.io/badge/Capacitor-iOS%20%7C%20Android-purple.svg)
![Size](https://img.shields.io/badge/size-~35KB-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![i18n](https://img.shields.io/badge/languages-FR%20%7C%20EN-orange.svg)

**Professional incident light metering assistant for photographers**

[Features](#-features) • [Installation](#-installation) • [Modes](#-modes) • [Documentation](#-documentation)

</div>

---

## 🌟 What's New in v1.2

### 🌍 Multilingual Support (FR/EN)
- **Complete i18n system** with automatic browser language detection
- **FR ↔ EN toggle** in header
- **Full translation** of all content including dynamic results and help modal
- **IL/EV units** adapted per language

### ⚡ High-Speed Sync (HSS) Mode
- **Dedicated HSS toggle** in Flash Meter mode
- **Configurable max sync speed** (1/200, 1/250, 1/320)
- **Automatic power loss calculation** (approx. -2EV per stop above sync)
- **Smart recommendations** with normal sync fallback suggestions

### 📖 Integrated Help Modal
- **5 comprehensive sections**: General, Light Meter, Flash, Ratios, Estimation
- **Manual Mode warning** with RAW/JPEG histogram explanation
- **Quick navigation** sidebar
- **Keyboard support** (Escape to close)

### 🎨 Dual Theme System
- **Light Mode** - Pastel Mint (excellent in bright conditions)
- **Dark Mode** - Dark Orange (professional, low-light friendly)
- **Auto-detection** via `prefers-color-scheme`
- **Manual toggle** with localStorage persistence

---

## ✨ Features

### 🎯 Core Philosophy
This app works with **incident light measurement** (light falling ON the subject), which is more reliable than reflected light (what the camera meter sees) because it's independent of subject color/reflectance.

### 📱 Progressive Web App
- **Installable** on any device (iOS, Android, Desktop)
- **Offline-ready** with Service Worker caching
- **Native-like** experience with Capacitor support

### 🛠️ Professional Tools
- **4 specialized modes** for different shooting scenarios
- **Exposure compensation** in 1/3 EV increments
- **Industry-standard values** (apertures, shutter speeds, ISO)
- **Real-time calculations** with multiple suggestions

---

## 🎛️ Modes

### 📷 Light Meter Mode (Continuous Light)
Measure incident light and get exposure suggestions.

**Workflow:**
1. Take incident light reading with your meter
2. Enter the f-stop indicated
3. Set your ISO and base shutter speed
4. Apply creative exposure compensation if needed
5. Get 3 equivalent exposure options (aperture, shutter, ISO variations)

**Compensation Range:** -2 EV to +3 EV (1/3 increments)

---

### ⚡ Flash Meter Mode
Professional flash metering with IL and Fractions modes.

**Features:**
- **IL Mode**: Direct EV adjustments (+/-2.4 EV, etc.)
- **Fractions Mode**: Real flash power values (1/1, 1/2, 1/4... 1/256)
- **HSS Support**: Calculate power loss for high-speed sync
- **Sync Speed**: Configurable from 1/60 to 1/320

**HSS Mode:**
- Enable HSS toggle when shooting above sync speed
- Select your camera's max sync speed
- App automatically calculates power loss
- Get recommendations for normal sync alternatives

---

### 💡 Ratios Mode (Key/Fill)
Calculate fill light based on key light measurement.

**Common Ratios:**
| Ratio | EV Difference | Look |
|-------|---------------|------|
| 1:1 | 0 EV | Flat, even lighting |
| 2:1 | -1 EV | Subtle modeling |
| 4:1 | -2 EV | Dramatic, portrait |
| 8:1 | -3 EV | Very dramatic |

**Workflow:**
1. Measure key light f-stop
2. Select desired ratio
3. Get fill light f-stop automatically

---

### 📊 Estimation Mode (Without Light Meter)
Calculate incident light from spot meter readings.

**How it works:**
Cameras assume everything is 18% gray. By measuring a known-reflectance zone and telling the app what you measured, it calculates the actual incident light.

**Zone System (12 zones):**
| Zone | EV | Examples |
|------|-----|----------|
| +5 | Pure white | Snow in full sun |
| +4 | Bright white | Snow in shade |
| +3 | Light gray | Birch bark |
| +2 | Light skin | Very fair skin, white wall |
| +1 | Caucasian skin | Fair skin, light sand |
| 0 | 18% Gray | Concrete, green grass, medium foliage |
| -1 | Dark skin | Dark skin, foliage in shade |
| -2 | Dark tones | Asphalt, dark stone |
| -3 | Very dark | Dark bark, deep shadows |
| -4 | Near black | Very dense shadows |

---

## 📥 Installation

### PWA (Recommended)
**iOS Safari:**
1. Open the app URL
2. Tap Share button
3. Select "Add to Home Screen"

**Android Chrome:**
1. Open the app URL
2. Tap the install banner or menu
3. Select "Install app"

### Native App (Capacitor)
```bash
# Install dependencies
npm install

# Add platforms
npx cap add ios
npx cap add android

# Open in IDE
npx cap open ios      # Xcode
npx cap open android  # Android Studio
```

### Local Development
```bash
# Simple HTTP server
npm run dev
# Opens at http://localhost:8000
```

---

## 📚 Documentation

### 📖 Help Modal
Click the **?** button in the header for integrated help with:
- Incident vs reflected light explanation
- Exposure triangle principles
- Mode-specific workflows
- HSS guidance
- Zone system reference

### 🔄 Language Toggle
Click **FR/EN** in the header to switch languages instantly.

### 🌙 Theme Toggle
Click the **☀️/🌙** icon to switch between light and dark themes.

---

## 🔧 Technical Specifications

### Photographic Values
- **Apertures**: 34 values (f/1.0 to f/45)
- **Shutter Speeds**: 58 values (30s to 1/8000)
- **ISO**: 37 standard values (50 to 102400)
- **Flash Powers**: 9 binary fractions (1/1 to 1/256)
- **Compensation**: 1/3 EV increments

### Technology Stack
- **Frontend**: HTML5, CSS3, ES6+ JavaScript
- **PWA**: Service Worker, Web App Manifest
- **Mobile**: Capacitor 5.x for iOS/Android
- **i18n**: Custom translation system
- **Size**: ~35KB total (zero dependencies)

### Browser Support
| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Safari | ✅ Full |
| Firefox | ✅ Full |
| Edge | ✅ Full |
| Samsung Internet | ✅ Full |

---

## 📂 Project Structure

```
lightmeter-app-pwa/
├── index.html          # Main application
├── app.js              # Application logic
├── i18n.js             # Translation system
├── theme-switcher.js   # Theme management
├── styles.css          # Dark theme styles
├── styles-light.css    # Light theme styles
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── GUIDE.html          # Installation guide
├── CHANGELOG.md        # Version history
├── README.md           # This file
└── LICENSE             # MIT License
```

---

## 📋 Changelog Highlights

### v1.2 (Current)
- ✅ Multilingual support (FR/EN)
- ✅ HSS mode with power loss calculation
- ✅ Integrated help modal
- ✅ Complete i18n of all dynamic content

### v1.1 
- ✅ Dual theme system (Light/Dark)
- ✅ Capacitor integration for native apps
- ✅ Auto theme detection

### v1.0
- ✅ 4 professional modes
- ✅ PWA with offline support
- ✅ 7 critical bugs fixed

See [CHANGELOG.md](CHANGELOG.md) for complete history.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

MIT License - Copyright (c) 2026 Laurent Suchet IG:@ono_sendai

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Laurent Suchet IG:@ono_sendai** — Neurologist and professional photographer
- Designed for real-world field use
- Based on professional photographic standards
- Tested with Profoto and other major flash brands

---

<div align="center">

**Happy shooting!** 📸✨

Made with ❤️ for photographers by Laurent Suchet IG:@ono_sendai

[⬆ Back to top](#-light-meter-pro-assistant)

</div>
