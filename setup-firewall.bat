@echo off
echo Auction プロジェクト用のファイアウォール設定を開始します...

echo 既存のルールを削除中...
netsh advfirewall firewall delete rule name="Auction Backend Port 8080" 2>nul
netsh advfirewall firewall delete rule name="Auction Frontend Port 3000" 2>nul

echo バックエンド用ポート8080を開放中...
netsh advfirewall firewall add rule name="Auction Backend Port 8080" dir=in action=allow protocol=TCP localport=8080 profile=any
netsh advfirewall firewall add rule name="Auction Backend Port 8080 Out" dir=out action=allow protocol=TCP localport=8080 profile=any

echo フロントエンド用ポート3000を開放中...
netsh advfirewall firewall add rule name="Auction Frontend Port 3000" dir=in action=allow protocol=TCP localport=3000 profile=any
netsh advfirewall firewall add rule name="Auction Frontend Port 3000 Out" dir=out action=allow protocol=TCP localport=3000 profile=any

echo H2コンソール用ポート8080のWebアクセスを許可中...
netsh advfirewall firewall add rule name="Auction H2 Console" dir=in action=allow protocol=TCP localport=8080 profile=any

echo ファイアウォール設定が完了しました。
echo.
echo 以下のポートが開放されました：
echo - バックエンド: 8080 (TCP)
echo - フロントエンド: 3000 (TCP)
echo.
echo 現在のIPアドレスを確認中...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    echo このPCのIPアドレス: !ip!
)
echo.
echo 他のPCから以下のURLでアクセスできます：
echo - バックエンドAPI: http://[このPCのIPアドレス]:8080
echo - フロントエンド: http://[このPCのIPアドレス]:3000
echo - H2コンソール: http://[このPCのIPアドレス]:8080/h2-console
echo.
echo 注意: 同じネットワーク内の他のPCからアクセスするには、
echo このPCのIPアドレスを使用してください。
echo.
pause
