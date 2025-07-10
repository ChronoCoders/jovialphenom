@echo off
title Jovial Phenom - Music Portfolio Server
color 0A

echo.
echo ========================================
echo  Jovial Phenom Music Portfolio Server
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

REM Check if npm dependencies are installed
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Build the application if needed
if not exist "dist" (
    echo [INFO] Building application...
    npm run build
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to build application
        pause
        exit /b 1
    )
)

echo [INFO] Starting Jovial Phenom server...
echo.
echo Server will be available at:
echo   Local:    http://localhost:5000
echo   Network:  http://0.0.0.0:5000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev

REM If the server stops, pause to show any error messages
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server stopped unexpectedly
    echo Check the error messages above
    pause
)