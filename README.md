# オークションシステム

## 概要
リアルタイムオークションシステムです。3x3のグリッドで商品を表示し、リアルタイムで入札とカウントダウンを行います。

## 機能
- 3行3列のオークション商品陳列
- リアルタイムカウントダウン（1秒毎）
- 入札ボタンクリックによる価格変動
- リアルタイム入札処理

## 技術スタック
- **バックエンド**: Java + Spring Boot + Gradle
- **フロントエンド**: React + Nuxt.js + TypeScript
- **データベース**: MySQL
- **リアルタイム通信**: WebSocket

## セットアップ

### 1. データベース準備
MySQLサーバーを起動し、以下のコマンドでデータベースを作成してください：

```sql
CREATE DATABASE auction_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. バックエンド起動
```bash
cd auction/backend
./gradlew bootRun
```

### 3. フロントエンド起動
```bash
cd auction/frontend
npm install --force
npm run dev
```

### 4. 簡単起動（Windows）
```bash
# バックエンド
cd auction/backend
start.bat

# フロントエンド
cd auction/frontend
start.bat
```

### 5. 簡単起動（Linux/Mac）
```bash
# バックエンド
cd auction/backend
./start.sh

# フロントエンド
cd auction/frontend
./start.sh
```

## アクセス
- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:8080
- データベース: localhost:3306

## 注意事項
- フロントエンドの依存関係で警告が表示される場合がありますが、`--force`オプションで正常に動作します
- 初回起動時はサンプルデータが自動的に作成されます
- WebSocket接続が確立されると、リアルタイムで価格とカウントダウンが更新されます
