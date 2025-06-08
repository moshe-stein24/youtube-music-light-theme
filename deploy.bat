@echo off
echo 🎵 YouTube Music Light Theme - GitHub Deploy
echo ============================================

REM Configuration - UPDATED WITH YOUR VALUES
set GITHUB_USERNAME=moshestein24
set YOUR_EMAIL=moshestein24@gmail.com
set REPO_NAME=youtube-music-light-theme

REM Check if in right directory
if not exist "manifest.json" (
    echo ❌ manifest.json not found! Run from extension folder.
    pause
    exit /b 1
)

echo 📧 Email: %YOUR_EMAIL%
echo 👤 GitHub: %GITHUB_USERNAME%
echo 📦 Repository: %REPO_NAME%
echo.

set /p confirm=Ready to deploy? (y/N): 
if /i not "%confirm%"=="y" (
    echo ❌ Cancelled
    pause
    exit /b 0
)

echo.
echo 🔄 Updating files...
powershell -Command "(Get-Content 'manifest.json') -replace 'YOUR_GITHUB_USERNAME', '%GITHUB_USERNAME%' -replace 'YOUR_EMAIL_HERE@example.com', '%YOUR_EMAIL%' | Set-Content 'manifest.json'"
powershell -Command "(Get-Content 'privacy-policy.html') -replace 'YOUR_GITHUB_USERNAME', '%GITHUB_USERNAME%' -replace 'YOUR_EMAIL_HERE@example.com', '%YOUR_EMAIL%' | Set-Content 'privacy-policy.html'"
powershell -Command "(Get-Content 'README.md') -replace 'YOUR_GITHUB_USERNAME', '%GITHUB_USERNAME%' -replace 'YOUR_EMAIL_HERE@example.com', '%YOUR_EMAIL%' | Set-Content 'README.md'"

echo.
echo 🚀 Deploying to GitHub...
git init
git add .
git config user.email "%YOUR_EMAIL%"
git config user.name "%GITHUB_USERNAME%"
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ Deployment failed!
    echo.
    echo Common fixes:
    echo 1. Create repository on GitHub first
    echo 2. Check Git is installed
    echo 3. Check GitHub credentials
    pause
    exit /b 1
)

echo.
echo 🎉 Success!
echo.
echo 📋 Next steps:
echo 1. Go to: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%/settings/pages
echo 2. Enable GitHub Pages (main branch)
echo 3. Privacy policy URL: https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/privacy-policy.html

pause