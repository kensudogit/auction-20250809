@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Auction プロジェクト 起動スクリプト
echo ========================================
echo.

echo 1. ネットワーク設定を確認中...
echo.

echo 現在のIPアドレス:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    echo このPCのIPアドレス: !ip!
)
echo.

echo 2. ファイアウォール設定を確認中...
echo 注意: 管理者権限が必要な場合があります
echo ファイアウォール設定が未実行の場合は setup-firewall.bat を実行してください
echo.

echo 3. バックエンドを起動中...
echo ポート8080で起動します...
start "Auction Backend" cmd /k "cd backend && gradlew bootRun"

echo 4. フロントエンドを起動中...
echo バックエンドの起動を待機中... (10秒)
timeout /t 10 /nobreak >nul
echo ポート3000で起動します...
start "Auction Frontend" cmd /k "cd frontend && start.bat"

echo.
echo ========================================
echo プロジェクトの起動が完了しました！
echo ========================================
echo.
echo アクセス方法:
echo.
echo このPCから:
echo - フロントエンド: http://localhost:3000
echo - バックエンドAPI: http://localhost:8080
echo - H2コンソール: http://localhost:8080/h2-console
echo.
echo 他のPCから:
echo - フロントエンド: http://!ip!:3000
echo - バックエンドAPI: http://!ip!:8080
echo - H2コンソール: http://!ip!:8080/h2-console
echo.
echo 注意事項:
echo - 同じネットワーク内の他のPCからアクセスできます
echo - ファイアウォール設定が正しく実行されていることを確認してください
echo - アンチウイルスソフトの設定も確認してください
echo.
echo ネットワーク設定の確認: network-setup.bat
echo ファイアウォール設定: setup-firewall.bat
echo.
pause
