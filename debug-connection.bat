@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Auction プロジェクト 接続問題診断
echo ========================================
echo.

echo 1. 現在のIPアドレス確認:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    echo このPCのIPアドレス: !ip!
)
echo.

echo 2. ポートの使用状況確認:
echo ポート8080 (バックエンド):
netstat -an | findstr ":8080"
echo.
echo ポート3000 (フロントエンド):
netstat -an | findstr ":3000"
echo.

echo 3. ファイアウォールルールの詳細確認:
echo.
echo バックエンド用ルール:
netsh advfirewall firewall show rule name="Auction Backend Port 8080" verbose
echo.
echo フロントエンド用ルール:
netsh advfirewall firewall show rule name="Auction Frontend Port 3000" verbose
echo.

echo 4. ファイアウォールの全体的な状態:
netsh advfirewall show allprofiles state
echo.

echo 5. アプリケーションのプロセス確認:
echo Javaプロセス:
tasklist | findstr java
echo.
echo Nodeプロセス:
tasklist | findstr node
echo.

echo 6. ローカルでの接続テスト:
echo ローカルホストへの接続テスト:
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:3000 2>nul
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8080 2>nul
echo.

echo 7. 特定IPアドレスでの接続テスト:
echo 172.19.64.1:3000 への接続テスト:
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://172.19.64.1:3000 2>nul
echo.

echo ========================================
echo 診断結果と推奨対応
echo ========================================
echo.
echo 問題の可能性:
echo 1. ファイアウォールルールが正しく作成されていない
echo 2. アプリケーションが特定のIPアドレスにバインドされていない
echo 3. アンチウイルスソフトの干渉
echo 4. アプリケーションの設定問題
echo.
echo 推奨対応手順:
echo 1. setup-firewall.bat を管理者権限で実行
echo 2. アプリケーションを再起動
echo 3. アンチウイルスソフトの設定確認
echo.
pause
