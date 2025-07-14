@echo off
chcp 65001 >nul
title Jovial Phenom - Yönetim Paneli
color 0B

:MENU
cls
echo.
echo ========================================
echo  Jovial Phenom - Yönetim Paneli
echo ========================================
echo.
echo 1. Durum Kontrolü
echo 2. Logları Görüntüle
echo 3. Uygulamayı Yeniden Başlat
echo 4. Uygulamayı Durdur
echo 5. Uygulamayı Başlat
echo 6. Monitör Açı
echo 7. Build ve Deploy
echo 8. Environment Ayarları
echo 9. Yedek Al
echo 0. Çıkış
echo.
set /p choice="Seçiminizi yapın (0-9): "

if "%choice%"=="1" goto STATUS
if "%choice%"=="2" goto LOGS
if "%choice%"=="3" goto RESTART
if "%choice%"=="4" goto STOP
if "%choice%"=="5" goto START
if "%choice%"=="6" goto MONITOR
if "%choice%"=="7" goto BUILD
if "%choice%"=="8" goto ENV
if "%choice%"=="9" goto BACKUP
if "%choice%"=="0" goto EXIT
goto MENU

:STATUS
cls
echo.
echo ========================================
echo  DURUM KONTROLÜ
echo ========================================
echo.
echo PM2 Durumu:
pm2 status
echo.
echo Node.js Sürümü:
node --version
echo.
echo NPM Sürümü:
npm --version
echo.
echo Port 5000 Kontrolü:
netstat -an | findstr :5000
echo.
pause
goto MENU

:LOGS
cls
echo.
echo ========================================
echo  LOG GÖRÜNTÜLEME
echo ========================================
echo.
echo 1. Canlı loglar (Ctrl+C ile çıkış)
echo 2. Son 50 satır
echo 3. Hata logları
echo 4. Geri dön
echo.
set /p logchoice="Seçiminizi yapın: "

if "%logchoice%"=="1" (
    echo [BİLGİ] Canlı loglar görüntüleniyor... (Ctrl+C ile durdurun)
    pm2 logs jovial-phenom --lines 100
) else if "%logchoice%"=="2" (
    echo Son 50 satır:
    pm2 logs jovial-phenom --lines 50 --nostream
    pause
) else if "%logchoice%"=="3" (
    echo Hata logları:
    pm2 logs jovial-phenom --err --lines 50 --nostream
    pause
) else (
    goto MENU
)
goto MENU

:RESTART
cls
echo.
echo ========================================
echo  UYGULAMA RESTART
echo ========================================
echo.
echo [BİLGİ] Uygulama yeniden başlatılıyor...
pm2 restart jovial-phenom
if %errorlevel% equ 0 (
    echo ✓ Başarıyla yeniden başlatıldı
) else (
    echo ✗ Restart işlemi başarısız
)
echo.
pm2 status
pause
goto MENU

:STOP
cls
echo.
echo ========================================
echo  UYGULAMA DURDUR
echo ========================================
echo.
echo [BİLGİ] Uygulama durduruluyor...
pm2 stop jovial-phenom
if %errorlevel% equ 0 (
    echo ✓ Başarıyla durduruldu
) else (
    echo ✗ Durdurma işlemi başarısız
)
echo.
pm2 status
pause
goto MENU

:START
cls
echo.
echo ========================================
echo  UYGULAMA BAŞLAT
echo ========================================
echo.
echo [BİLGİ] Uygulama başlatılıyor...
pm2 start jovial-phenom
if %errorlevel% equ 0 (
    echo ✓ Başarıyla başlatıldı
) else (
    echo ✗ Başlatma işlemi başarısız
)
echo.
pm2 status
pause
goto MENU

:MONITOR
cls
echo.
echo ========================================
echo  PM2 MONİTÖR
echo ========================================
echo.
echo [BİLGİ] PM2 monitör açılıyor... (q ile çıkış)
pm2 monit
goto MENU

:BUILD
cls
echo.
echo ========================================
echo  BUILD VE DEPLOY
echo ========================================
echo.
echo [BİLGİ] Uygulama build ediliyor...
npm run build
if %errorlevel% equ 0 (
    echo ✓ Build başarılı
    echo [BİLGİ] Uygulama yeniden başlatılıyor...
    pm2 restart jovial-phenom
    echo ✓ Deploy tamamlandı
) else (
    echo ✗ Build başarısız
)
pause
goto MENU

:ENV
cls
echo.
echo ========================================
echo  ENVIRONMENT AYARLARI
echo ========================================
echo.
if exist ".env" (
    echo Mevcut .env dosyası:
    type .env
    echo.
    echo 1. .env dosyasını düzenle
    echo 2. Yeni .env oluştur
    echo 3. Geri dön
    echo.
    set /p envchoice="Seçiminizi yapın: "
    
    if "!envchoice!"=="1" (
        notepad .env
    ) else if "!envchoice!"=="2" (
        echo NODE_ENV=production > .env
        echo PORT=5000 >> .env
        echo VITE_GA_MEASUREMENT_ID=G-38JGPGTZ8C >> .env
        echo ✓ Yeni .env dosyası oluşturuldu
        pause
    )
) else (
    echo .env dosyası bulunamadı
    echo Yeni .env dosyası oluşturuluyor...
    echo NODE_ENV=production > .env
    echo PORT=5000 >> .env
    echo VITE_GA_MEASUREMENT_ID=G-38JGPGTZ8C >> .env
    echo ✓ .env dosyası oluşturuldu
    pause
)
goto MENU

:BACKUP
cls
echo.
echo ========================================
echo  YEDEK ALMA
echo ========================================
echo.
set BACKUP_DIR=backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%
set BACKUP_DIR=%BACKUP_DIR: =0%
echo [BİLGİ] Yedek dizini: %BACKUP_DIR%
echo.
mkdir %BACKUP_DIR% 2>nul
xcopy /E /I /Y . %BACKUP_DIR% /exclude:backup_exclude.txt
echo ✓ Yedek alındı: %BACKUP_DIR%
pause
goto MENU

:EXIT
cls
echo.
echo ========================================
echo  ÇIKIŞ
echo ========================================
echo.
echo Jovial Phenom Yönetim Paneli kapatılıyor...
timeout /t 2 /nobreak >nul
exit