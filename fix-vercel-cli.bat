@echo off
echo ========================================
echo Vercel CLI 問題解決スクリプト
echo ========================================
echo.

echo 1. 現在のVercel CLIをアンインストール中...
call npm uninstall -g vercel

echo.
echo 2. 最新のVercel CLIをインストール中...
call npm install -g vercel@latest

echo.
echo 3. Vercel CLIのバージョンを確認中...
call vercel --version

echo.
echo 4. プロジェクトを再リンク中...
call vercel link

echo.
echo 5. デプロイを試行中...
call vercel --prod

echo.
echo 完了しました！
pause
