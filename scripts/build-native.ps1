# ==============================================================================
# Build Script for Posemetre Pro Native Apps (iOS & Android) - Windows PowerShell
# ==============================================================================
# Usage: .\scripts\build-native.ps1 [ios|android|all]
# ==============================================================================

param(
    [string]$Target = "all"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "================================================================" -ForegroundColor Blue
Write-Host "         Posemetre Pro - Native Build Script (Windows)          " -ForegroundColor Blue
Write-Host "================================================================" -ForegroundColor Blue
Write-Host ""

# Get project root
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

# ==============================================================================
# Step 1: Prepare web assets
# ==============================================================================
Write-Host "Step 1: Preparing web assets..." -ForegroundColor Yellow

# Create www directory if it doesn't exist
if (-not (Test-Path "www")) {
    New-Item -ItemType Directory -Path "www" | Out-Null
}

# Copy main files
Write-Host "  -> Copying main application files..."
$mainFiles = @("index.html", "app.js", "i18n.js", "theme-switcher.js", "styles.css", "sw.js", "manifest.json")
foreach ($file in $mainFiles) {
    if (Test-Path $file) {
        Copy-Item $file -Destination "www/" -Force
    }
}

# Copy icons
Write-Host "  -> Copying icons..."
if (Test-Path "icons") {
    Copy-Item -Path "icons" -Destination "www/" -Recurse -Force
}

# Copy additional icons
$iconFiles = @("icon-192.png", "icon-512.png", "favicon-16x16.png", "favicon-32x32.png")
foreach ($file in $iconFiles) {
    if (Test-Path $file) {
        Copy-Item $file -Destination "www/" -Force
    }
}

# Copy src directory if it exists
if (Test-Path "src") {
    Write-Host "  -> Copying src directory..."
    Copy-Item -Path "src" -Destination "www/" -Recurse -Force
}

# Copy screenshots if they exist
if (Test-Path "screenshots") {
    Write-Host "  -> Copying screenshots..."
    Copy-Item -Path "screenshots" -Destination "www/" -Recurse -Force
}

Write-Host "  [OK] Web assets prepared in www/" -ForegroundColor Green

# ==============================================================================
# Step 2: Update manifest for native environment
# ==============================================================================
Write-Host ""
Write-Host "Step 2: Updating manifest for native environment..." -ForegroundColor Yellow

if (Test-Path "www/manifest.json") {
    $manifest = Get-Content "www/manifest.json" -Raw | ConvertFrom-Json
    
    # Update paths for native
    $manifest.start_url = "/"
    $manifest.scope = "/"
    $manifest.id = "/"
    
    # Remove serviceworker config for native
    if ($manifest.PSObject.Properties["serviceworker"]) {
        $manifest.PSObject.Properties.Remove("serviceworker")
    }
    
    # Update shortcuts
    if ($manifest.shortcuts) {
        foreach ($shortcut in $manifest.shortcuts) {
            $shortcut.url = $shortcut.url -replace "/posemetre-pro/", "/"
        }
    }
    
    # Save updated manifest
    $manifest | ConvertTo-Json -Depth 10 | Set-Content "www/manifest.json" -Encoding UTF8
    Write-Host "  -> Manifest updated for native environment"
}

Write-Host "  [OK] Manifest updated" -ForegroundColor Green

# ==============================================================================
# Step 3: Sync with Capacitor
# ==============================================================================
Write-Host ""
Write-Host "Step 3: Synchronizing with Capacitor..." -ForegroundColor Yellow

if ($Target -eq "ios" -or $Target -eq "all") {
    Write-Host "  -> Syncing iOS..."
    npx cap sync ios
    Write-Host "  [OK] iOS synchronized" -ForegroundColor Green
}

if ($Target -eq "android" -or $Target -eq "all") {
    Write-Host "  -> Syncing Android..."
    npx cap sync android
    Write-Host "  [OK] Android synchronized" -ForegroundColor Green
}

# ==============================================================================
# Summary
# ==============================================================================
Write-Host ""
Write-Host "================================================================" -ForegroundColor Blue
Write-Host "                    Build Complete!                             " -ForegroundColor Blue
Write-Host "================================================================" -ForegroundColor Blue
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Green
Write-Host ""

if ($Target -eq "ios" -or $Target -eq "all") {
    Write-Host "[iOS]:" -ForegroundColor Yellow
    Write-Host "   1. Open Xcode:  npx cap open ios"
    Write-Host "   2. Select your team in Signing & Capabilities"
    Write-Host "   3. Build and run on simulator or device"
    Write-Host ""
}

if ($Target -eq "android" -or $Target -eq "all") {
    Write-Host "[Android]:" -ForegroundColor Yellow
    Write-Host "   1. Open Android Studio:  npx cap open android"
    Write-Host "   2. Wait for Gradle sync to complete"
    Write-Host "   3. Build APK: Build -> Build Bundle(s) / APK(s) -> Build APK(s)"
    Write-Host "   4. Or run on emulator/device"
    Write-Host ""
}

Write-Host "For debugging:" -ForegroundColor Blue
Write-Host "   - iOS:     npx cap run ios"
Write-Host "   - Android: npx cap run android"
Write-Host ""
Write-Host "Done!" -ForegroundColor Green
