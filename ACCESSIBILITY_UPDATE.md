# アクセシビリティとハイコントラストモードの更新

## 概要

このプロジェクトでは、非推奨となった `-ms-high-contrast` CSS メディアクエリを、新しい `forced-colors` 標準に置き換えました。

## 変更内容

### 1. メインCSSファイルの更新 (`assets/css/main.css`)
- ハイコントラストモード用の `@media (forced-colors: active)` ルールを追加
- プリント用のスタイルを追加
- アクセシビリティの向上

### 2. 新しいアクセシビリティCSSファイル (`assets/css/accessibility.css`)
- 包括的なハイコントラストモードサポート
- システムカラーの使用 (`CanvasText`, `Canvas`, `Highlight` など)
- フォーカス表示の強化
- モーション削減のサポート
- プリント時のアクセシビリティ

### 3. Nuxt設定の更新 (`nuxt.config.ts`)
- 新しいアクセシビリティCSSファイルを読み込み

## 非推奨警告の解決

### 問題
ブラウザコンソールに以下のような警告が表示される場合があります：
```
[Deprecation] -ms-high-contrast is in the process of being deprecated. 
Please see https://blogs.windows.com/msedgedev/2024/04/29/deprecating-ms-high-contrast/ 
for tips on updating to the new Forced Colors Mode standard.
```

### 原因
これらの警告は通常、以下のいずれかが原因です：
1. **ブラウザ拡張機能** - 一部の拡張機能が古いCSSを使用
2. **外部ライブラリ** - 古いバージョンのUIライブラリ
3. **キャッシュされたファイル** - 古いビルドファイル

### 解決方法

#### 1. ブラウザ拡張機能の確認
- 開発者ツールで警告の詳細を確認
- 拡張機能を一時的に無効化してテスト
- 拡張機能の更新を確認

#### 2. プロジェクトの確認
このプロジェクトでは既に以下の対応を行っています：
- ✅ `-ms-high-contrast` の使用なし
- ✅ 新しい `forced-colors` 標準の実装
- ✅ 包括的なアクセシビリティサポート

#### 3. キャッシュのクリア
```bash
# フロントエンドの依存関係をクリア
cd frontend
rm -rf node_modules
rm -rf .nuxt
npm install

# 開発サーバーを再起動
npm run dev
```

## 新しい標準の利点

### `forced-colors` メディアクエリ
```css
@media (forced-colors: active) {
  /* ハイコントラストモード用のスタイル */
  .element {
    border: 2px solid CanvasText;
    background: Canvas;
    color: CanvasText;
  }
}
```

### システムカラー
- `CanvasText` - テキスト色
- `Canvas` - 背景色
- `Highlight` - ハイライト色
- `HighlightText` - ハイライトテキスト色
- `ButtonFace` - ボタン背景色
- `ButtonText` - ボタンテキスト色

## アクセシビリティのベストプラクティス

### 1. コントラスト比
- 通常のテキスト: 4.5:1以上
- 大きなテキスト: 3:1以上

### 2. フォーカス表示
- 明確で目立つフォーカスインジケーター
- キーボードナビゲーションのサポート

### 3. ハイコントラストモード
- システム設定との連携
- 適切な色の使用

### 4. モーション
- `prefers-reduced-motion` のサポート
- アニメーションの制御

## テスト方法

### 1. ハイコントラストモードのテスト
```bash
# Windows
設定 > 簡単操作 > ハイコントラスト

# macOS
システム環境設定 > アクセシビリティ > ディスプレイ > コントラストを上げる
```

### 2. フォーカス表示のテスト
- Tabキーでナビゲーション
- フォーカスインジケーターの確認

### 3. スクリーンリーダーのテスト
- NVDA (Windows)
- VoiceOver (macOS)
- JAWS (Windows)

## 参考資料

- [MDN: forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- [Microsoft Edge Blog: Deprecating -ms-high-contrast](https://blogs.windows.com/msedgedev/2024/04/29/deprecating-ms-high-contrast/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev: High Contrast Mode](https://web.dev/high-contrast/)

## サポート

問題が解決しない場合や、追加のアクセシビリティ要件がある場合は、開発チームまでお問い合わせください。
