#!/bin/bash
echo "Auction フロントエンドを起動中..."

export API_BASE=http://0.0.0.0:8080
export WS_URL=http://0.0.0.0:8080
export NUXT_HOST=0.0.0.0
export NUXT_PORT=3000

echo "環境変数を設定しました："
echo "API_BASE=$API_BASE"
echo "WS_URL=$WS_URL"
echo "NUXT_HOST=$NUXT_HOST"
echo "NUXT_PORT=$NUXT_PORT"
echo

npm run dev
