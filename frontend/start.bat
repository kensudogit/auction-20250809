@echo off
echo フロントエンドを起動しています...

echo.
echo 既存のnode_modulesを削除しています...
if exist node_modules rmdir /s /q node_modules

echo.
echo 依存関係をインストールしています...
npm install --force

echo.
echo 開発サーバーを起動しています...
npm run dev

echo.
echo フロントエンド: http://localhost:3000
echo.
pause
