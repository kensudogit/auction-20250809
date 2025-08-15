@echo off
echo ========================================
echo オークションシステム - 手動デプロイ手順
echo ========================================
echo.

echo 1. フロントエンドのビルドを実行中...
cd frontend
call npm run build:vercel
if errorlevel 1 (
    echo ビルドに失敗しました。
    pause
    exit /b 1
)

echo.
echo 2. ビルドが完了しました！
echo.
echo 3. 以下の手順でVercelにデプロイしてください：
echo.
echo    a) https://vercel.com にアクセス
echo    b) ログインして「auction」プロジェクトを選択
echo    c) 「Deployments」タブをクリック
echo    d) 「Redeploy」ボタンをクリック
echo.
echo 4. または、以下のコマンドでCLIからデプロイを試してください：
echo    vercel --prod --yes
echo.
echo 5. デプロイが完了すると、以下のようなURLが表示されます：
echo    https://auction-xxxxx.vercel.app
echo.
echo このURLに他のPCからアクセスすることで、オークションシステムを使用できます。
echo.
pause
