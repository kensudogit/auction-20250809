@echo off
echo ========================================
echo Vercel Project Status Check
echo ========================================
echo.

echo Checking Vercel project status...
call vercel ls
if %errorlevel% neq 0 (
    echo Error: Failed to get Vercel project list
    echo Please make sure you are logged in to Vercel
    pause
    exit /b 1
)

echo.
echo Checking current project configuration...
if exist ".vercel\project.json" (
    echo Project is linked to Vercel
    type ".vercel\project.json"
) else (
    echo Project is not linked to Vercel
)

echo.
echo Checking Vercel configuration...
if exist "vercel.json" (
    echo vercel.json found
    type "vercel.json"
) else (
    echo vercel.json not found
)

echo.
echo ========================================
echo Status check completed
echo ========================================
pause
