#!/bin/bash

# Deployment script for Jovial Phenom
# Usage: ./deploy.sh [domain.com]

set -e

DOMAIN=${1:-yourdomain.com}
APP_DIR="/var/www/jovialphenom"

echo "🚀 Deploying Jovial Phenom to $DOMAIN"

# Create logs directory
mkdir -p logs

# Build the application
echo "📦 Building application..."
npm run build

# Create Apache virtual host config
echo "⚙️  Creating Apache configuration..."
sudo tee /etc/apache2/sites-available/jovialphenom.conf > /dev/null <<EOF
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias www.$DOMAIN
    DocumentRoot $APP_DIR/dist/public
    
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>

<VirtualHost *:443>
    ServerName $DOMAIN
    ServerAlias www.$DOMAIN
    DocumentRoot $APP_DIR/dist/public
    
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
        SetEnvIfNoCase Request_URI \
            \.(?:gif|jpe?g|png|mp3)$ no-gzip dont-vary
    </Location>
    
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|mp3|woff|woff2)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header append Cache-Control "public, immutable"
    </FilesMatch>
    
    ProxyPreserveHost On
    ProxyPass /api/ http://localhost:5000/api/
    ProxyPassReverse /api/ http://localhost:5000/api/
    
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !^/api/
    RewriteRule . /index.html [L]
    
    ErrorLog \${APACHE_LOG_DIR}/jovialphenom_error.log
    CustomLog \${APACHE_LOG_DIR}/jovialphenom_access.log combined
</VirtualHost>
EOF

# Enable site and restart Apache
echo "🌐 Configuring Apache..."
sudo a2ensite jovialphenom.conf
sudo a2dissite 000-default || true
sudo systemctl reload apache2

# Start/restart PM2 application
echo "🔄 Starting application with PM2..."
pm2 delete jovial-phenom || true
pm2 start ecosystem.config.js
pm2 save

echo "✅ Deployment complete!"
echo "🔗 Your site should be available at: http://$DOMAIN"
echo "🔒 Run SSL setup: sudo certbot --apache -d $DOMAIN -d www.$DOMAIN"
echo "📊 Monitor with: pm2 status"
EOF

chmod +x deployment/deploy.sh