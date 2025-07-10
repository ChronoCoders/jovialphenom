# Windows IIS Deployment for Jovial Phenom

This guide provides step-by-step instructions for deploying your Jovial Phenom music portfolio on Windows Server with IIS and SSL.

## Quick Start

### 1. Install Prerequisites (One-time setup)
Run PowerShell as Administrator and execute:
```powershell
.\deployment\install-prerequisites-windows.ps1
```
This installs:
- IIS with required features
- Node.js and npm
- PM2 process manager
- URL Rewrite Module
- Application Request Routing
- win-acme for free SSL certificates

**Important: Restart your computer after running this script.**

### 2. Deploy Your Application
After restart, run PowerShell as Administrator:
```powershell
.\deployment\deploy-windows.ps1 yourdomain.com
```

### 3. Setup SSL Certificate (Free with Let's Encrypt)
```powershell
cd C:\win-acme
.\wacs.exe
```
Follow the wizard to get a free SSL certificate.

## What Gets Deployed

### File Structure
```
C:\inetpub\wwwroot\jovialphenom\
├── dist\public\          # Frontend files (served by IIS)
│   ├── assets\           # Images, audio, CSS, JS
│   ├── index.html        # Main page
│   └── web.config        # IIS configuration
├── dist\index.js         # Backend server (run by PM2)
├── ecosystem.config.js   # PM2 configuration
├── logs\                 # Application logs
└── .env                  # Environment variables
```

### IIS Configuration
- **Website Name**: JovialPhenom
- **Port**: 80 (HTTP) and 443 (HTTPS)
- **Domain Bindings**: yourdomain.com and www.yourdomain.com
- **Document Root**: `C:\inetpub\wwwroot\jovialphenom\dist\public`

### Features Configured
- **URL Rewriting**: Routes API calls to Node.js backend
- **SPA Support**: React Router compatibility
- **SSL Redirect**: Automatic HTTP to HTTPS redirect
- **Compression**: Gzip compression for faster loading
- **Caching**: 1-year cache for static assets
- **Security Headers**: XSS protection, content type validation
- **Error Handling**: Custom 404 page handling

## Management Commands

### Monitor Application
```powershell
# Check PM2 status
pm2 status

# View application logs
pm2 logs jovial-phenom

# Restart application
pm2 restart jovial-phenom

# Stop application
pm2 stop jovial-phenom
```

### IIS Management
```powershell
# Restart IIS
iisreset

# Check IIS service status
Get-Service W3SVC

# View IIS logs
Get-Content "C:\inetpub\logs\LogFiles\W3SVC1\*.log" | Select-Object -Last 20
```

### SSL Certificate Management
```powershell
# Renew SSL certificates (manual)
cd C:\win-acme
.\wacs.exe --renew

# Check certificate expiration
Get-ChildItem Cert:\LocalMachine\WebHosting | Select-Object Subject, NotAfter
```

## Environment Configuration

### Production Environment Variables
Edit `C:\inetpub\wwwroot\jovialphenom\.env`:
```
NODE_ENV=production
PORT=5000
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
```

### DNS Configuration
Point your domain to your server IP:
```
A Record: yourdomain.com → Your_Server_IP
A Record: www.yourdomain.com → Your_Server_IP
```

## Performance Optimization

### IIS Performance Settings
1. Open IIS Manager
2. Select your website
3. Configure:
   - **Compression**: Enable static and dynamic compression
   - **Caching**: Set appropriate cache headers
   - **Connection Limits**: Configure based on your server capacity

### Windows Server Optimization
1. **Disable unnecessary services**
2. **Configure automatic updates** for security patches
3. **Set up performance monitoring**
4. **Configure automated backups**

## Security Best Practices

### Firewall Configuration
```powershell
# Allow HTTP/HTTPS traffic
netsh advfirewall firewall add rule name="HTTP" dir=in action=allow protocol=TCP localport=80
netsh advfirewall firewall add rule name="HTTPS" dir=in action=allow protocol=TCP localport=443

# Block unnecessary ports (example)
netsh advfirewall firewall add rule name="Block SSH" dir=in action=block protocol=TCP localport=22
```

### Regular Maintenance
1. **Windows Updates**: Keep system updated
2. **SSL Certificates**: Monitor expiration and renew
3. **Application Updates**: Update Node.js and npm packages
4. **Log Monitoring**: Review IIS and application logs
5. **Backup Strategy**: Regular backups of application and configuration

## Troubleshooting

### Common Issues

**500 Internal Server Error**
- Check Event Viewer: Windows Logs → Application
- Verify web.config syntax
- Check PM2 application status: `pm2 status`

**API Requests Failing**
- Verify Application Request Routing is enabled
- Check proxy settings in IIS Manager
- Confirm Node.js application is running: `pm2 logs`

**SSL Certificate Issues**
- Verify certificate binding in IIS Manager
- Check certificate expiration
- Re-run win-acme if needed

**Static Files Not Loading**
- Check file permissions: `icacls C:\inetpub\wwwroot\jovialphenom`
- Verify MIME types in web.config
- Check IIS static content settings

### Log Locations
- **IIS Logs**: `C:\inetpub\logs\LogFiles\W3SVC1\`
- **Application Logs**: `C:\inetpub\wwwroot\jovialphenom\logs\`
- **Windows Event Logs**: Event Viewer → Windows Logs
- **PM2 Logs**: `pm2 logs jovial-phenom`

### Support Commands
```powershell
# Test website connectivity
Test-NetConnection yourdomain.com -Port 443

# Check IIS configuration
Get-Website -Name "JovialPhenom"

# Verify SSL certificate
Get-WebBinding -Name "JovialPhenom"

# Check Node.js version
node --version

# Verify PM2 installation
pm2 --version
```

## Backup and Recovery

### Backup Strategy
1. **Application Files**: Regular backup of `C:\inetpub\wwwroot\jovialphenom`
2. **IIS Configuration**: Export website configuration
3. **SSL Certificates**: Backup certificate files
4. **Database**: If using external database, include in backup

### Recovery Process
1. Restore application files to `C:\inetpub\wwwroot\jovialphenom`
2. Run deployment script: `.\deploy-windows.ps1 yourdomain.com`
3. Restore SSL certificates and bindings
4. Test website functionality

This Windows deployment provides enterprise-grade hosting for your Jovial Phenom music portfolio with professional SSL security and performance optimization.