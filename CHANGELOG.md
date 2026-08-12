# 📋 Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.2] - 2026-01-20

### 🌍 Multilingual Support + HSS Mode + Help System

**Status**: ✅ Production-ready  
**Languages**: French (FR) + English (EN)  
**New Features**: i18n, HSS, Help Modal  

### ✨ New Features

#### 🌍 Complete Internationalization (i18n)
- **Automatic language detection** from browser settings
- **FR ↔ EN toggle** button in header
- **Full translation** of:
  - Navigation and labels
  - All form elements and dropdowns
  - Dynamic calculation results
  - Help modal content (5 sections)
  - Zone system descriptions
  - Error messages and tooltips
- **Unit adaptation**: IL (French) / EV (English)
- **localStorage persistence** of language preference

#### ⚡ High-Speed Sync (HSS) Mode
- **Dedicated HSS toggle** in Flash Meter mode
- **Max sync speed selector** (1/200, 1/250, 1/320)
- **Automatic power loss calculation**:
  - ~2 EV loss per stop above sync speed
  - Example: 1/1000 with 1/250 sync = ~4 EV loss
- **Smart recommendations**:
  - Shows adjusted settings accounting for HSS
  - Suggests normal sync alternative when applicable
- **Real-time HSS indicator** showing active status

#### 📖 Integrated Help Modal
- **5 comprehensive sections**:
  1. **General**: Incident vs reflected light, exposure triangle, 18% gray rule
  2. **Light Meter**: Workflow, compensation usage, practical examples
  3. **Flash**: f/X concept, HSS explanation, power adjustment workflow
  4. **Ratios**: Key/Fill concepts, common ratios (2:1, 4:1, 8:1)
  5. **Estimation**: Zone system, spot metering technique
- **Manual Mode warning**: 
  - Explains why reasoning only fully applies in Manual (M) mode
  - Note about LCD/histogram showing JPEG preview, not RAW data
- **Sidebar navigation** for quick section access
- **Keyboard support**: Escape key to close
- **Click outside** to close

### 📝 Files Added
- `i18n.js` - Complete translation system (~25 KB)

### 🛠️ Files Modified
- `index.html` - Help modal HTML, i18n attributes, language button
- `app.js` - HSS calculations, i18n integration, dynamic content translation
- `styles.css` - Help modal styles (dark theme)
- `styles-light.css` - Help modal styles (light theme)
- `README.md` - Complete rewrite in English
- `CHANGELOG.md` - Updated to English

### ✅ Tests
- ✅ Language detection works correctly
- ✅ Language toggle switches all content instantly
- ✅ HSS calculations are accurate
- ✅ Help modal opens/closes properly
- ✅ All 4 modes work in both languages
- ✅ Both themes display correctly

---

## [1.1 Capacitor + Dual Theme] - 2026-01-17

### 🎉 Native Migration + Dual Theme System

**Status**: ✅ Production-ready  
**Platform**: ✅ PWA + iOS + Android ready  
**Themes**: 2 (Light + Dark)  

### ✨ New Features

#### 📦 Capacitor Migration
- **iOS Support**: Native app ready for App Store
- **Android Support**: Native app ready for Play Store
- **Configuration**: package.json + capacitor.config.json
- **Backwards Compatible**: Existing PWA still functional

#### 🎨 Dual Theme System

**Light Mode - Pastel Mint** 🌿
- Background: `#f0f4f8` Blue-gray (60%)
- Primary: `#81c784` Soft mint green (30%)
- Accent: `#64b5f6` Bright blue (10%)
- Style: Modern, soothing, 2024-2026 trend
- Usage: Excellent in bright light

**Dark Mode - Dark Orange** 🌙 (Original)
- Background: `#1a1a1a` Deep black (60%)
- Primary: `#2d2d2d` Dark gray (30%)
- Accent: `#ff6b35` Vibrant orange (10%)
- Style: Professional, technical
- Usage: Excellent in low light

#### 🔄 Automatic & Manual Switching
- **Auto-detection**: Follows system preference (prefers-color-scheme)
- **Manual toggle**: 🌙/☀️ button in header
- **Memory**: Saves user choice (localStorage)
- **Smooth transition**: 0.3s animation between themes

