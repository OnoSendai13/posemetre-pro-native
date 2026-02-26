# ==============================================================================
# Fix Android configuration for Java 21 + Google Play + AGP 9.x compatibility
# ==============================================================================
# Run this after 'npx cap add android' to fix:
# - Gradle/Java version issues
# - Google Play target SDK requirements (API 35)
# - AGP 9.x ProGuard compatibility
# ==============================================================================

param()

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "================================================================" -ForegroundColor Blue
Write-Host "   Android Configuration Fix (Java 21 + AGP 9.x + Google Play) " -ForegroundColor Blue
Write-Host "================================================================" -ForegroundColor Blue
Write-Host ""

$androidDir = "android"

if (-not (Test-Path $androidDir)) {
    Write-Host "Error: android directory not found. Run 'npx cap add android' first." -ForegroundColor Red
    exit 1
}

# ==============================================================================
# 1. Update gradle-wrapper.properties
# ==============================================================================
Write-Host "[1/4] Updating Gradle version..." -ForegroundColor Yellow

$wrapperFile = "$androidDir/gradle/wrapper/gradle-wrapper.properties"
if (Test-Path $wrapperFile) {
    $content = Get-Content $wrapperFile -Raw
    # AGP 9.x requires Gradle 8.11.1+
    $content = $content -replace "gradle-\d+\.\d+(\.\d+)?-all\.zip", "gradle-8.11.1-all.zip"
    Set-Content $wrapperFile $content -NoNewline
    Write-Host "  [OK] Gradle 8.11.1" -ForegroundColor Green
}

# ==============================================================================
# 2. Update build.gradle (AGP version)
# ==============================================================================
Write-Host "[2/4] Updating Android Gradle Plugin..." -ForegroundColor Yellow

$buildFile = "$androidDir/build.gradle"
if (Test-Path $buildFile) {
    $content = Get-Content $buildFile -Raw
    # Keep current AGP version or update to 9.0.1
    $content = $content -replace "com\.android\.tools\.build:gradle:\d+\.\d+\.\d+", "com.android.tools.build:gradle:9.0.1"
    Set-Content $buildFile $content -NoNewline
    Write-Host "  [OK] AGP 9.0.1" -ForegroundColor Green
}

# ==============================================================================
# 3. Fix ProGuard for AGP 9.x (proguard-android.txt -> proguard-android-optimize.txt)
# ==============================================================================
Write-Host "[3/4] Fixing ProGuard configuration for AGP 9.x..." -ForegroundColor Yellow

$appBuildFile = "$androidDir/app/build.gradle"
if (Test-Path $appBuildFile) {
    $content = Get-Content $appBuildFile -Raw
    $content = $content -replace "proguard-android\.txt", "proguard-android-optimize.txt"
    Set-Content $appBuildFile $content -NoNewline
    Write-Host "  [OK] ProGuard updated to proguard-android-optimize.txt" -ForegroundColor Green
}

# ==============================================================================
# 4. Update variables.gradle (SDK versions for Google Play)
# ==============================================================================
Write-Host "[4/4] Updating SDK versions for Google Play..." -ForegroundColor Yellow

$variablesFile = "$androidDir/variables.gradle"
if (Test-Path $variablesFile) {
    $content = @"
ext {
    minSdkVersion = 24
    compileSdkVersion = 35
    targetSdkVersion = 35
    androidxActivityVersion = '1.9.0'
    androidxAppCompatVersion = '1.7.0'
    androidxCoordinatorLayoutVersion = '1.2.0'
    androidxCoreVersion = '1.13.1'
    androidxFragmentVersion = '1.8.0'
    coreSplashScreenVersion = '1.0.1'
    androidxWebkitVersion = '1.11.0'
    junitVersion = '4.13.2'
    androidxJunitVersion = '1.2.1'
    androidxEspressoCoreVersion = '3.6.1'
    cordovaAndroidVersion = '10.1.1'
}
"@
    Set-Content $variablesFile $content -NoNewline
    Write-Host "  [OK] targetSdkVersion = 35 (Android 15)" -ForegroundColor Green
    Write-Host "  [OK] minSdkVersion = 24 (Android 7.0)" -ForegroundColor Green
}

# ==============================================================================
# Summary
# ==============================================================================
Write-Host ""
Write-Host "================================================================" -ForegroundColor Blue
Write-Host "                    Configuration Complete!                     " -ForegroundColor Blue
Write-Host "================================================================" -ForegroundColor Blue
Write-Host ""
Write-Host "Changes applied:" -ForegroundColor Green
Write-Host "  - Gradle 8.11.1 (AGP 9.x compatible)" -ForegroundColor White
Write-Host "  - Android Gradle Plugin 9.0.1" -ForegroundColor White
Write-Host "  - ProGuard -> proguard-android-optimize.txt" -ForegroundColor White
Write-Host "  - targetSdkVersion 35 (Google Play requirement)" -ForegroundColor White
Write-Host "  - minSdkVersion 24 (Android 7.0+)" -ForegroundColor White
Write-Host "  - Updated AndroidX dependencies" -ForegroundColor White
Write-Host ""
Write-Host "Next steps in Android Studio:" -ForegroundColor Yellow
Write-Host "  1. File -> Sync Project with Gradle Files" -ForegroundColor White
Write-Host "  2. Build -> Build Bundle(s) / APK(s) -> Build APK(s)" -ForegroundColor White
Write-Host ""
