@echo off
echo Auction フロントエンドを起動中...

set API_BASE=http://0.0.0.0:8080
set WS_URL=http://0.0.0.0:8080
set NUXT_HOST=0.0.0.0
set NUXT_PORT=3000

echo 環境変数を設定しました：
echo API_BASE=%API_BASE%
echo WS_URL=%WS_URL%
echo NUXT_HOST=%NUXT_HOST%
echo NUXT_PORT=%NUXT_PORT%
echo.

echo 現在のIPアドレスを確認中...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    echo このPCのIPアドレス: !ip!
)
echo.

echo 既存のnode_modulesを削除しています...
if exist node_modules rmdir /s /q node_modules

echo.
echo 依存関係をインストールしています...
npm install --force

echo.
echo 開発サーバーを起動しています...
echo 外部アクセス用に 0.0.0.0:3000 で起動します...
echo.
echo 起動後、以下のURLでアクセスできます：
echo - このPCから: http://localhost:3000
echo - 他のPCから: http://!ip!:3000
echo.
npm run dev

echo.
echo フロントエンド: http://localhost:3000
echo 外部アクセス: http://!ip!:3000
echo.
pause
