@echo off
echo ========================================
echo Vercel Deployment Script
echo ========================================

echo.
echo 1. Cleaning previous build artifacts...
cd frontend
if exist .nuxt rmdir /s /q .nuxt
if exist .output rmdir /s /q .output
if exist node_modules\.vite rmdir /s /q node_modules\.vite

echo.
echo 2. Installing dependencies...
call npm install

echo.
echo 3. Building for production...
call npm run build

echo.
echo 4. Checking build output...
if not exist .output\public (
    echo ERROR: Build failed - .output/public not found
    pause
    exit /b 1
)

echo.
echo 5. Build completed successfully!
echo Build output: frontend\.output\public

echo.
echo 6. Ready for Vercel deployment
echo Please run: vercel --prod

echo.
pause
