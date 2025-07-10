@echo off
title Jovial Phenom - Production Server
color 0B

echo.
echo ========================================
echo  Jovial Phenom - Production Server
echo ========================================
echo.

REM Check if running as Administrator
net session >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Running as Administrator
) else (
    echo [WARNING] Not running as Administrator
    echo Some features may not work properly
    echo.
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

REM Check if PM2 is installed
pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Installing PM2...
    npm install -g pm2
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install PM2
        pause
        exit /b 1
    )
)

REM Install dependencies
if not exist "node_modules" (
    echo [INFO] Installing production dependencies...
    npm install --production
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Build the application
echo [INFO] Building application for production...
npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build application
    pause
    exit /b 1
)

REM Create logs directory
if not exist "logs" mkdir logs

REM Stop any existing PM2 processes
echo [INFO] Stopping any existing processes...
pm2 stop jovial-phenom 2>nul
pm2 delete jovial-phenom 2>nul

REM Start with PM2
echo [INFO] Starting production server with PM2...
pm2 start ecosystem.config.js

REM Save PM2 configuration
pm2 save

REM Display status
echo.
echo [SUCCESS] Jovial Phenom is now running in production mode!
echo.
pm2 status
echo.
echo Management commands:
echo   pm2 status           - Check application status
echo   pm2 logs             - View application logs
echo   pm2 restart all      - Restart application
echo   pm2 stop all         - Stop application
echo.
echo Application should be available at:
echo   http://localhost:5000
echo   http://your-domain.com (if configured)
echo.

pause