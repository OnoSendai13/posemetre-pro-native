# ==============================================================================
# Copy PWA icons to Android project
# ==============================================================================
# Run this after 'npx cap add android' to use your PWA icons
# ==============================================================================

param()

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "================================================================" -ForegroundColor Blue
Write-Host "           Copying PWA Icons to Android Project                 " -ForegroundColor Blue
Write-Host "================================================================" -ForegroundColor Blue
Write-Host ""

$androidResDir = "android/app/src/main/res"
$iconsDir = "icons"

if (-not (Test-Path $androidResDir)) {
    Write-Host "Error: Android res directory not found. Run 'npx cap add android' first." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $iconsDir)) {
    Write-Host "Error: icons directory not found." -ForegroundColor Red
    exit 1
}

# Icon mapping: Android folder -> PWA icon size
$iconMappings = @{
    "mipmap-hdpi" = "icon-72x72.png"
    "mipmap-xhdpi" = "icon-96x96.png"
    "mipmap-xxhdpi" = "icon-144x144.png"
    "mipmap-xxxhdpi" = "icon-192x192.png"
}

Write-Host "Copying icons..." -ForegroundColor Yellow

foreach ($mapping in $iconMappings.GetEnumerator()) {
    $destDir = "$androidResDir/$($mapping.Key)"
    $sourceFile = "$iconsDir/$($mapping.Value)"
    $destFile = "$destDir/ic_launcher.png"
    $destFileRound = "$destDir/ic_launcher_round.png"
    $destFileForeground = "$destDir/ic_launcher_foreground.png"
    
    if (Test-Path $sourceFile) {
        # Copy as regular icon
        Copy-Item $sourceFile -Destination $destFile -Force
        # Copy as round icon (Android will handle the shape)
        Copy-Item $sourceFile -Destination $destFileRound -Force
        # Copy as foreground for adaptive icons
        Copy-Item $sourceFile -Destination $destFileForeground -Force
        Write-Host "  [OK] $($mapping.Key) <- $($mapping.Value)" -ForegroundColor Green
    } else {
        Write-Host "  [SKIP] $($mapping.Value) not found" -ForegroundColor Yellow
    }
}

# Handle mdpi (48x48) - use 72x72 as fallback, Android will scale it
$mdpiDir = "$androidResDir/mipmap-mdpi"
$source72 = "$iconsDir/icon-72x72.png"
if ((Test-Path $mdpiDir) -and (Test-Path $source72)) {
    Copy-Item $source72 -Destination "$mdpiDir/ic_launcher.png" -Force
    Copy-Item $source72 -Destination "$mdpiDir/ic_launcher_round.png" -Force
    Copy-Item $source72 -Destination "$mdpiDir/ic_launcher_foreground.png" -Force
    Write-Host "  [OK] mipmap-mdpi <- icon-72x72.png (scaled)" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Blue
Write-Host "                    Icons Copied!                               " -ForegroundColor Blue
Write-Host "================================================================" -ForegroundColor Blue
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. In Android Studio: Build -> Clean Project" -ForegroundColor White
Write-Host "  2. Build -> Rebuild Project" -ForegroundColor White
Write-Host "  3. Run the app to see the new icon" -ForegroundColor White
Write-Host ""
