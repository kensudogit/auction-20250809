# Vercel Auction System Setup

## 概要
このドキュメントは、Auction SystemをVercelにデプロイするための設定手順を説明します。

## 前提条件
- Node.js 18+ がインストールされている
- Vercel CLI がインストールされている
- Vercelアカウントがある

## インストール手順

### 1. Vercel CLIのインストール
```bash
npm install -g vercel
```

### 2. 依存関係のインストール
```bash
cd frontend
npm install
```

### 3. 環境変数の設定
Vercelダッシュボードで以下の環境変数を設定してください：

- `API_BASE`: バックエンドAPIのURL (例: https://your-backend-domain.com)
- `WS_URL`: WebSocket接続のURL (例: wss://your-backend-domain.com)
- `NODE_ENV`: production

### 4. デプロイ
```bash
# プロジェクトルートで実行
vercel --prod
```

または、提供されているバッチファイルを使用：
```bash
deploy-vercel.bat
```

## 設定ファイル

### vercel.json
Vercelの設定ファイルで、以下を定義しています：
- ビルド設定
- ルーティング設定
- 環境変数
- 関数設定

### nuxt.config.ts
Nuxt.jsの設定ファイルで、以下を設定しています：
- SSR設定
- 静的サイト生成
- 環境変数の読み込み
- ビルド設定

## トラブルシューティング

### ビルドエラー
1. 依存関係が正しくインストールされているか確認
2. Node.jsのバージョンが18+であることを確認
3. 環境変数が正しく設定されているか確認

### デプロイエラー
1. Vercel CLIが最新版であることを確認
2. プロジェクトが正しくリンクされているか確認
3. ビルドログでエラーの詳細を確認

### API接続エラー
1. バックエンドサーバーが起動しているか確認
2. 環境変数`API_BASE`が正しく設定されているか確認
3. CORS設定が正しく行われているか確認

## 本番環境での注意点

1. **HTTPS**: Vercelは自動的にHTTPSを提供します
2. **環境変数**: 本番環境用の環境変数を必ず設定してください
3. **バックエンド**: バックエンドサーバーも本番環境で利用可能である必要があります
4. **WebSocket**: 本番環境ではWSS（WebSocket Secure）を使用してください

## サポート
問題が発生した場合は、以下を確認してください：
1. Vercelダッシュボードのログ
2. ビルドログ
3. ブラウザの開発者ツールのコンソール
