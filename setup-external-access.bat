@echo off
echo ========================================
echo Auction System - 外部アクセス設定
echo ========================================

echo.
echo 1. 現在のネットワーク設定を確認...
ipconfig | findstr "IPv4"

echo.
echo 2. ファイアウォール設定を確認...
netsh advfirewall show allprofiles state

echo.
echo 3. 外部アクセス用のファイアウォールルールを作成...
echo フロントエンドポート (3000) を開放...
netsh advfirewall firewall add rule name="Auction Frontend" dir=in action=allow protocol=TCP localport=3000

echo バックエンドポート (8080) を開放...
netsh advfirewall firewall add rule name="Auction Backend" dir=in action=allow protocol=TCP localport=8080

echo.
echo 4. ネットワーク設定を最適化...
netsh interface set interface "Ethernet" mtu=1500
netsh interface set interface "Wi-Fi" mtu=1500

echo.
echo 5. 外部アクセス設定完了！
echo.
echo 以下のURLでアクセス可能です：
echo - フロントエンド: http://[このPCのIP]:3000
echo - バックエンド: http://[このPCのIP]:8080
echo.
echo Vercelデプロイ済みURL:
echo - https://kensudo.jp
echo - https://auction-swart.vercel.app
echo.
echo 外部PCからアクセスするには、上記のVercel URLを使用してください。

echo.
pause
