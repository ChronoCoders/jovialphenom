# Windows IIS Deployment Script for Jovial Phenom
# Run this script as Administrator in PowerShell

param(
    [Parameter(Mandatory=$true)]
    [string]$Domain,
    [string]$AppPath = "C:\inetpub\wwwroot\jovialphenom"
)

Write-Host "🚀 Deploying Jovial Phenom to IIS with domain: $Domain" -ForegroundColor Green

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error "This script must be run as Administrator!"
    exit 1
}

# Create application directory
Write-Host "📁 Creating application directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $AppPath -Force | Out-Null
New-Item -ItemType Directory -Path "$AppPath\logs" -Force | Out-Null

# Set permissions
Write-Host "🔐 Setting permissions..." -ForegroundColor Yellow
icacls $AppPath /grant "IIS_IUSRS:(OI)(CI)F" | Out-Null

# Build application (if in project directory)
if (Test-Path "package.json") {
    Write-Host "📦 Building application..." -ForegroundColor Yellow
    npm run build
    
    # Copy files to deployment directory
    Write-Host "📋 Copying files..." -ForegroundColor Yellow
    Copy-Item -Path ".\*" -Destination $AppPath -Recurse -Force -Exclude @("node_modules", ".git", "deployment")
    
    # Install production dependencies
    Set-Location $AppPath
    npm install --production
}

# Create web.config
Write-Host "⚙️ Creating web.config..." -ForegroundColor Yellow
$webConfig = @"
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Redirect to HTTPS" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions>
                        <add input="{HTTPS}" pattern="off" ignoreCase="true" />
                    </conditions>
                    <action type="Redirect" url="https://{HTTP_HOST}{REQUEST_URI}" 
                            redirectType="Permanent" appendQueryString="false" />
                </rule>
                
                <rule name="API Proxy" stopProcessing="true">
                    <match url="^api/(.*)" />
                    <action type="Rewrite" url="http://localhost:5000/api/{R:1}" />
                </rule>
                
                <rule name="React Router" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/api/" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/" />
                </rule>
            </rules>
        </rewrite>
        
        <staticContent>
            <mimeMap fileExtension=".mp3" mimeType="audio/mpeg" />
            <mimeMap fileExtension=".woff" mimeType="font/woff" />
            <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
        </staticContent>
        
        <urlCompression doDynamicCompression="true" doStaticCompression="true" />
        
        <httpProtocol>
            <customHeaders>
                <add name="X-Content-Type-Options" value="nosniff" />
                <add name="X-Frame-Options" value="DENY" />
                <add name="X-XSS-Protection" value="1; mode=block" />
                <add name="Strict-Transport-Security" value="max-age=63072000; includeSubDomains; preload" />
            </customHeaders>
        </httpProtocol>
        
        <caching enabled="true" enableKernelCache="true">
            <profiles>
                <add extension=".css" policy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".js" policy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".png" policy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".jpg" policy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".mp3" policy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".svg" policy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".woff" policy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".woff2" policy="CacheForTimePeriod" duration="365.00:00:00" />
            </profiles>
        </caching>
        
        <httpErrors errorMode="Custom" defaultResponseMode="ExecuteURL">
            <remove statusCode="404" subStatusCode="-1" />
            <error statusCode="404" path="/" responseMode="ExecuteURL" />
        </httpErrors>
    </system.webServer>
</configuration>
"@

$webConfig | Out-File -FilePath "$AppPath\dist\public\web.config" -Encoding UTF8

# Import WebAdministration module
Import-Module WebAdministration -ErrorAction SilentlyContinue

# Remove existing site if it exists
if (Get-Website -Name "JovialPhenom" -ErrorAction SilentlyContinue) {
    Write-Host "🗑️ Removing existing website..." -ForegroundColor Yellow
    Remove-Website -Name "JovialPhenom"
}

# Create IIS website
Write-Host "🌐 Creating IIS website..." -ForegroundColor Yellow
New-Website -Name "JovialPhenom" -PhysicalPath "$AppPath\dist\public" -Port 80 -HostHeader $Domain

# Add www binding
New-WebBinding -Name "JovialPhenom" -Protocol http -Port 80 -HostHeader "www.$Domain"

# Start/restart PM2 application
Write-Host "🔄 Starting Node.js application with PM2..." -ForegroundColor Yellow
Set-Location $AppPath
pm2 delete jovial-phenom -s
pm2 start ecosystem.config.js
pm2 save

# Configure Windows Firewall
Write-Host "🔥 Configuring Windows Firewall..." -ForegroundColor Yellow
netsh advfirewall firewall add rule name="HTTP" dir=in action=allow protocol=TCP localport=80 | Out-Null
netsh advfirewall firewall add rule name="HTTPS" dir=in action=allow protocol=TCP localport=443 | Out-Null

Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host "🔗 Your site should be available at: http://$Domain" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Setup SSL certificate using win-acme or your SSL provider"
Write-Host "2. Add HTTPS binding in IIS Manager"
Write-Host "3. Test your website: http://$Domain"
Write-Host "4. Monitor with: pm2 status"
Write-Host ""
Write-Host "For SSL setup with win-acme:" -ForegroundColor Cyan
Write-Host "1. Download from: https://www.win-acme.com/"
Write-Host "2. Run: .\wacs.exe"
Write-Host "3. Follow the wizard to get free SSL certificate"