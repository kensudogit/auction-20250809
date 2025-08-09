#!/bin/bash

echo "オークションシステムを起動しています..."

echo ""
echo "1. MySQLデータベースを確認してください"
echo "   - MySQLサーバーが起動していることを確認"
echo "   - auction_dbデータベースが作成されていることを確認"
echo ""

echo "2. バックエンドを起動しています..."
cd backend
./gradlew bootRun &
BACKEND_PID=$!
cd ..

echo ""
echo "3. フロントエンドを起動しています..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "起動完了！"
echo "バックエンド: http://localhost:8080"
echo "フロントエンド: http://localhost:3000"
echo ""

# プロセス終了時の処理
trap "echo 'システムを停止しています...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

# プロセスが終了するまで待機
wait
