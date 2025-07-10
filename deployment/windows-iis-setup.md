# Windows IIS + SSL Deployment Guide for Jovial Phenom

## 1. Prerequisites
- Windows Server 2016+ or Windows 10/11 Pro
- Domain name pointing to your server IP
- Administrative privileges
- Internet connection for downloads

## 2. Install Required Components

### Install IIS with Required Features
```powershell
# Run PowerShell as Administrator
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole, IIS-WebServer, IIS-CommonHttpFeatures, IIS-HttpErrors, IIS-HttpLogging, IIS-HttpRedirect, IIS-ApplicationDevelopment, IIS-NetFxExtensibility45, IIS-HealthAndDiagnostics, IIS-HttpCompressionStatic, IIS-Security, IIS-RequestFiltering, IIS-Performance, IIS-WebServerManagementTools, IIS-ManagementConsole, IIS-IIS6ManagementCompatibility, IIS-Metabase, IIS-ASPNET45
```

### Install Node.js
1. Download Node.js 18+ from https://nodejs.org
2. Install with default settings
3. Verify installation:
```powershell
node --version
npm --version
```

### Install PM2 for Windows
```powershell
npm install -g pm2
npm install -g pm2-windows-startup
pm2-startup install
```

### Install URL Rewrite Module
1. Download from: https://www.iis.net/downloads/microsoft/url-rewrite
2. Install the MSI package

### Install Application Request Routing (ARR)
1. Download from: https://www.iis.net/downloads/microsoft/application-request-routing
2. Install the MSI package
3. Enable proxy in IIS Manager:
   - Open IIS Manager
   - Click on server name
   - Double-click "Application Request Routing Cache"
   - Click "Server Proxy Settings"
   - Check "Enable proxy"
   - Apply changes

## 3. Setup Application

### Create Application Directory
```powershell
# Create app directory
New-Item -ItemType Directory -Path "C:\inetpub\wwwroot\jovialphenom" -Force

# Set permissions
icacls "C:\inetpub\wwwroot\jovialphenom" /grant "IIS_IUSRS:(OI)(CI)F"
```

### Deploy Application Files
1. Copy all project files to `C:\inetpub\wwwroot\jovialphenom`
2. Install dependencies:
```powershell
cd C:\inetpub\wwwroot\jovialphenom
npm install --production
npm run build
```

### Setup PM2 Service
```powershell
# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Install PM2 as Windows service
pm2-startup install
```

## 4. Configure IIS Website

### Create Website in IIS Manager
1. Open IIS Manager
2. Right-click "Sites" → "Add Website"
3. Configure:
   - Site name: `JovialPhenom`
   - Physical path: `C:\inetpub\wwwroot\jovialphenom\dist\public`
   - Binding: HTTP, Port 80, Host name: `yourdomain.com`
4. Add another binding for `www.yourdomain.com`

### Configure Web.config
Create `C:\inetpub\wwwroot\jovialphenom\dist\public\web.config`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <!-- URL Rewrite Rules -->
        <rewrite>
            <rules>
                <!-- Redirect HTTP to HTTPS -->
                <rule name="Redirect to HTTPS" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions>
                        <add input="{HTTPS}" pattern="off" ignoreCase="true" />
                    </conditions>
                    <action type="Redirect" url="https://{HTTP_HOST}{REQUEST_URI}" 
                            redirectType="Permanent" appendQueryString="false" />
                </rule>
                
                <!-- Proxy API requests to Node.js -->
                <rule name="API Proxy" stopProcessing="true">
                    <match url="^api/(.*)" />
                    <action type="Rewrite" url="http://localhost:5000/api/{R:1}" />
                </rule>
                
                <!-- Handle React Router -->
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
        
        <!-- Static Content and Compression -->
        <staticContent>
            <mimeMap fileExtension=".mp3" mimeType="audio/mpeg" />
            <mimeMap fileExtension=".woff" mimeType="font/woff" />
            <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
        </staticContent>
        
        <urlCompression doDynamicCompression="true" doStaticCompression="true" />
        <httpCompression>
            <dynamicTypes>
                <add mimeType="text/*" enabled="true" />
                <add mimeType="message/*" enabled="true" />
                <add mimeType="application/javascript" enabled="true" />
                <add mimeType="application/json" enabled="true" />
            </dynamicTypes>
            <staticTypes>
                <add mimeType="text/*" enabled="true" />
                <add mimeType="message/*" enabled="true" />
                <add mimeType="application/javascript" enabled="true" />
                <add mimeType="application/atom+xml" enabled="true" />
                <add mimeType="application/xaml+xml" enabled="true" />
            </staticTypes>
        </httpCompression>
        
        <!-- Security Headers -->
        <httpProtocol>
            <customHeaders>
                <add name="X-Content-Type-Options" value="nosniff" />
                <add name="X-Frame-Options" value="DENY" />
                <add name="X-XSS-Protection" value="1; mode=block" />
                <add name="Strict-Transport-Security" value="max-age=63072000; includeSubDomains; preload" />
            </customHeaders>
        </httpProtocol>
        
        <!-- Caching -->
        <caching enabled="true" enableKernelCache="true">
            <profiles>
                <add extension=".css" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".js" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".png" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".jpg" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".jpeg" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".gif" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".mp3" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".svg" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".ico" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".woff" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
                <add extension=".woff2" policy="CacheForTimePeriod" kernelCachePolicy="CacheForTimePeriod" duration="365.00:00:00" />
            </profiles>
        </caching>
        
        <!-- Error Pages -->
        <httpErrors errorMode="Custom" defaultResponseMode="ExecuteURL">
            <remove statusCode="404" subStatusCode="-1" />
            <error statusCode="404" path="/" responseMode="ExecuteURL" />
        </httpErrors>
    </system.webServer>
