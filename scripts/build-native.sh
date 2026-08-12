#!/bin/bash

# ==============================================================================
# Build Script for Posemètre Pro Native Apps (iOS & Android)
# ==============================================================================
# This script prepares and synchronizes the web app for native deployment
# Usage: ./scripts/build-native.sh [ios|android|all]
# ==============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║           Posemètre Pro - Native Build Script                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

cd "$PROJECT_ROOT"

# Target platform (default: all)
TARGET=${1:-all}

# ==============================================================================
# Step 1: Prepare web assets
# ==============================================================================
echo -e "${YELLOW}📦 Step 1: Preparing web assets...${NC}"

# Create www directory if it doesn't exist
mkdir -p www

# Copy main files
echo "  → Copying main application files..."
cp index.html www/
cp app.js www/
cp i18n.js www/
cp theme-switcher.js www/
cp styles.css www/
cp sw.js www/
cp manifest.json www/

# Copy icons
echo "  → Copying icons..."
cp -r icons www/
cp icon-192.png icon-512.png www/ 2>/dev/null || true
cp favicon-16x16.png favicon-32x32.png www/ 2>/dev/null || true

# Copy src directory if it exists
if [ -d "src" ]; then
    echo "  → Copying src directory..."
    cp -r src www/
fi

# Copy screenshots if they exist
if [ -d "screenshots" ]; then
    echo "  → Copying screenshots..."
    cp -r screenshots www/
fi

echo -e "${GREEN}  ✓ Web assets prepared in www/${NC}"

# ==============================================================================
# Step 2: Update manifest for native environment
# ==============================================================================
echo -e "${YELLOW}📝 Step 2: Updating manifest for native environment...${NC}"

# Create a native-optimized manifest (remove PWA-specific paths)
if [ -f "www/manifest.json" ]; then
    # Use Python to modify the manifest for native
    python3 << 'EOF'
import json

with open('www/manifest.json', 'r') as f:
    manifest = json.load(f)

# Update paths for native (remove /posemetre-pro/ prefix)
manifest['start_url'] = '/'
manifest['scope'] = '/'
manifest['id'] = '/'

# Remove serviceworker config for native
if 'serviceworker' in manifest:
    del manifest['serviceworker']

# Update shortcuts
if 'shortcuts' in manifest:
    for shortcut in manifest['shortcuts']:
        shortcut['url'] = shortcut['url'].replace('/posemetre-pro/', '/')

# Save updated manifest
with open('www/manifest.json', 'w') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

print('  → Manifest updated for native environment')
EOF
fi

echo -e "${GREEN}  ✓ Manifest updated${NC}"

# ==============================================================================
# Step 3: Sync with Capacitor
# ==============================================================================
echo -e "${YELLOW}🔄 Step 3: Synchronizing with Capacitor...${NC}"

if [ "$TARGET" = "ios" ] || [ "$TARGET" = "all" ]; then
    echo "  → Syncing iOS..."
    npx cap sync ios
    echo -e "${GREEN}  ✓ iOS synchronized${NC}"
fi

if [ "$TARGET" = "android" ] || [ "$TARGET" = "all" ]; then
    echo "  → Syncing Android..."
    npx cap sync android
    echo -e "${GREEN}  ✓ Android synchronized${NC}"
fi

# ==============================================================================
# Summary
# ==============================================================================
echo ""
echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    Build Complete!                              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${GREEN}Next steps:${NC}"
echo ""

if [ "$TARGET" = "ios" ] || [ "$TARGET" = "all" ]; then
    echo -e "${YELLOW}📱 iOS:${NC}"
    echo "   1. Open Xcode:  npx cap open ios"
    echo "   2. Select your team in Signing & Capabilities"
    echo "   3. Build and run on simulator or device"
    echo ""
fi

if [ "$TARGET" = "android" ] || [ "$TARGET" = "all" ]; then
    echo -e "${YELLOW}🤖 Android:${NC}"
    echo "   1. Open Android Studio:  npx cap open android"
    echo "   2. Wait for Gradle sync to complete"
    echo "   3. Build APK: Build → Build Bundle(s) / APK(s) → Build APK(s)"
    echo "   4. Or run on emulator/device"
    echo ""
fi

echo -e "${BLUE}For debugging:${NC}"
echo "   - iOS:     npx cap run ios"
echo "   - Android: npx cap run android"
echo ""
echo -e "${GREEN}Done! 🎉${NC}"
