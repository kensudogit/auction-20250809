@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Auction プロジェクト 接続テスト
echo ========================================
echo.

echo 現在のIPアドレスを取得中...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    echo このPCのIPアドレス: !ip!
)
echo.

echo ポートの使用状況を確認中...
echo.
echo ポート8080 (バックエンド):
netstat -an | findstr ":8080"
echo.
echo ポート3000 (フロントエンド):
netstat -an | findstr ":3000"
echo.

echo ファイアウォールルールの確認中...
echo.
echo バックエンド用ルール:
netsh advfirewall firewall show rule name="Auction Backend Port 8080"
echo.
echo フロントエンド用ルール:
netsh advfirewall firewall show rule name="Auction Frontend Port 3000"
echo.

echo ========================================
echo 接続テストの結果
echo ========================================
echo.
echo 他のPCから以下のURLでアクセスしてください:
echo.
echo フロントエンド: http://!ip!:3000
echo バックエンドAPI: http://!ip!:8080
echo H2コンソール: http://!ip!:8080/h2-console
echo.
echo 接続できない場合:
echo 1. ファイアウォール設定を実行してください (setup-firewall.bat)
echo 2. アプリケーションが起動しているか確認してください (start.bat)
echo 3. 同じネットワーク内にいるか確認してください
echo.
pause
