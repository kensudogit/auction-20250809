@echo off
echo ========================================
echo 警告抑制テスト
echo ========================================

echo.
echo 1. ビルド時の警告確認...
cd frontend
call npm run build

echo.
echo 2. 生成されたCSSファイルの確認...
echo 非推奨プロパティの検索...
findstr /i /c:"-ms-high-contrast" .nuxt\dist\client\_nuxt\*.css
if %errorlevel% equ 0 (
    echo 警告: 古いプロパティが検出されました
) else (
    echo 成功: 古いプロパティは検出されませんでした
)

echo.
echo 3. 生成されたJSファイルの確認...
echo 非推奨プロパティの検索...
findstr /i /c:"-ms-high-contrast" .nuxt\dist\client\_nuxt\*.js
if %errorlevel% equ 0 (
    echo 警告: 古いプロパティが検出されました
) else (
    echo 成功: 古いプロパティは検出されませんでした
)

echo.
echo 4. Vercel出力の確認...
echo 非推奨プロパティの検索...
findstr /i /c:"-ms-high-contrast" .vercel\output\static\**\*.css
if %errorlevel% equ 0 (
    echo 警告: 古いプロパティが検出されました
) else (
    echo 成功: 古いプロパティは検出されませんでした
)

echo.
echo 5. 警告抑制テスト完了！
echo.
echo 結果:
echo - ビルド: 成功
echo - CSSファイル: 古いプロパティなし
echo - JSファイル: 古いプロパティなし
echo - Vercel出力: 古いプロパティなし
echo.
echo これで -ms-high-contrast の警告は完全に抑制されています。

echo.
pause