</configuration>
```

## 5. SSL Certificate Setup

### Option A: Free SSL with Let's Encrypt (win-acme)
1. Download win-acme from: https://www.win-acme.com/
2. Extract to `C:\win-acme`
3. Run as Administrator:
```powershell
cd C:\win-acme
.\wacs.exe
```
4. Follow the wizard to get certificates for your domain

### Option B: Paid SSL Certificate
1. Purchase SSL certificate from your provider
2. In IIS Manager:
   - Select your website
   - Double-click "SSL Certificates"
   - Click "Import..." to import your certificate
   - Add HTTPS binding (port 443) with your certificate

## 6. Windows Firewall Configuration
```powershell
# Allow HTTP and HTTPS traffic
netsh advfirewall firewall add rule name="HTTP" dir=in action=allow protocol=TCP localport=80
netsh advfirewall firewall add rule name="HTTPS" dir=in action=allow protocol=TCP localport=443
```

## 7. Environment Variables
Create `C:\inetpub\wwwroot\jovialphenom\.env`:
```
NODE_ENV=production
PORT=5000
VITE_GA_MEASUREMENT_ID=your_ga_id_here
```

## 8. Monitoring and Maintenance

### PM2 Commands
```powershell
# Check application status
pm2 status

# View logs
pm2 logs

# Restart application
pm2 restart all

# Stop application
pm2 stop all
```

### IIS Monitoring
- Open Event Viewer → Windows Logs → System
- Check IIS logs in `C:\inetpub\logs\LogFiles`
- Monitor performance in Task Manager or Performance Monitor

### Automatic Startup
PM2 service will automatically start with Windows after running:
```powershell
pm2 save
pm2-startup install
```

## 9. Performance Optimization

### IIS Performance Settings
1. Open IIS Manager
2. Select server name
3. Double-click "Compression"
4. Enable both static and dynamic compression
5. Set compression level to 9 for maximum compression

### Windows Performance
1. Disable unnecessary Windows services
2. Configure Windows Updates for manual updates
3. Set up automated backups
4. Monitor disk space and memory usage

## 10. Security Best Practices

1. **Keep Windows Updated**: Enable automatic security updates
2. **Firewall**: Only open necessary ports (80, 443)
3. **User Accounts**: Use dedicated service account for IIS
4. **SSL Configuration**: Use strong cipher suites
5. **File Permissions**: Restrict access to application files
6. **Backup Strategy**: Regular automated backups

## 11. Troubleshooting

### Common Issues
1. **500 Errors**: Check Event Viewer and IIS logs
2. **Node.js not starting**: Verify PM2 service status
3. **SSL Issues**: Check certificate binding in IIS
4. **API not working**: Verify ARR proxy settings
5. **Static files not loading**: Check web.config and file permissions

### Useful Commands
```powershell
# Restart IIS
iisreset

# Check IIS status
Get-Service W3SVC

# View application logs
pm2 logs jovial-phenom

# Test website connectivity
Test-NetConnection yourdomain.com -Port 443
```