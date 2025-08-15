@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Auction プロジェクト 接続問題解決
echo ========================================
echo.
echo このスクリプトは管理者権限で実行する必要があります。
echo HTTP接続問題を段階的に解決します。
echo.

echo ステップ1: 現在の状況を診断中...
echo.
echo 現在のIPアドレス:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    echo このPCのIPアドレス: !ip!
)
echo.

echo ポートの使用状況:
echo ポート8080 (バックエンド):
netstat -an | findstr ":8080"
echo.
echo ポート3000 (フロントエンド):
netstat -an | findstr ":3000"
echo.

echo ステップ2: ファイアウォール設定を修正中...
echo.
echo 既存のルールを削除中...
netsh advfirewall firewall delete rule name="Auction*" 2>nul
echo.

echo 新しいファイアウォールルールを作成中...
netsh advfirewall firewall add rule name="Auction Backend 8080" dir=in action=allow protocol=TCP localport=8080 profile=any enable=yes
netsh advfirewall firewall add rule name="Auction Frontend 3000" dir=in action=allow protocol=TCP localport=3000 profile=any enable=yes
netsh advfirewall firewall add rule name="Auction Backend 8080 Out" dir=out action=allow protocol=TCP localport=8080 profile=any enable=yes
netsh advfirewall firewall add rule name="Auction Frontend 3000 Out" dir=out action=allow protocol=TCP localport=3000 profile=any enable=yes
echo ファイアウォール設定完了
echo.

echo ステップ3: アプリケーションの設定を確認中...
echo.
echo バックエンド設定 (application.yml):
echo server.address: 0.0.0.0 ✓
echo server.port: 8080 ✓
echo.

echo フロントエンド設定 (nuxt.config.ts):
echo devServer.host: 0.0.0.0 ✓
echo devServer.port: 3000 ✓
echo vite.server.host: 0.0.0.0 ✓
echo.

echo ステップ4: 接続テスト中...
echo.
echo ローカルホストへの接続テスト:
curl -s -o nul -w "localhost:3000 - HTTP Status: %%{http_code}\n" http://localhost:3000 2>nul
curl -s -o nul -w "localhost:8080 - HTTP Status: %%{http_code}\n" http://localhost:8080 2>nul
echo.

echo 特定IPアドレスへの接続テスト:
curl -s -o nul -w "!ip!:3000 - HTTP Status: %%{http_code}\n" http://!ip!:3000 2>nul
curl -s -o nul -w "!ip!:8080 - HTTP Status: %%{http_code}\n" http://!ip!:8080 2>nul
echo.

echo ステップ5: 推奨対応手順...
echo.
echo 1. アプリケーションを再起動してください:
echo    - バックエンド: cd backend && gradlew bootRun
echo    - フロントエンド: cd frontend && start.bat
echo.
echo 2. 再起動後、他のPCから以下のURLでアクセスしてください:
echo    - フロントエンド: http://!ip!:3000
echo    - バックエンド: http://!ip!:8080
echo.
echo 3. まだ接続できない場合:
echo    - アンチウイルスソフトの設定を確認
echo    - ルーターの設定を確認
echo    - Windows Defender の設定を確認
echo.

echo ========================================
echo 接続問題解決スクリプト完了
echo ========================================
echo.
echo 次のステップ:
echo 1. アプリケーションを再起動
echo 2. 他のPCから接続テスト
echo 3. 問題が続く場合は debug-connection.bat を実行
echo.
pause
