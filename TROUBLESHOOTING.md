# トラブルシューティングガイド

## 🚨 発生しているエラーと解決方法

### **1. **Nuxt.js ビルドエラー (新規追加)**

#### エラー内容
```
[error] [nuxi] Nuxt Build Error: [commonjs--resolver] [plugin nuxt:import-protection] 
This module cannot be imported in the Vue part of your app. [importing `@nuxt/kit` from `node_modules/nuxt/dist/index.mjs`]
```

#### 原因
- Nuxt.jsの内部モジュール（`@nuxt/kit`）がクライアントサイドでインポートされている
- 設定ファイルでサーバーサイド専用のコードがクライアントに含まれている
- 依存関係のバージョンの互換性問題

#### 解決方法

##### 方法1: 自動修正スクリプトの実行
```bash
# Windows
fix-build-errors.bat

# Linux/Mac
./fix-build-errors.sh
```

##### 方法2: 手動での修正
```bash
cd frontend

# 完全クリーンアップ
rm -rf .nuxt .output node_modules package-lock.json .vercel

# npmキャッシュのクリア
npm cache clean --force

# 依存関係の再インストール
npm install

# ビルドの実行
npm run build
```

##### 方法3: Node.jsバージョンの確認
```bash
# Node.jsバージョンの確認
node --version  # 18.0.0以上が必要

# npmバージョンの確認
npm --version   # 8.0.0以上が必要
```

#### 設定ファイルの確認
- `nuxt.config.ts` - クライアントサイドのビルド設定
- `package.json` - 依存関係のバージョン
- `vercel.json` - Vercelデプロイメント設定

---

### **2. **nitropack インポートエラー (新規追加)**

#### エラー内容
```
ERROR  Nuxt Build Error: [commonjs--resolver] [plugin nuxt:import-protection] 
This module cannot be imported in the Vue part of your app. [importing nitropack from node_modules/nuxt/dist/index.mjs]
```

#### 原因
- `nitropack`モジュールがクライアントサイドでインポートされている
- サーバーサイドレンダリング（SSR）の設定が適切でない
- Viteのビルド設定でサーバーサイドモジュールが除外されていない

#### 解決方法

##### 方法1: 静的サイト生成の使用（推奨）
```bash
# Windows
build-static.bat

# または手動で実行
cd frontend
npm run build:static
```

##### 方法2: 設定ファイルの切り替え
```bash
# 静的サイト生成用の設定を使用
cp nuxt.config.static.ts nuxt.config.ts

# ビルドの実行
npm run build
```

##### 方法3: 手動での設定修正
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // 静的サイト生成設定
  ssr: false,
  target: 'static',
  
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/']
    }
  },
  
  vite: {
    build: {
      rollupOptions: {
        external: ['@nuxt/kit', 'nitropack', 'h3', 'unjs', 'node:fs', 'node:path']
      }
    }
  }
})
```

#### 静的サイト生成の利点
- サーバーサイドの依存関係が不要
- ビルドエラーの回避
- Vercelでの高速デプロイ
- より簡単なメンテナンス

---

### 3. **404 エラー (Vercelデプロイメント問題)**

#### エラー内容
```
GET https://auction-4g7ddiqyb-kensudogits-projects.vercel.app/ 404 (Not Found)
```

#### 原因
- Vercelの設定が古いNuxt.jsの出力パスを参照している
- ビルド出力ディレクトリが正しく設定されていない

#### 解決方法

##### ステップ1: ビルドの実行
```bash
cd frontend
npm run clean
npm install
npm run build
```

##### ステップ2: ビルド出力の確認
```bash
# 以下のディレクトリが存在することを確認
ls -la .output/public/
```

##### ステップ3: Vercelへの再デプロイ
```bash
cd ..
vercel --prod
```

#### 設定ファイルの確認
- `vercel.json` - 正しい出力パスを指定
- `nuxt.config.ts` - ビルド設定の最適化

---

### 4. **Edge Copilot拡張機能のエラー**

#### エラー内容
```
Unchecked runtime.lastError: The message port closed before a response was received.
```

#### 原因
- Microsoft EdgeのCopilot拡張機能との互換性問題
- 拡張機能の内部エラー

#### 解決方法

##### 方法1: 拡張機能の無効化
1. Edgeで `edge://extensions/` を開く
2. Copilot拡張機能を一時的に無効化
3. ページをリロードしてエラーが消えるか確認

##### 方法2: 拡張機能の更新
1. 拡張機能の更新を確認
2. 最新バージョンに更新

##### 方法3: ブラウザの変更
- Chrome、Firefox、Safariなどの他のブラウザでテスト

