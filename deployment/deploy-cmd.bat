@echo off
chcp 65001 >nul
title Jovial Phenom - CMD Deployment
color 0A

echo.
echo ========================================
echo  Jovial Phenom - CMD Deployment
echo ========================================
echo.
echo Bu script Jovial Phenom müzik portföyünü Windows'ta CMD ile deploy eder.
echo.

REM Kullanıcıdan domain adını al
set /p DOMAIN="Domain adınızı girin (örn: jovialphenom.com): "
if "%DOMAIN%"=="" (
    echo [HATA] Domain adı gerekli!
    pause
    exit /b 1
)

echo.
echo [BİLGİ] Domain: %DOMAIN%
echo.

REM Administrator kontrolü
net session >nul 2>&1
if %errorlevel% equ 0 (
    echo [BİLGİ] Administrator yetkileriyle çalışıyor
) else (
    echo [UYARI] Administrator yetkileri gerekli
    echo Lütfen CMD'yi "Yönetici olarak çalıştır" ile açın
    pause
    exit /b 1
)

REM Node.js kontrolü
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Node.js yüklü değil
    echo Lütfen https://nodejs.org adresinden Node.js indirin
    pause
    exit /b 1
)

echo [BİLGİ] Node.js sürümü:
node --version

REM Git kontrolü (opsiyonel)
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [BİLGİ] Git mevcut
) else (
    echo [UYARI] Git bulunamadı (opsiyonel)
)

echo.
echo ========================================
echo  ADIM 1: Proje Hazırlığı
echo ========================================

REM Proje dizini oluştur
set APP_DIR=C:\jovialphenom
echo [BİLGİ] Uygulama dizini: %APP_DIR%

if not exist "%APP_DIR%" (
    echo [BİLGİ] Dizin oluşturuluyor...
    mkdir "%APP_DIR%"
)

REM Eğer mevcut dizindeyse dosyaları kopyala
if exist "package.json" (
    echo [BİLGİ] Proje dosyaları kopyalanıyor...
    xcopy /E /I /Y . "%APP_DIR%" >nul
) else (
    echo [UYARI] Bu dizinde package.json bulunamadı
    echo Lütfen proje dizininde çalıştırın veya dosyaları manuel olarak %APP_DIR% dizinine kopyalayın
    pause
)

cd /d "%APP_DIR%"

REM Dependencies yükle
echo.
echo ========================================
echo  ADIM 2: Dependencies
echo ========================================

if not exist "node_modules" (
    echo [BİLGİ] Dependencies yükleniyor...
    npm install
    if %errorlevel% neq 0 (
        echo [HATA] Dependencies yüklenemedi
        pause
        exit /b 1
    )
) else (
    echo [BİLGİ] Dependencies zaten mevcut
)

REM Build işlemi
echo.
echo ========================================
echo  ADIM 3: Build İşlemi
echo ========================================

echo [BİLGİ] Uygulama build ediliyor...
npm run build
if %errorlevel% neq 0 (
    echo [HATA] Build işlemi başarısız
    pause
    exit /b 1
)

REM PM2 kontrolü ve yükleme
echo.
echo ========================================
echo  ADIM 4: PM2 Process Manager
echo ========================================

pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [BİLGİ] PM2 yükleniyor...
    npm install -g pm2
    if %errorlevel% neq 0 (
        echo [HATA] PM2 yüklenemedi
        pause
        exit /b 1
    )
)

echo [BİLGİ] PM2 sürümü:
pm2 --version

REM Logs dizini oluştur
if not exist "logs" mkdir logs

REM PM2 ile başlat
echo.
echo ========================================
echo  ADIM 5: Uygulama Başlatma
echo ========================================

echo [BİLGİ] Mevcut işlemler durduruluyor...
pm2 stop jovial-phenom 2>nul
pm2 delete jovial-phenom 2>nul

echo [BİLGİ] Uygulama PM2 ile başlatılıyor...
pm2 start ecosystem.config.js
if %errorlevel% neq 0 (
    echo [HATA] Uygulama başlatılamadı
    pause
    exit /b 1
)

REM PM2 ayarlarını kaydet
pm2 save

echo.
echo ========================================
echo  ADIM 6: Windows Service (Opsiyonel)
echo ========================================

set /p INSTALL_SERVICE="PM2'yi Windows service olarak yüklemek ister misiniz? (y/n): "
if /i "%INSTALL_SERVICE%"=="y" (
    echo [BİLGİ] PM2 Windows service yükleniyor...
    npm install -g pm2-windows-startup
    pm2-startup install
    echo [BİLGİ] PM2 artık Windows ile birlikte başlayacak
)

echo.
echo ========================================
echo  ADIM 7: Environment Dosyası
echo ========================================

if not exist ".env" (
    echo [BİLGİ] .env dosyası oluşturuluyor...
    echo NODE_ENV=production > .env
    echo PORT=5000 >> .env
    echo VITE_GA_MEASUREMENT_ID=G-38JGPGTZ8C >> .env
    echo [BİLGİ] .env dosyası oluşturuldu
) else (
    echo [BİLGİ] .env dosyası zaten mevcut
)

echo.
echo ========================================
echo  DEPLOYMENT TAMAMLANDI!
echo ========================================
echo.
echo ✓ Uygulama başarıyla deploy edildi
echo ✓ PM2 ile çalışıyor
echo ✓ Otomatik restart aktif
echo.
echo UYGULAMA BİLGİLERİ:
echo URL: http://localhost:5000
echo Domain: http://%DOMAIN% (DNS ayarları yapıldıktan sonra)
echo Proje Dizini: %APP_DIR%
echo.
echo YÖNETİM KOMUTLARI:
echo   pm2 status           - Durum kontrolü
echo   pm2 logs             - Log görüntüleme
echo   pm2 restart all      - Restart
echo   pm2 stop all         - Durdur
echo   pm2 monit            - Monitör
echo.
echo SONRAKI ADIMLAR:
echo 1. Web sunucusu (IIS/Apache) kurulumu
echo 2. Domain DNS ayarları
echo 3. SSL sertifikası kurulumu
echo 4. Güvenlik duvarı ayarları
echo.

REM PM2 durumunu göster
pm2 status

echo.
echo Detaylı yönergeler için: deployment\README-Windows.md
echo.
pause