### 📝 Files Added
- `styles-light.css` - Pastel Mint theme (9.7 KB)
- `theme-switcher.js` - Theme switching logic (6.1 KB)
- `package.json` - npm + Capacitor configuration
- `capacitor.config.json` - Native app configuration

### 🛠️ Files Modified
- `index.html` - Theme button + CSS/JS links
- `styles.css` - Theme button styling
- `README.md` - Dual theme + Capacitor documentation
- `CHANGELOG.md` - This file

### ✅ Tests
- ✅ Theme switch works
- ✅ System preference detection OK
- ✅ User choice persistence OK
- ✅ All 4 modes work with both themes
- ✅ PWA still functional
- ✅ Capacitor configured for iOS/Android build

### 🚀 Build Steps
1. Install dependencies: `npm install`
2. Initialize Capacitor: `npx cap init`
3. Add platforms: `npx cap add ios` + `npx cap add android`
4. Build iOS: `npx cap open ios` (Xcode)
5. Build Android: `npx cap open android` (Android Studio)
6. Publish to stores: App Store + Play Store

---

## [1.0 PROD V2] - 2026-01-17

### 🎉 Production Release - All Bugs Fixed

**Status**: ✅ Production-ready  
**Tests**: 8/8 passed + speed tests  
**Known Bugs**: None  

### ✅ Fixed
- **Critical Bug #7**: Shutter speed tolerance too wide in getShutterLabel()
  - **Problem**: 1/3200 displayed as 1/800 (even with 0 EV compensation)
  - **Cause**: Absolute tolerance of 0.001 too large for fast speeds
  - **Solution**: Using relative tolerance of 1% (line 688)
  - **Impact**: Correct display of ALL speeds in ALL modes
  - **Code**: `Math.abs(s.value - value) / s.value < 0.01`

### 🧪 Additional Validation Tests
- ✅ Speed 1/3200 with comp 0 EV → displays 1/3200 (fixed)
- ✅ Speed 1/4000 with comp 0 EV → displays 1/4000
- ✅ Speed 1/8000 with comp 0 EV → displays 1/8000
- ✅ All speeds from 30s to 1/8000 tested and correct

### 📊 Summary of 7 Bugs Fixed
1. ✅ Light Meter exposure logic inverted (RC1)
2. ✅ Incorrect speed rounding (Beta 4)
3. ✅ Fractions mode stuck at 1/1 (RC3)
4. ✅ Incorrect flash power fractions (FINAL V1)
5. ✅ Estimation compensation inverted (FINAL V2)
6. ✅ Estimation incident light inverted (PROD)
7. ✅ Shutter speed tolerance too wide (PROD V2)

---

## [1.0 PROD] - 2026-01-16

### 🎉 Production Version - Fully Functional

**Status**: ✅ Production-ready  
**Tests**: 8/8 passed  
**Known Bugs**: None  

### ✅ Fixed
- **Critical Bug #6**: Incident light calculation inverted in Estimation Mode
  - **Problem**: Dark zone (-2 EV) with f/8 reading gave f/16 instead of f/4
  - **Cause**: Confusion between reflected reading and incident light
  - **Solution**: Line 628 corrected - `calculateAperture(measuredFstop, zoneIL)` without minus sign
  - **Impact**: Estimation Mode now 100% functional

### 🧪 Validation Tests
- ✅ Light Meter Mode: +1.33 EV compensation → f/4 (opens correctly)
- ✅ Flash Meter IL: +2.4 EV adjustment correct
- ✅ Flash Meter Fractions: 1/32 → 1/8 functional
- ✅ Ratios Mode: Key f/8, -2 EV → Fill f/4, ratio 4:1
- ✅ Estimation Incident: Asphalt f/8 → f/4 ✅
- ✅ Estimation Compensation: +1.33 EV → f/2.8 ✅
- ✅ Speed rounding: 1/500 displays correctly
- ✅ Standard ISO: 100 + 1.33 EV → 250

---

## [1.0 RC3] - 2026-01-16

### ✅ Fixed
- **Critical Bug #3**: Fractions mode stuck at 1/1
  - **Problem**: Calculation stayed at 1/1 regardless of compensation
  - **Cause**: Incorrect calculation logic + missing IL values
  - **Solution**: Added `ilValue` to FLASH_POWERS_FRACTIONS + simplified calculation
  - **Files**: `app.js` lines 534-550 (calculateFlashmetre function)

---

