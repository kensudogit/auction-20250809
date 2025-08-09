# オークションシステム

## 概要
リアルタイムオークションシステムです。3x3のグリッドで商品を表示し、リアルタイムで入札とカウントダウンを行います。
会員情報とオークション商品情報のメンテナンス機能も提供しています。

## 機能
- 3行3列のオークション商品陳列
- リアルタイムカウントダウン（1秒毎）
- 入札ボタンクリックによる価格変動
- リアルタイム入札処理
- **会員情報メンテナンス機能**
  - 会員の新規登録・更新・削除
  - 会員ステータス管理（ACTIVE/INACTIVE/SUSPENDED）
  - 会員種別管理（REGULAR/PREMIUM/ADMIN）
  - 会員情報検索（ユーザー名、メールアドレス、氏名）
- **オークション商品情報メンテナンス機能**
  - 商品の新規登録・更新・削除
  - 商品ステータス管理（ACTIVE/ENDED/CANCELLED）
  - 商品価格・終了時間の更新
  - 商品情報検索（商品名、ステータス、価格範囲、終了時間範囲）

## 技術スタック
- **バックエンド**: Java + Spring Boot + Gradle
- **フロントエンド**: React + Nuxt.js + TypeScript
- **データベース**: MySQL
- **リアルタイム通信**: WebSocket
- **データベースアクセス**: 
  - JPA/Hibernate（従来の実装）
  - **Doma2**（新規導入 - 型安全なSQLクエリ）

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

## API エンドポイント

### 会員情報管理（JPA版）
- `GET /api/members` - 全会員情報取得
- `GET /api/members/{id}` - 会員IDで会員情報取得
- `GET /api/members/username/{username}` - ユーザー名で会員情報取得
- `GET /api/members/email/{email}` - メールアドレスで会員情報取得
- `GET /api/members/search?fullName={name}` - 氏名で会員情報検索
- `GET /api/members/status/{status}` - ステータスで会員情報検索
- `GET /api/members/type/{memberType}` - 会員種別で会員情報検索
- `POST /api/members` - 会員情報新規登録
- `PUT /api/members/{id}` - 会員情報更新
- `DELETE /api/members/{id}` - 会員情報削除
- `PATCH /api/members/{id}/status?status={status}` - 会員ステータス変更

### 会員情報管理（Doma2版）
- `GET /api/doma2/members` - 全会員情報取得
- `GET /api/doma2/members/{id}` - 会員IDで会員情報取得
- `GET /api/doma2/members/username/{username}` - ユーザー名で会員情報取得
- `GET /api/doma2/members/email/{email}` - メールアドレスで会員情報取得
- `GET /api/doma2/members/search?fullName={name}` - 氏名で会員情報検索
- `GET /api/doma2/members/status/{status}` - ステータスで会員情報検索
- `GET /api/doma2/members/type/{memberType}` - 会員種別で会員情報検索
- `POST /api/doma2/members` - 会員情報新規登録
- `PUT /api/doma2/members/{id}` - 会員情報更新
- `DELETE /api/doma2/members/{id}` - 会員情報削除
- `PATCH /api/doma2/members/{id}/status?status={status}` - 会員ステータス変更

### 商品情報管理（JPA版）
- `GET /api/admin/products` - 全商品情報取得
- `GET /api/admin/products/{id}` - 商品IDで商品情報取得
- `GET /api/admin/products/search?name={name}` - 商品名で商品情報検索
- `GET /api/admin/products/status/{status}` - ステータスで商品情報検索
- `GET /api/admin/products/price-range?minPrice={min}&maxPrice={max}` - 価格範囲で商品情報検索
- `GET /api/admin/products/end-time-range?startTime={start}&endTime={end}` - 終了時間範囲で商品情報検索
- `POST /api/admin/products` - 商品情報新規登録
- `PUT /api/admin/products/{id}` - 商品情報更新
- `DELETE /api/admin/products/{id}` - 商品情報削除
- `PATCH /api/admin/products/{id}/status?status={status}` - 商品ステータス変更
- `PATCH /api/admin/products/{id}/price?currentPrice={price}` - 商品価格更新
- `PATCH /api/admin/products/{id}/end-time?endTime={time}` - 商品終了時間更新

### 商品情報管理（Doma2版）
- `GET /api/doma2/products` - 全商品情報取得
- `GET /api/doma2/products/{id}` - 商品IDで商品情報取得
- `GET /api/doma2/products/search?name={name}` - 商品名で商品情報検索
- `GET /api/doma2/products/status/{status}` - ステータスで商品情報検索
- `GET /api/doma2/products/price-range?minPrice={min}&maxPrice={max}` - 価格範囲で商品情報検索
- `GET /api/doma2/products/end-time-range?startTime={start}&endTime={end}` - 終了時間範囲で商品情報検索
- `GET /api/doma2/products/active` - アクティブな商品情報取得
- `GET /api/doma2/products/ended` - 終了した商品情報取得
- `POST /api/doma2/products` - 商品情報新規登録
- `PUT /api/doma2/products/{id}` - 商品情報更新
- `DELETE /api/doma2/products/{id}` - 商品情報削除
- `PATCH /api/doma2/products/{id}/status?status={status}` - 商品ステータス変更
- `PATCH /api/doma2/products/{id}/price?currentPrice={price}` - 商品価格更新
- `PATCH /api/doma2/products/{id}/end-time?endTime={time}` - 商品終了時間更新

## Doma2について
Doma2は型安全なSQLクエリを提供するJavaのデータベースアクセスフレームワークです。
- コンパイル時のSQL検証
- 型安全なクエリパラメータ
- 不変エンティティによる安全性
- アノテーションプロセッサーによる自動コード生成

## 注意事項
- フロントエンドの依存関係で警告が表示される場合がありますが、`--force`オプションで正常に動作します
- 初回起動時はサンプルデータが自動的に作成されます
- WebSocket接続が確立されると、リアルタイムで価格とカウントダウンが更新されます
- Doma2のアノテーションプロセッサーが正常に動作するため、IDEの設定でアノテーション処理を有効にしてください