---

### 5. **JSONパースエラー**

#### エラー内容
```
Uncaught (in promise) SyntaxError: "[object Object]" is not valid JSON
    at JSON.parse (<anonymous>)
    at l._storageChangeDispatcher (content.js:2:898238)
```

#### 原因
- ブラウザ拡張機能が不正なJSONデータを処理しようとしている
- ストレージの変更イベントでデータ形式が正しくない

#### 解決方法

##### 方法1: 拡張機能の特定
1. 開発者ツールでエラーの詳細を確認
2. どの拡張機能が原因かを特定
3. 該当拡張機能を一時的に無効化

##### 方法2: ブラウザのクリーンアップ
1. ブラウザのキャッシュとクッキーをクリア
2. 拡張機能を一度すべて無効化してテスト
3. 必要に応じて拡張機能を一つずつ有効化

---

### 6. **-ms-high-contrast の非推奨警告**

#### エラー内容
```
[Deprecation] -ms-high-contrast is in the process of being deprecated.
```

#### 解決済み ✅
- プロジェクト内での使用は完全に排除
- 新しい `forced-colors` 標準を実装
- アクセシビリティCSSファイルを追加

---

## 🛠️ 包括的な解決手順

### **ステップ1: 環境のクリーンアップ**

#### **Windows環境での実行**
```cmd
# 修正されたバッチファイルの実行
fix-build-errors.bat

# または PowerShell スクリプトの実行
powershell -ExecutionPolicy Bypass -File fix-build-errors.ps1
```

#### **Linux/Mac環境での実行**
```bash
# フロントエンドディレクトリに移動
cd frontend

# 既存のビルドファイルを削除
npm run clean

# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install
```

### **ステップ2: ビルドの実行**
```bash
# 本番用ビルド
npm run build

# ビルド出力の確認
ls -la .output/public/
```

### **ステップ3: ローカルテスト**
```bash
# ローカルで動作確認
npm run start
```

### **ステップ4: Vercelへのデプロイ**
```bash
# プロジェクトルートに戻る
cd ..

# Vercelにデプロイ
vercel --prod
```

---

## 🔧 Windows環境での特別な注意点

### **1. コマンドの違い**
- **Unix/Linux**: `rm -rf` を使用
- **Windows**: `rmdir /s /q` を使用

### **2. スクリプトの選択**
- **バッチファイル**: `fix-build-errors.bat` (基本的な修正)
- **PowerShell**: `fix-build-errors.ps1` (より確実な修正)

### **3. 実行権限の問題**
```cmd
# PowerShell の実行ポリシーを確認
powershell Get-ExecutionPolicy

# 必要に応じて変更
powershell Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **4. パスの問題**
- Windowsでは長いパス名が問題になることがある
- 必要に応じて短いパス名を使用

---

## 🔍 デバッグ方法

### **1. ブラウザ開発者ツール**
- Console タブでエラーの詳細を確認
- Network タブでリクエスト/レスポンスを確認
- Sources タブでブレークポイントを設定

### **2. Vercelログの確認**
```bash
# デプロイメントログの確認
vercel logs

# 特定のデプロイメントのログ
vercel logs [deployment-url]
```

### **3. ローカル環境でのテスト**
```bash
# 開発サーバーの起動
npm run dev

# 本番ビルドのテスト
npm run build && npm run start
```

---

## 📋 チェックリスト

### **ビルド前**
- [ ] `node_modules` が最新
- [ ] 古いビルドファイルが削除されている
- [ ] 環境変数が正しく設定されている

### **ビルド中**
- [ ] エラーが発生していない
- [ ] `.output/public/` ディレクトリが作成されている
- [ ] 静的ファイルが正しく生成されている

### **デプロイ後**
- [ ] Vercelのダッシュボードでデプロイメントが成功
- [ ] 本番URLでアクセスできる
- [ ] 404エラーが発生していない

---

## 🆘 サポート

### **問題が解決しない場合**
1. エラーログの詳細を収集
2. ブラウザの種類とバージョンを確認
3. 使用している拡張機能の一覧を作成
4. 開発チームに詳細を報告

### **緊急時の対応**
- 一時的に古いバージョンにロールバック
- 別のブラウザでの動作確認
- 拡張機能の一時的な無効化

---

## 📚 参考資料

- [Vercel Documentation](https://vercel.com/docs)
- [Nuxt.js Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
- [Microsoft Edge Extensions](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/)
- [Browser Extension Troubleshooting](https://developer.chrome.com/docs/extensions/mv3/troubleshooting/)