## [1.0 RC2] - 2026-01-16

### ✅ Fixed
- **Removed centesimals**: Display to tenth only (+1.0 EV instead of +1.03 EV)
  - 6 occurrences of `.toFixed(2)` → `.toFixed(1)`
  
- **Non-standard ISO fixed**: ISO 251, 403, 1587... → Standard ISO
  - Added `ISO_STANDARD` constant (37 values)
  - `calculateISO()` function rounds to standard values
  - Examples: 251 → 250, 318 → 320, 566 → 640

### ✨ Added
- "Current flash power" field in Fractions mode (14 selectable values)

---

## [1.0 RC1] - 2026-01-16

### ✅ Fixed
- **Critical Bug #1**: Exposure logic inverted in Light Meter Mode
  - **Problem**: +1.33 EV compensation underexposed instead of overexposing
  - **Example**: f/5.6 @ 1/500 + 1.33 EV suggested f/9 @ 1/400 ❌, now f/4 @ 1/500 ✅
  - **Cause**: `calculateAperture()` applied compensation in wrong direction
  - **Solution**: Sign inversion line 440
  - **Impact**: All 3 suggestions (aperture, shutter, ISO) produce correct result

---

## [1.0 Beta 4] - 2026-01-16

### ✅ Fixed
- **Critical Bug #2**: Incorrect speed rounding
  - **Problem**: Selecting 1/500 displayed 1/400
  - **Cause**: `findClosestShutterSpeed()` used absolute difference instead of logarithmic
  - **Solution**: Calculation with `Math.abs(Math.log2(speed / target))`

---

## [1.0 Beta 3] - 2026-01-16

### ✨ Added
- **Exposure compensation in Estimation Mode**
  - Grid -2 EV to +3 EV in thirds
  - 3 automatic suggestions (aperture, shutter, ISO)
  - Double compensation (zone + creative)
  - Consistent workflow with Light Meter Mode

### 📝 Use Cases
- Backlit portrait: +2 EV
- High-key landscape: +1.33 EV
- Low-key portrait: -1 to -2 EV
- Bright snow: +2 EV
- Sunset silhouette: -2 to -3 EV

---

## [1.0 Beta 2] - 2026-01-16

### ✨ Added
- **Enriched reflectance grid**
  - 12 zones (instead of 9)
  - 5 natural 18% gray alternatives: gray concrete, green grass, medium foliage, weathered wood, beech bark
  - Concrete examples for each zone
  - Complete documentation in GUIDE.html

### 📝 Complete Grid
```
+5 EV : Pure white, Snow in full sun
+4 EV : White snow in shade
+3 EV : Birch bark, Light tree trunk
+2 EV : Very fair skin, Light stone
+1 EV : Fair skin, Light sand
 0 EV : 18% Gray, Concrete, Grass, Foliage, Wood, Bark
-1 EV : Dark skin, Foliage in shade
-2 EV : Asphalt, Dark stone
-3 EV : Dark bark, Deep shadows
-4 EV : Near black
```

---

## [1.0 Beta 1] - 2026-01-16

### ✨ Initial Complete Version

#### 4 Professional Modes

**1. Light Meter Mode** (Continuous Light)
- Base aperture measurement
- ISO and shutter configuration
- Compensation -2 to +3 EV in thirds
- 3 automatic suggestions

**2. Flash Meter Mode**
- Adjustable sync speed
- Configurable base ISO
- IL / Fractions switch
- Additional compensation

**3. Ratios Mode (Key/Fill)**
- Key Light configuration
- Ratio -3 to -0.5 EV
- Automatic Fill calculation
- Lighting ratio display

**4. Estimation Mode**
- Spot metering on reference zones
- 9-zone reflectance grid
- Incident light calculation

#### Technical Characteristics
- Installable PWA
- Works offline
- Responsive interface
- Fixed height 720px
- Touch-friendly buttons ≥44px
- Dark theme
- 28 KB total
- 0 dependencies

#### Photographic Values
- 34 apertures (f/1.0 to f/45)
- 58 shutter speeds (30s to 1/8000)
- 37 standard ISO (50 to 102400)
- 14 fractions (1/1 to 1/256) [corrected to 9 in V1.0]
- ⅓ EV compensation
- 0.01 EV precision

---

## 📊 Bug Summary

