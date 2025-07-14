# Jovial Phenom - CMD Deployment Rehberi

Windows Command Prompt (CMD) kullanarak Jovial Phenom müzik portföyünü deploy etmek için kapsamlı rehber.

## Hızlı Başlangıç

### 1. Sistem Kurulumu (İlk Kez)
```batch
REM CMD'yi Yönetici olarak açın
cd deployment
kurulum-cmd.bat
```

### 2. Uygulama Deployment
```batch
REM Proje dizininde
deployment\deploy-cmd.bat
```

### 3. Yönetim Paneli
```batch
deployment\manage-cmd.bat
```

## Dosya Açıklamaları

### `kurulum-cmd.bat`
- **Amaç**: Sistem gereksinimlerini kurar
- **Kurar**: Chocolatey, Node.js, Git, PM2
- **Yapılandırır**: Windows service, güvenlik duvarı
- **Çalıştırma**: Administrator yetkileriyle

### `deploy-cmd.bat`
- **Amaç**: Uygulamayı deploy eder
- **İşlemler**: Build, PM2 setup, environment config
- **Girdi**: Domain adı
- **Çıktı**: Çalışan production server

### `manage-cmd.bat`
- **Amaç**: Günlük yönetim işlemleri
- **Özellikler**: Start/stop, logs, monitoring, backup
- **Kullanım**: Menü tabanlı interface

### `README-CMD.md`
- **İçerik**: Detaylı dokümantasyon
- **Dil**: Türkçe

## Sistem Gereksinimleri

### Minimum Sistem
- Windows 10/11 veya Windows Server 2016+
- 4 GB RAM
- 2 GB disk alanı
- Internet bağlantısı
- Administrator yetkileri

### Yazılım Gereksinimleri
- Node.js 18+ (otomatik kurulur)
- Git (opsiyonel, otomatik kurulur)
- PM2 (otomatik kurulur)
- Chocolatey (otomatik kurulur)

## Adım Adım Kurulum

### Adım 1: Hazırlık
```batch
REM 1. CMD'yi Yönetici olarak açın
REM 2. Proje dizinine gidin
cd C:\path\to\jovial-phenom

REM 3. Deployment dizinine geçin
cd deployment
```

### Adım 2: Sistem Kurulumu
```batch
REM Gerekli bileşenleri kur
kurulum-cmd.bat

REM Bilgisayarı yeniden başlatın (önerilir)
shutdown /r /t 30
```

### Adım 3: Uygulama Deployment
```batch
REM Proje ana dizininde
deploy-cmd.bat

REM Domain adınızı girin
REM Örnek: jovialphenom.com
```

### Adım 4: Doğrulama
```batch
REM Uygulama durumunu kontrol edin
pm2 status

REM Web tarayıcıda test edin
REM http://localhost:5000
```

## Günlük Yönetim

### Yönetim Paneli Kullanımı
```batch
REM Yönetim panelini açın
manage-cmd.bat

REM Menü seçenekleri:
REM 1. Durum Kontrolü - PM2 status, port kontrolü
REM 2. Logları Görüntüle - Canlı logs, hata logs
REM 3. Restart - Uygulamayı yeniden başlat
REM 4. Stop/Start - Uygulama kontrolü
REM 5. Monitör - PM2 monitoring interface
REM 6. Build - Yeni deployment
REM 7. Environment - .env ayarları
REM 8. Backup - Proje yedeği
```

### Manuel Komutlar
```batch
REM Durum kontrolü
pm2 status
pm2 logs
pm2 monit

REM Uygulama yönetimi
pm2 restart jovial-phenom
pm2 stop jovial-phenom
pm2 start jovial-phenom

REM Build işlemleri
npm run build
npm install --production
```

## Konfigürasyon

### Environment Dosyası (.env)
```
NODE_ENV=production
PORT=5000
VITE_GA_MEASUREMENT_ID=G-38JGPGTZ8C
```

### PM2 Konfigürasyonu (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'jovial-phenom',
    script: './dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

## Güvenlik Ayarları

### Güvenlik Duvarı Kuralları
```batch
REM HTTP/HTTPS trafiği için
netsh advfirewall firewall add rule name="Jovial Phenom HTTP" dir=in action=allow protocol=TCP localport=80
netsh advfirewall firewall add rule name="Jovial Phenom HTTPS" dir=in action=allow protocol=TCP localport=443

REM Development için
netsh advfirewall firewall add rule name="Jovial Phenom Dev" dir=in action=allow protocol=TCP localport=5000
```

### Kullanıcı Hesabı Güvenliği
- Administrator hesabı sadece kurulum için kullanın
- Günlük işlemler için standard kullanıcı hesabı oluşturun
- PM2 service hesabını yapılandırın

## Sorun Giderme

### Yaygın Sorunlar

**Node.js bulunamıyor**
```batch
REM PATH'i yenileyin
refreshenv

REM Manuel kurulum
choco install nodejs -y
```

**PM2 başlatılamıyor**
```batch
REM PM2'yi yeniden yükleyin
npm uninstall -g pm2
npm install -g pm2

REM Windows service setup
npm install -g pm2-windows-startup
pm2-startup install
```

**Port 5000 kullanımda**
```batch
REM Port kullanan process'i bulun
netstat -ano | findstr :5000

REM Process'i sonlandırın
taskkill /f /pid [PID]
```

**Build hatası**
```batch
REM Node modules'ları temizleyin
rmdir /s node_modules
npm install

REM Cache temizleyin
npm cache clean --force
```

### Log Dosya Lokasyonları
- **PM2 Logs**: `%USERPROFILE%\.pm2\logs\`
- **Application Logs**: `C:\jovialphenom\logs\`
- **Windows Event Logs**: Event Viewer → Windows Logs

### Destek Komutları
```batch
REM Sistem bilgileri
systeminfo | findstr /B /C:"OS Name" /C:"OS Version"

REM Node.js/NPM sürümleri
node --version
npm --version
pm2 --version

REM Network bağlantı testi
ping google.com
telnet localhost 5000
```

## Performans Optimizasyonu

### Windows Optimizasyonları
1. **Gereksiz servisleri devre dışı bırakın**
2. **Windows Update ayarlarını yapılandırın**
3. **Disk temizliği yapın**
4. **Performans izleme araçlarını kullanın**

### PM2 Optimizasyonları
```batch
REM Memory limit ayarlayın
pm2 restart jovial-phenom --max-memory-restart 1G

REM Log rotation
pm2 install pm2-logrotate
```

## Yedekleme ve Kurtarma

### Otomatik Yedekleme
```batch
REM Yönetim panelinden yedek alın
manage-cmd.bat
REM Seçenek 9: Yedek Al

REM Manuel yedekleme
xcopy /E /I /Y C:\jovialphenom C:\backup\jovialphenom_%date%
```

### Kurtarma İşlemi
```batch
REM 1. Yedek dosyaları geri yükleyin
xcopy /E /I /Y C:\backup\jovialphenom_[tarih] C:\jovialphenom

REM 2. Dependencies'leri yükleyin
cd C:\jovialphenom
npm install --production

REM 3. Uygulamayı başlatın
pm2 start ecosystem.config.js
```

Bu rehber CMD kullanarak Jovial Phenom müzik portföyünü Windows'ta başarıyla deploy etmeniz için gereken tüm bilgileri içermektedir.