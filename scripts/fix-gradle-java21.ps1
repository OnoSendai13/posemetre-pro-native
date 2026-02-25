# ==============================================================================
# Fix Gradle for Java 21 compatibility
# ==============================================================================
# Run this after 'npx cap add android' to fix Gradle/Java version issues
# ==============================================================================

param()

$ErrorActionPreference = "Stop"

Write-Host "Fixing Gradle configuration for Java 21..." -ForegroundColor Yellow

$androidDir = "android"

if (-not (Test-Path $androidDir)) {
    Write-Host "Error: android directory not found. Run 'npx cap add android' first." -ForegroundColor Red
    exit 1
}

# Update gradle-wrapper.properties
$wrapperFile = "$androidDir/gradle/wrapper/gradle-wrapper.properties"
if (Test-Path $wrapperFile) {
    $content = Get-Content $wrapperFile -Raw
    $content = $content -replace "gradle-8\.0\.2-all\.zip", "gradle-8.5-all.zip"
    $content = $content -replace "gradle-8\.0-all\.zip", "gradle-8.5-all.zip"
    Set-Content $wrapperFile $content -NoNewline
    Write-Host "  [OK] Updated gradle-wrapper.properties to Gradle 8.5" -ForegroundColor Green
}

# Update build.gradle
$buildFile = "$androidDir/build.gradle"
if (Test-Path $buildFile) {
    $content = Get-Content $buildFile -Raw
    $content = $content -replace "com\.android\.tools\.build:gradle:8\.0\.0", "com.android.tools.build:gradle:8.2.0"
    Set-Content $buildFile $content -NoNewline
    Write-Host "  [OK] Updated Android Gradle Plugin to 8.2.0" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done! Now re-open Android Studio and sync Gradle." -ForegroundColor Green
Write-Host ""
Write-Host "In Android Studio:" -ForegroundColor Yellow
Write-Host "  1. File -> Sync Project with Gradle Files" -ForegroundColor White
Write-Host "  2. Or click 'Try Again' if prompted" -ForegroundColor White