| # | Bug | Version | Lines | Impact |
|---|-----|---------|-------|--------|
| 1 | Light Meter exposure logic | RC1 | 440 | Critical |
| 2 | Speed rounding | Beta 4 | ~680 | Minor |
| 3 | Fractions mode stuck | RC3 | 534-550 | Critical |
| 4 | Incorrect flash fractions | V1 | 79-93, 123-138 | Critical |
| 5 | Estimation compensation | V2 | 632-633 | Critical |
| 6 | Estimation incident light | PROD | 628 | Critical |
| 7 | Shutter speed tolerance | PROD V2 | 688 | Critical |

**Total**: 7 critical bugs fixed

---

## 🎯 Standards Compliance

### Photographic Standards
- ✅ Apertures: √2 progression
- ✅ Shutter speeds: ×2 progression
- ✅ ISO: 37 standard values
- ✅ Flash power fractions: Binary divisions only
- ✅ Compensation: By thirds of EV

### Equipment Compatibility
- ✅ All camera bodies (Canon, Nikon, Sony, Fuji...)
- ✅ All flash units (Profoto, Godox, Canon, Nikon...)
- ✅ All light meters (Sekonic, Gossen, Minolta)

### Web Standards
- ✅ PWA (Manifest, Service Worker)
- ✅ Responsive mobile-first
- ✅ Accessibility (contrast, labels)
- ✅ Performance (<35 KB, 0 dependencies)
- ✅ Offline-ready

---

## 🙏 Contributors

- **Laurent Suchet IG:@ono_sendai** — Development and intensive testing
  - Identification of 7 critical bugs
  - Professional photographic standards validation
  - Real-world field testing

---

## 📅 Development History

- **January 16, 2026**: Intensive development
  - Beta 1 → PROD in one day
  - 7 iterations
  - 7 critical bugs identified and fixed
  - 100% validation tests passed

- **January 17, 2026**: v1.1 Release
  - Dual theme system
  - Capacitor integration

- **January 20, 2026**: v1.2 Release
  - Complete i18n (FR/EN)
  - HSS mode
  - Help modal

---

## [1.7.0] - 2026-08-12

### 🎯 Ratios Key/Fill — Puissance Réelle + Nombre Guide + Calcul Affiné

**Status**: ✅ Production-ready  
**Platform**: ✅ PWA + iOS + Android (API 36)  
**Version Code**: 6 (Google Play: versionCode 6, versionName 1.7.0)

### ✨ New Features

#### 💡 Ratios Mode — Real Flash Power Input
- **Key Light Power (W)** — Puissance réelle du flash principal (défaut 600W)
- **Fill Light Power (W)** — Puissance réelle du flash fill (défaut 100W)
- **Key Guide Number** — Nombre Guide du flash principal (défaut 100)
- **Fill Guide Number** — Nombre Guide du flash fill (défaut 200)

#### 🔧 Calcul Affiné Mode Fractions
- Conversion W → IL via `log2(puissance)` pour calculer le delta réel
- Fraction requise = `2^(keyIL + ratioIL) / fillPower` → mapping vers fraction standard (1/1 à 1/512)
- **Distance suggérée** affichée si GN renseignés : `(GN_fill / GN_key)m`
- Si même puissance Key/Fill → affiche `1/1` (pas de changement nécessaire)

### 🛠️ Technical
- 4 nouveaux inputs DOM (`ratio-key-power`, `ratio-fill-power`, `ratio-key-gn`, `ratio-fill-gn`)
- Event listeners `change` → recalcul instantané
- Cache DOM mis à jour dans `state.js`
- Suppression variables d'état legacy `_keyFlashPower`, `_fillFlashPower`, `_ngKey`, `_ngFill` (maintenant lu direct du DOM)

### 📝 Files Modified
- `index.html` — 4 nouveaux champs dans l'onglet Ratios
- `i18n.js` — 6 nouvelles clés de traduction (FR/EN)
- `src/ui.js` — `calculateRatios()` lecture DOM + distance affichée
- `src/main.js` — Event listeners pour les 4 nouveaux champs
- `src/state.js` — Cache DOM + suppression état legacy
- `package.json` — Version 1.7.0
- `README.md` — Badge version + prérequis Android API 36
- `NATIVE_BUILD.md` — compileSdk/targetSdk 36, minSdk 24

---

## [1.3] - 2026-08-11

