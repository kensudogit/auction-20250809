@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Auction プロジェクト ネットワーク設定
echo ========================================
echo.

echo 現在のネットワーク設定を確認中...
echo.

echo 1. 現在のIPアドレス:
ipconfig | findstr /i "IPv4"
echo.

echo 2. 現在のポート使用状況:
netstat -an | findstr ":8080"
netstat -an | findstr ":3000"
echo.

echo 3. ファイアウォールの状態確認:
netsh advfirewall show allprofiles state
echo.

echo 4. ネットワークアダプターの設定確認:
netsh interface ip show config
echo.

echo ========================================
echo ネットワーク設定の確認が完了しました
echo ========================================
echo.
echo 他のPCからアクセスするための手順:
echo 1. このPCのIPアドレスを確認してください
echo 2. 同じネットワーク内の他のPCから以下のURLでアクセス:
echo    - バックエンド: http://[IPアドレス]:8080
echo    - フロントエンド: http://[IPアドレス]:3000
echo.
echo 接続できない場合:
echo 1. ファイアウォール設定を実行してください (setup-firewall.bat)
echo 2. アンチウイルスソフトの設定を確認してください
echo 3. ルーターの設定を確認してください
echo.
pause
