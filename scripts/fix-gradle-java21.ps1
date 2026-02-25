# ==============================================================================
# Fix Android configuration for Java 21 + Google Play compatibility
# ==============================================================================
# Run this after 'npx cap add android' to fix:
# - Gradle/Java version issues
# - Google Play target SDK requirements (API 35)
# ==============================================================================

param()

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "================================================================" -ForegroundColor Blue
Write-Host "   Android Configuration Fix (Java 21 + Google Play)           " -ForegroundColor Blue
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
Write-Host "[1/3] Updating Gradle version..." -ForegroundColor Yellow

$wrapperFile = "$androidDir/gradle/wrapper/gradle-wrapper.properties"
if (Test-Path $wrapperFile) {
    $content = Get-Content $wrapperFile -Raw
    $content = $content -replace "gradle-8\.\d+(\.\d+)?-all\.zip", "gradle-8.5-all.zip"
    Set-Content $wrapperFile $content -NoNewline
    Write-Host "  [OK] Gradle 8.5" -ForegroundColor Green
}

# ==============================================================================
# 2. Update build.gradle (AGP version)
# ==============================================================================
Write-Host "[2/3] Updating Android Gradle Plugin..." -ForegroundColor Yellow

$buildFile = "$androidDir/build.gradle"
if (Test-Path $buildFile) {
    $content = Get-Content $buildFile -Raw
    $content = $content -replace "com\.android\.tools\.build:gradle:8\.\d+\.\d+", "com.android.tools.build:gradle:8.2.0"
    Set-Content $buildFile $content -NoNewline
    Write-Host "  [OK] AGP 8.2.0" -ForegroundColor Green
}

# ==============================================================================
# 3. Update variables.gradle (SDK versions for Google Play)
# ==============================================================================
Write-Host "[3/3] Updating SDK versions for Google Play..." -ForegroundColor Yellow

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
Write-Host "  - Gradle 8.5 (Java 21 compatible)" -ForegroundColor White
Write-Host "  - Android Gradle Plugin 8.2.0" -ForegroundColor White
Write-Host "  - targetSdkVersion 35 (Google Play requirement)" -ForegroundColor White
Write-Host "  - minSdkVersion 24 (Android 7.0+)" -ForegroundColor White
Write-Host "  - Updated AndroidX dependencies" -ForegroundColor White
Write-Host ""
Write-Host "Next steps in Android Studio:" -ForegroundColor Yellow
Write-Host "  1. File -> Sync Project with Gradle Files" -ForegroundColor White
Write-Host "  2. Build -> Build Bundle(s) / APK(s) -> Build APK(s)" -ForegroundColor White
Write-Host ""
