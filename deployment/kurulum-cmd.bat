@echo off
chcp 65001 >nul
title Jovial Phenom - Sistem Kurulumu
color 0C

echo.
echo ========================================
echo  Jovial Phenom - Sistem Kurulumu
echo ========================================
echo.
echo Bu script Windows'ta gerekli bileşenleri kurar:
echo - Node.js
echo - Git
echo - PM2
echo - Chocolatey (paket yöneticisi)
echo.

REM Administrator kontrolü
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Bu script administrator yetkileri gerektirir
    echo Lütfen CMD'yi "Yönetici olarak çalıştır" ile açın
    pause
    exit /b 1
)

echo [BİLGİ] Administrator yetkileriyle çalışıyor
echo.

REM Chocolatey yükleme
echo ========================================
echo  CHOCOLATEY KURULUMU
echo ========================================
where choco >nul 2>&1
if %errorlevel% neq 0 (
    echo [BİLGİ] Chocolatey kuruluyor...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    
    REM PATH'i yenile
    call refreshenv
    
    where choco >nul 2>&1
    if %errorlevel% neq 0 (
        echo [HATA] Chocolatey kurulumu başarısız
        pause
        exit /b 1
    ) else (
        echo [BİLGİ] Chocolatey başarıyla kuruldu
    )
) else (
    echo [BİLGİ] Chocolatey zaten yüklü
)

echo.
echo ========================================
echo  NODE.JS KURULUMU
echo ========================================
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [BİLGİ] Node.js kuruluyor...
    choco install nodejs -y
    call refreshenv
    
    node --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo [HATA] Node.js kurulumu başarısız
        pause
        exit /b 1
    ) else (
        echo [BİLGİ] Node.js başarıyla kuruldu
        node --version
    )
) else (
    echo [BİLGİ] Node.js zaten yüklü
    node --version
)

echo.
echo ========================================
echo  GIT KURULUMU
echo ========================================
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [BİLGİ] Git kuruluyor...
    choco install git -y
    call refreshenv
    
    git --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo [UYARI] Git kurulumu başarısız (opsiyonel)
    ) else (
        echo [BİLGİ] Git başarıyla kuruldu
        git --version
    )
) else (
    echo [BİLGİ] Git zaten yüklü
    git --version
)

echo.
echo ========================================
echo  PM2 KURULUMU
echo ========================================
pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [BİLGİ] PM2 kuruluyor...
    npm install -g pm2
    
    pm2 --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo [HATA] PM2 kurulumu başarısız
        pause
        exit /b 1
    ) else (
        echo [BİLGİ] PM2 başarıyla kuruldu
        pm2 --version
    )
) else (
    echo [BİLGİ] PM2 zaten yüklü
    pm2 --version
)

echo.
echo ========================================
echo  PM2 WINDOWS SERVICE
echo ========================================
set /p INSTALL_SERVICE="PM2'yi Windows service olarak kurmak ister misiniz? (y/n): "
if /i "%INSTALL_SERVICE%"=="y" (
    echo [BİLGİ] PM2 Windows service kuruluyor...
    npm install -g pm2-windows-startup
    pm2-startup install
    echo [BİLGİ] PM2 artık Windows ile birlikte başlayacak
)

echo.
echo ========================================
echo  GÜVENLİK DUVARI AYARLARI
echo ========================================
set /p SETUP_FIREWALL="Windows Güvenlik Duvarı kuralları eklensin mi? (y/n): "
if /i "%SETUP_FIREWALL%"=="y" (
    echo [BİLGİ] Güvenlik duvarı kuralları ekleniyor...
    netsh advfirewall firewall add rule name="Jovial Phenom HTTP" dir=in action=allow protocol=TCP localport=80
    netsh advfirewall firewall add rule name="Jovial Phenom HTTPS" dir=in action=allow protocol=TCP localport=443
    netsh advfirewall firewall add rule name="Jovial Phenom Dev" dir=in action=allow protocol=TCP localport=5000
    echo [BİLGİ] Güvenlik duvarı kuralları eklendi
)

echo.
echo ========================================
echo  KURULUM TAMAMLANDI!
echo ========================================
echo.
echo ✓ Chocolatey kuruldu
echo ✓ Node.js kuruldu
echo ✓ Git kuruldu (opsiyonel)
echo ✓ PM2 kuruldu
echo ✓ Windows service yapılandırıldı
echo ✓ Güvenlik duvarı ayarlandı
echo.
echo SONRAKI ADIMLAR:
echo 1. Proje dosyalarını indirin/kopyalayın
echo 2. Proje dizininde deploy-cmd.bat çalıştırın
echo 3. Web sunucusu (IIS) kurulumu yapın
echo 4. SSL sertifikası ekleyin
echo.
echo YÖNETİM KOMUTLARI:
echo   manage-cmd.bat       - Yönetim paneli
echo   deploy-cmd.bat       - Deployment
echo.
echo Detaylı bilgi: deployment\README-Windows.md
echo.
pause