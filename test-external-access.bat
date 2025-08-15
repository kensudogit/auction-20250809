@echo off
echo ========================================
echo Auction System - 外部アクセステスト
echo ========================================

echo.
echo 1. ローカル接続テスト...
echo フロントエンド (ポート3000) をテスト...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:3000

echo.
echo バックエンド (ポート8080) をテスト...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8080

echo.
echo 2. Vercelデプロイメントのテスト...
echo メインURL (kensudo.jp) をテスト...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" https://kensudo.jp

echo.
echo Vercel URL (auction-swart.vercel.app) をテスト...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" https://auction-swart.vercel.app

echo.
echo 3. ネットワーク接続状況を確認...
echo 現在のIPアドレス:
ipconfig | findstr "IPv4"

echo.
echo ポートの使用状況:
netstat -an | findstr ":3000"
netstat -an | findstr ":8080"

echo.
echo 4. ファイアウォールルールを確認...
netsh advfirewall firewall show rule name="Auction Frontend"
netsh advfirewall firewall show rule name="Auction Backend"

echo.
echo 5. 外部アクセステスト完了！
echo.
echo 外部PCからアクセスするには:
echo - Vercel URL: https://kensudo.jp
echo - または: https://auction-swart.vercel.app
echo.
echo ローカルネットワーク内の他のPCからアクセスするには:
echo - フロントエンド: http://[このPCのIP]:3000
echo - バックエンド: http://[このPCのIP]:8080

echo.
pause
