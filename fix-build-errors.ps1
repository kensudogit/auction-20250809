# Nuxt.js Build Error Fix Script (PowerShell)
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Nuxt.js Build Error Fix Script" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

Write-Host ""

Write-Host "1. Stopping any running processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process -Name "npm" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host ""

Write-Host "2. Cleaning all build artifacts and dependencies..." -ForegroundColor Yellow
Set-Location frontend

# Remove build directories
$directories = @(".nuxt", ".output", "node_modules", ".vercel")
foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Write-Host "  - Removing $dir directory..." -ForegroundColor Cyan
        Remove-Item -Path $dir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Remove package-lock.json
if (Test-Path "package-lock.json") {
    Write-Host "  - Removing package-lock.json..." -ForegroundColor Cyan
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
}

Write-Host ""

Write-Host "3. Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host ""

Write-Host "4. Reinstalling dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""

Write-Host "5. Testing build process..." -ForegroundColor Yellow
npm run build

Write-Host ""

Write-Host "6. Checking build output..." -ForegroundColor Yellow
if (Test-Path ".output\public") {
    Write-Host "SUCCESS: Build completed successfully!" -ForegroundColor Green
    Write-Host "Build output: frontend\.output\public" -ForegroundColor Green
    Write-Host ""
    Write-Host "7. Ready for Vercel deployment" -ForegroundColor Green
    Write-Host "Please run: vercel --prod" -ForegroundColor Green
} else {
    Write-Host "ERROR: Build failed - .output/public not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "1. Check Node.js version (should be >=18.0.0)" -ForegroundColor Yellow
    Write-Host "2. Check npm version (should be >=8.0.0)" -ForegroundColor Yellow
    Write-Host "3. Review error messages above" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to continue"
