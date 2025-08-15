# Vercelデプロイ手順書

## 現在の状況
- ✅ フロントエンドのビルドが完了
- ✅ 静的ファイルが`.vercel/output/static`に生成済み
- ✅ Vercelプロジェクトが設定済み（projectId: prj_VOJr5xED6Lkj3XcSrQfrW3B7MRJ7）
- ❌ Vercel CLIに問題があるため、Webダッシュボードから手動デプロイ

## 手動デプロイ手順

### 1. Vercel Webダッシュボードにアクセス
ブラウザで https://vercel.com を開く

### 2. ログイン
既存のアカウント（kensudogit）でログイン

### 3. プロジェクトを選択
- 「auction」プロジェクトをクリック
- プロジェクトID: `prj_VOJr5xED6Lkj3XcSrQfrW3B7MRJ7`

### 4. デプロイメントを確認
- 「Deployments」タブをクリック
- 最新のデプロイメントの状況を確認

### 5. 新しいデプロイメントを実行
- 「Redeploy」ボタンをクリック
- または「Deploy」ボタンをクリック

### 6. ビルド設定
- **Framework Preset**: Nuxt.js
- **Build Command**: `cd frontend && npm run build:vercel`
- **Output Directory**: `frontend/.vercel/output/static`
- **Install Command**: `npm install`

### 7. 環境変数（必要に応じて）
- `NODE_ENV`: `production`

### 8. デプロイ完了後の確認
デプロイが完了すると、以下のようなURLが表示されます：
```
https://auction-xxxxx.vercel.app
```

## トラブルシューティング

### Vercel CLIの問題
現在、Vercel CLIが正常に動作していません。以下のコマンドで問題を解決できる場合があります：

```bash
# Vercel CLIを再インストール
npm uninstall -g vercel
npm install -g vercel

# プロジェクトを再リンク
vercel link

# デプロイを実行
vercel --prod
```

### ビルドエラーの場合
1. フロントエンドディレクトリでクリーンビルドを実行
   ```bash
   cd frontend
   npm run clean
   npm run build:vercel
   ```

2. 生成されたファイルを確認
   ```bash
   dir .vercel\output\static
   ```

## 外部アクセス確認

デプロイが完了したら、以下の方法で外部アクセスを確認できます：

1. **同じネットワーク内の他のPCから**
   - ブラウザでデプロイされたURLにアクセス

2. **インターネット経由で**
   - モバイルデータを使用してURLにアクセス
   - 別のネットワークからアクセス

3. **接続テスト**
   - 商品一覧が表示されるか確認
   - 入札機能が動作するか確認

## 注意事項

- 現在の実装ではサンプルデータを使用
- 実際のデータベース接続は別途設定が必要
- 認証機能は現在実装されていない
- Vercelの無料プランでも利用可能

## サポート

問題が発生した場合は：
1. Vercelダッシュボードのログを確認
2. ビルドエラーの詳細を確認
3. 必要に応じてVercelサポートに問い合わせ
