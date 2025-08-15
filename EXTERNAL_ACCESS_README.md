# 外部アクセス設定ガイド

## 概要
このドキュメントは、auctionシステムを外部PCからアクセス可能にするための設定手順を説明します。

## デプロイ済みURL

### 本番環境
- **最新URL**: https://auction-7fk8uv2j9-kensudogits-projects.vercel.app
- **メインURL**: https://kensudo.jp
- **プロジェクトURL**: https://auction-kensudogits-projects.vercel.app

### プレビュー環境
- **プレビューURL**: 現在利用不可（最新デプロイメントが本番環境として動作）

## 外部アクセス設定

### 1. ネットワーク設定
外部PCからアクセスするために、以下の設定が必要です：

#### Windowsファイアウォール設定
```batch
# 管理者権限で実行
netsh advfirewall firewall add rule name="Auction App Port 3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="Auction App Port 8080" dir=in action=allow protocol=TCP localport=8080
```

#### ポート開放確認
```batch
netstat -an | findstr :3000
netstat -an | findstr :8080
```

### 2. 外部PCからのアクセステスト
外部PCから以下のURLにアクセスしてテスト：
```
https://auction-7fk8uv2j9-kensudogits-projects.vercel.app
https://kensudo.jp
```

### 3. 接続確認コマンド
```batch
# ローカル接続テスト
curl http://localhost:3000
curl http://localhost:8080

# Vercel接続テスト
curl https://auction-7fk8uv2j9-kensudogits-projects.vercel.app
curl https://kensudo.jp
```

## トラブルシューティング

### よくある問題
1. **404エラー**: 古いデプロイメントURLにアクセスしている可能性
2. **接続拒否**: ファイアウォール設定の確認
3. **SSL証明書エラー**: ブラウザの証明書設定確認

### 解決方法
1. 最新のデプロイメントURLを使用
2. ファイアウォール設定の確認
3. ブラウザのキャッシュクリア
4. 管理者権限での実行確認

## 注意事項
- 本番環境では常に最新のデプロイメントURLを使用してください
- 古いデプロイメントは自動的に削除されます
- セキュリティのため、必要最小限のポートのみを開放してください
