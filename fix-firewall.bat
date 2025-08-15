@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Auction プロジェクト ファイアウォール修正
echo ========================================
echo.
echo このスクリプトは管理者権限で実行する必要があります。
echo 現在のファイアウォール設定を確認し、必要に応じて修正します。
echo.

echo 1. 既存のルールを削除中...
netsh advfirewall firewall delete rule name="Auction Backend Port 8080" 2>nul
netsh advfirewall firewall delete rule name="Auction Frontend Port 3000" 2>nul
netsh advfirewall firewall delete rule name="Auction Backend Port 8080 Out" 2>nul
netsh advfirewall firewall delete rule name="Auction Frontend Port 3000 Out" 2>nul
netsh advfirewall firewall delete rule name="Auction H2 Console" 2>nul
echo 既存ルールの削除完了
echo.

echo 2. 新しいファイアウォールルールを作成中...
echo.

echo バックエンド用ポート8080 (TCP) - 受信:
netsh advfirewall firewall add rule name="Auction Backend Port 8080 TCP In" dir=in action=allow protocol=TCP localport=8080 profile=any enable=yes
echo.

echo バックエンド用ポート8080 (TCP) - 送信:
netsh advfirewall firewall add rule name="Auction Backend Port 8080 TCP Out" dir=out action=allow protocol=TCP localport=8080 profile=any enable=yes
echo.

echo フロントエンド用ポート3000 (TCP) - 受信:
netsh advfirewall firewall add rule name="Auction Frontend Port 3000 TCP In" dir=in action=allow protocol=TCP localport=3000 profile=any enable=yes
echo.

echo フロントエンド用ポート3000 (TCP) - 送信:
netsh advfirewall firewall add rule name="Auction Frontend Port 3000 TCP Out" dir=out action=allow protocol=TCP localport=3000 profile=any enable=yes
echo.

echo 3. 追加のセキュリティルールを作成中...
echo.

echo HTTP接続用ルール (ポート80):
netsh advfirewall firewall add rule name="Auction HTTP Port 80" dir=in action=allow protocol=TCP localport=80 profile=any enable=yes
echo.

echo HTTPS接続用ルール (ポート443):
netsh advfirewall firewall add rule name="Auction HTTPS Port 443" dir=in action=allow protocol=TCP localport=443 profile=any enable=yes
echo.

echo 4. ファイアウォールルールの確認中...
echo.
echo 作成されたルール一覧:
netsh advfirewall firewall show rule name="Auction*" | findstr "Rule Name:"
echo.

echo 5. ファイアウォールの状態確認:
netsh advfirewall show allprofiles state
echo.

echo ========================================
echo ファイアウォール修正完了
echo ========================================
echo.
echo 作成されたルール:
echo - Auction Backend Port 8080 TCP In/Out
echo - Auction Frontend Port 3000 TCP In/Out
echo - Auction HTTP Port 80
echo - Auction HTTPS Port 443
echo.
echo 次のステップ:
echo 1. アプリケーションを再起動してください
echo 2. 他のPCから接続をテストしてください
echo 3. まだ接続できない場合は debug-connection.bat を実行してください
echo.
pause
