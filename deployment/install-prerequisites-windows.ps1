# Prerequisites Installation Script for Windows IIS Deployment
# Run this script as Administrator in PowerShell

Write-Host "🚀 Installing prerequisites for Jovial Phenom deployment..." -ForegroundColor Green

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error "This script must be run as Administrator!"
    exit 1
}

# Install Chocolatey (package manager for Windows)
Write-Host "📦 Installing Chocolatey..." -ForegroundColor Yellow
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Install Node.js
Write-Host "📱 Installing Node.js..." -ForegroundColor Yellow
choco install nodejs -y

# Install IIS and required features
Write-Host "🌐 Installing IIS with required features..." -ForegroundColor Yellow
Enable-WindowsOptionalFeature -Online -FeatureName @(
    "IIS-WebServerRole",
    "IIS-WebServer", 
    "IIS-CommonHttpFeatures",
    "IIS-HttpErrors",
    "IIS-HttpLogging",
    "IIS-HttpRedirect",
    "IIS-ApplicationDevelopment",
    "IIS-NetFxExtensibility45",
    "IIS-HealthAndDiagnostics",
    "IIS-HttpCompressionStatic",
    "IIS-HttpCompressionDynamic",
    "IIS-Security",
    "IIS-RequestFiltering",
    "IIS-Performance",
    "IIS-WebServerManagementTools",
    "IIS-ManagementConsole",
    "IIS-IIS6ManagementCompatibility",
    "IIS-Metabase"
) -All

# Download and install URL Rewrite Module
Write-Host "🔄 Installing URL Rewrite Module..." -ForegroundColor Yellow
$urlRewriteUrl = "https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi"
$urlRewritePath = "$env:TEMP\rewrite_amd64_en-US.msi"
Invoke-WebRequest -Uri $urlRewriteUrl -OutFile $urlRewritePath
Start-Process msiexec.exe -Wait -ArgumentList "/i $urlRewritePath /quiet"
Remove-Item $urlRewritePath

# Download and install Application Request Routing
Write-Host "🎯 Installing Application Request Routing..." -ForegroundColor Yellow
$arrUrl = "https://download.microsoft.com/download/E/9/8/E9849D6A-020E-47E4-9FD0-A023E99B54EB/requestRouter_amd64_en-US.msi"
$arrPath = "$env:TEMP\requestRouter_amd64_en-US.msi"
Invoke-WebRequest -Uri $arrUrl -OutFile $arrPath
Start-Process msiexec.exe -Wait -ArgumentList "/i $arrPath /quiet"
Remove-Item $arrPath

# Refresh environment variables again
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Install PM2 globally
Write-Host "⚡ Installing PM2..." -ForegroundColor Yellow
npm install -g pm2
npm install -g pm2-windows-startup

# Setup PM2 to start with Windows
Write-Host "🔧 Configuring PM2 startup..." -ForegroundColor Yellow
pm2-startup install

# Install win-acme for free SSL certificates
Write-Host "🔒 Downloading win-acme for SSL certificates..." -ForegroundColor Yellow
$winAcmeUrl = "https://github.com/win-acme/win-acme/releases/latest/download/win-acme.v2.2.9.1701.x64.pluggable.zip"
$winAcmePath = "C:\win-acme"
$winAcmeZip = "$env:TEMP\win-acme.zip"

New-Item -ItemType Directory -Path $winAcmePath -Force | Out-Null
Invoke-WebRequest -Uri $winAcmeUrl -OutFile $winAcmeZip
Expand-Archive -Path $winAcmeZip -DestinationPath $winAcmePath -Force
Remove-Item $winAcmeZip

Write-Host "✅ Prerequisites installation completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Installed components:" -ForegroundColor Cyan
Write-Host "• IIS with all required features"
Write-Host "• Node.js and npm"
Write-Host "• PM2 process manager"
Write-Host "• URL Rewrite Module"
Write-Host "• Application Request Routing"
Write-Host "• win-acme (for free SSL certificates)"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart your computer to complete IIS installation"
Write-Host "2. Upload your project files to the server"
Write-Host "3. Run the deployment script: .\deploy-windows.ps1 yourdomain.com"
Write-Host ""
Write-Host "For SSL certificates after deployment:" -ForegroundColor Cyan
Write-Host "1. Navigate to C:\win-acme"
Write-Host "2. Run: .\wacs.exe"
Write-Host "3. Follow the wizard to get free SSL certificate"

# Prompt for restart
$restart = Read-Host "Would you like to restart now to complete the installation? (y/n)"
if ($restart -eq "y" -or $restart -eq "Y") {
    Write-Host "🔄 Restarting computer..." -ForegroundColor Yellow
    Restart-Computer -Force
}