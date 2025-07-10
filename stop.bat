@echo off
title Stop Jovial Phenom Server
color 0C

echo.
echo ========================================
echo  Stop Jovial Phenom Server
echo ========================================
echo.

REM Check if PM2 is available
pm2 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Stopping PM2 processes...
    pm2 stop jovial-phenom 2>nul
    pm2 delete jovial-phenom 2>nul
    echo [INFO] PM2 processes stopped
) else (
    echo [INFO] PM2 not found, checking for Node.js processes...
)

REM Kill any Node.js processes running on port 5000
echo [INFO] Checking for processes on port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do (
    echo [INFO] Stopping process %%a
    taskkill /f /pid %%a >nul 2>&1
)

REM Kill any Node.js processes
echo [INFO] Stopping Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo.
echo [SUCCESS] Jovial Phenom server stopped
echo.
pause