### 🏗️ Architecture Modulaire + Modern UI Effects + Code Cleanup

**Status**: ✅ Production-ready  
**Platform**: ✅ PWA + iOS + Android ready  
**Languages**: FR + EN (complete i18n)  
**Themes**: Dark (Amber Studio) + Light (Pastel Mint)

### ✨ New Features

#### 📦 Modular Architecture (src/)
- **Complete refactor** from monolithic `app.js` to ES modules:
  - `src/constants.js` — Photographic reference data (ISO, apertures, shutters, flash powers)
  - `src/calculations.js` — Pure math functions (zero DOM, fully testable)
  - `src/state.js` — Encapsulated state store with DOM caching
  - `src/ui.js` — DOM manipulation, calculations orchestration, i18n integration
  - `src/effects.js` — Modern UI enhancements (IntersectionObserver, gestures, micro-interactions)
  - `src/main.js` — Entry point, Capacitor setup, PWA, event wiring
- **Dead code removal**: Deleted 35 KB legacy `app.js` (was not loaded)

#### 🎨 Modern UI Effects (effects.js)
- **Scroll-triggered animations** via IntersectionObserver with stagger delays
- **Directional tab transitions** (slide left/right based on navigation direction)
- **Polished modal** with slide-up sheet on mobile, scale-in on desktop, swipe-to-dismiss
- **Micro-interactions**: Ripple effect on compensation buttons, result pop-in animation, focus pulse glow
- **Scroll-linked compact header** (shrinks on scroll down, restores on scroll up)
- **Glassmorphism depth** with backdrop-filter on cards, header, tabs, modal

#### 🌍 i18n Completeness
- 100% coverage: all dynamic content, help modal (5 sections), zone dropdown, reflectance grid
- Unit adaptation: IL (FR) / EV (EN) via `evUnit` translation key
- Language toggle shows current language (FR/EN) instead of static "EN"

#### ⚡ HSS & Flash Improvements
- HSS power loss formula refined: ~2 EV base + ~1 EV per stop above sync
- Flash current power selector extended to 1/512 (10 fractions total)
- Smart normal-sync fallback suggestions when HSS settings are extreme

#### 🔧 Technical Fixes
- Function return consistency: `calculateShutterSpeed()` now returns numeric value (matches `calculateAperture()`)
- ISO validation with clamping to standard range (25–102400)
- Safe DOM access: optional chaining for `selectedOptions[0]`
- Service Worker path configurable via `window.APP_CONFIG.basePath`
- Removed duplicate HTML blocks in Ratios mode (key-power/fill-power inputs)

### 📝 Files Added
- `src/constants.js`, `src/calculations.js`, `src/state.js`, `src/ui.js`, `src/effects.js`, `src/main.js`

### 🛠️ Files Modified
- `index.html` — Removed legacy script loads, added `type="module" src="src/main.js"`, fixed Ratios duplication, language toggle
- `package.json` — Version 1.3.0, modular entry point
- `styles.css` — All effect animations, glassmorphism, compact header, modal sheet
- `i18n.js` — Added `evUnit` key, current-language display for toggle

### ✅ Tests
- ✅ Modular architecture loads correctly (ES modules)
- ✅ All 4 modes work in both languages (FR/EN)
- ✅ Both themes display correctly with all effects
- ✅ HSS calculations accurate across sync speeds
- ✅ Help modal: swipe dismiss (mobile), ESC/close/overlay (desktop)
- ✅ Scroll animations trigger on tab switch
- ✅ Capacitor native build: iOS + Android
- ✅ PWA offline functional

---

## 🚀 Future Versions

### v1.4 (Planned)
- [ ] History of last 10 measurements
- [ ] Saved favorites / Presets
- [ ] Export to CSV/PDF
- [ ] Unit tests (Vitest) for calculations.js

### v2.0 (Future)
- [ ] Additional languages (ES, DE, IT)
- [ ] Native iOS app (App Store)
- [ ] Native Android app (Play Store)
- [ ] Bluetooth integration (Sekonic)
- [ ] DOF/Hyperfocal calculator

---

## 📜 License

MIT License - Copyright (c) 2026 Laurent Suchet IG:@ono_sendai

---

<div align="center">

**Happy shooting!** 📸✨

Current version: **1.2** (January 20, 2026)

</div>
