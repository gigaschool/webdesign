# デザイン・UI・演出の言葉47

ゲームや Web のデザインで使われる47の用語を、インタラクティブな見本とコード付きで学べるサイトです。

**GitHub Pages:** https://gigaschool.github.io/webdesign/

## カテゴリ

| カテゴリ | 項目数 | 内容例 |
|---|---|---|
| 画面の基本 | 10 | UI, レイアウト, グリッド, レスポンシブ |
| 動き・演出 | 11 | アニメーション, フェード, パーティクル, イージング |
| 見た目・スタイル | 11 | ピクセルアート, ネオン, フラットデザイン, ダークモード |
| UIパーツ | 15 | モーダル, プログレスバー, トグルボタン, スライダー |

各用語につき **5つのデモ見本** を収録しており、ライブプレビューとコピー可能なコード（CSS / HTML / JavaScript）を確認できます。

## ローカルでの実行

```bash
node _server.js
```

http://localhost:8091 で開きます。ビルド不要です。

## 技術スタック

- HTML / CSS / JavaScript（フレームワークなし）
- フォント: [Outfit](https://fonts.google.com/specimen/Outfit) + [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New)
- QRコード: [qrcode-generator](https://github.com/nicehash/qrcode-generator)（CDN）

## ファイル構成

```
index.html                    トップページ
_server.js                    ローカルサーバー (port 8091)
_check-overflow.html          QAツール（overflow検出）
ui-showcase/
  sample.html                 個別デモページ (?slug=...)
  assets/
    css/style.css             スタイル・デザイントークン
    js/
      terms.js                47用語のデータ定義
      demos.js                トップページ用デモレンダラー
      main.js                 トップページのUI制御
      sample.js               デモページの初期化・再生制御
      multi-demos.js          動き・演出のデモ定義 (base)
      multi-demos-motion-extra.js   動き・演出の追加デモ
      multi-demos-basics.js         画面の基本のデモ定義 (base)
      multi-demos-basics-extra.js   画面の基本の追加デモ
      multi-demos-style.js          見た目・スタイルのデモ定義 (base)
      multi-demos-style-extra.js    見た目・スタイルの追加デモ
      multi-demos-parts.js          UIパーツのデモ定義 (base)
      multi-demos-parts-extra.js    UIパーツの追加デモ
```

## ライセンス

[MIT License](./LICENSE)
