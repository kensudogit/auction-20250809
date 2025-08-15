#!/bin/bash
echo "Auction プロジェクトを起動中..."
echo

echo "1. ファイアウォール設定を確認中..."
echo "注意: 管理者権限が必要な場合があります"
echo

echo "2. バックエンドを起動中..."
cd backend
./gradlew bootRun &
BACKEND_PID=$!
cd ..

echo "3. フロントエンドを起動中..."
sleep 10
cd frontend
./start.sh &
FRONTEND_PID=$!
cd ..

echo
echo "プロジェクトの起動が完了しました！"
echo
echo "アクセス方法:"
echo "- このPCから: http://localhost:3000"
echo "- 他のPCから: http://[このPCのIPアドレス]:3000"
echo
echo "IPアドレスの確認: ifconfig または ip addr"
echo
echo "プロセスを停止するには: kill $BACKEND_PID $FRONTEND_PID"
echo
wait
