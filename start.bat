@echo off
echo オークションシステムを起動しています...

echo.
echo 1. MySQLデータベースを確認してください
echo    - MySQLサーバーが起動していることを確認
echo    - auction_dbデータベースが作成されていることを確認
echo.

echo 2. バックエンドを起動しています...
cd backend
start "Auction Backend" cmd /k "gradlew bootRun"
cd ..

echo.
echo 3. フロントエンドを起動しています...
cd frontend
start "Auction Frontend" cmd /k "npm install && npm run dev"
cd ..

echo.
echo 起動完了！
echo バックエンド: http://localhost:8080
echo フロントエンド: http://localhost:3000
echo.
pause
