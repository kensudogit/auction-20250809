@echo off
echo ========================================
echo Nuxt.js Static Site Generation Script
echo ========================================

echo.
echo 1. Stopping any running processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.exe 2>nul

echo.
echo 2. Cleaning all build artifacts...
cd frontend

echo   - Removing .nuxt directory...
if exist .nuxt rmdir /s /q .nuxt 2>nul

echo   - Removing .output directory...
if exist .output rmdir /s /q .output 2>nul

echo   - Removing node_modules directory...
if exist node_modules rmdir /s /q node_modules 2>nul

echo   - Removing package-lock.json...
if exist package-lock.json del package-lock.json 2>nul

echo   - Removing .vercel directory...
if exist .vercel rmdir /s /q .vercel 2>nul

echo.
echo 3. Clearing npm cache...
call npm cache clean --force

echo.
echo 4. Reinstalling dependencies...
call npm install

echo.
echo 5. Building static site...
echo   Using static site generation to avoid SSR issues...
call npm run build:static

echo.
echo 6. Checking build output...
if exist .output\public (
    echo SUCCESS: Static site build completed successfully!
    echo Build output: frontend\.output\public
    echo.
    echo 7. Ready for Vercel deployment
    echo Please run: vercel --prod
) else (
    echo ERROR: Build failed - .output/public not found
    echo.
    echo Troubleshooting steps:
    echo 1. Check Node.js version (should be >=18.0.0)
    echo 2. Check npm version (should be >=8.0.0)
    echo 3. Review error messages above
    echo 4. Try using the static configuration
)

echo.
pause
