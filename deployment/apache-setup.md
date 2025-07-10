# Apache + SSL Deployment Guide for Jovial Phenom

## 1. Server Requirements
- Ubuntu/CentOS server with root access
- Domain name pointing to your server IP
- Apache 2.4+
- Node.js 18+ 
- PM2 for process management
- Certbot for SSL certificates

## 2. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Apache
sudo apt install apache2 -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install PM2 globally
sudo npm install -g pm2

# Install Certbot for SSL
sudo apt install certbot python3-certbot-apache -y

# Enable required Apache modules
sudo a2enmod rewrite
sudo a2enmod ssl
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
```

## 3. Upload and Setup Application

```bash
# Create app directory
sudo mkdir -p /var/www/jovialphenom
sudo chown $USER:$USER /var/www/jovialphenom

# Upload your project files to /var/www/jovialphenom
# Then install dependencies
cd /var/www/jovialphenom
npm install --production

# Build the application
npm run build
```

## 4. Configure PM2

```bash
# Start the application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it outputs
```

## 5. Apache Virtual Host Configuration

Create `/etc/apache2/sites-available/jovialphenom.conf`:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/jovialphenom/dist/public
    
    # Redirect HTTP to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/jovialphenom/dist/public
    
    # SSL Configuration (will be added by Certbot)
    
    # Enable compression
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
        SetEnvIfNoCase Request_URI \
            \.(?:gif|jpe?g|png|mp3)$ no-gzip dont-vary
    </Location>
    
    # Security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    
    # Cache static assets
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|mp3|woff|woff2)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header append Cache-Control "public, immutable"
    </FilesMatch>
    
    # Proxy API requests to Node.js
    ProxyPreserveHost On
    ProxyPass /api/ http://localhost:5000/api/
    ProxyPassReverse /api/ http://localhost:5000/api/
    
    # Handle React Router (SPA)
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !^/api/
    RewriteRule . /index.html [L]
    
    # Logs
    ErrorLog ${APACHE_LOG_DIR}/jovialphenom_error.log
    CustomLog ${APACHE_LOG_DIR}/jovialphenom_access.log combined
</VirtualHost>
```

## 6. Enable Site and SSL

```bash
# Enable the site
sudo a2ensite jovialphenom.conf

# Disable default site
sudo a2dissite 000-default

# Test Apache configuration
sudo apache2ctl configtest

# Restart Apache
sudo systemctl restart apache2

# Get SSL certificate (replace with your domain)
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com

# Test SSL renewal
sudo certbot renew --dry-run
```

## 7. Firewall Setup

```bash
# Allow HTTP and HTTPS traffic
sudo ufw allow 'Apache Full'
sudo ufw allow ssh
sudo ufw enable
```

## 8. Monitoring and Maintenance

```bash
# Check PM2 status
pm2 status

# View application logs
pm2 logs

# Restart application
pm2 restart all

# Check Apache status
sudo systemctl status apache2

# View Apache logs
sudo tail -f /var/log/apache2/jovialphenom_error.log
```

## 9. SSL Certificate Auto-Renewal

```bash
# Add to crontab for automatic renewal
sudo crontab -e

# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Environment Variables

Create `/var/www/jovialphenom/.env`:
```
NODE_ENV=production
PORT=5000
VITE_GA_MEASUREMENT_ID=your_ga_id_here
```

## Performance Optimization

1. **Enable Gzip compression** (already in config)
2. **Set cache headers** for static assets (already in config)
3. **Use CDN** for assets if needed
4. **Monitor with PM2** for automatic restarts
5. **Regular backups** of your application and database

## Security Best Practices

1. **Keep system updated**: `sudo apt update && sudo apt upgrade`
2. **Regular SSL renewal**: Automated with crontab
3. **Monitor logs**: Check for suspicious activity
4. **Firewall**: Only allow necessary ports
5. **Backup strategy**: Regular automated backups