# Frontend

React + TypeScript + Vite フロントエンドアプリケーション

## 🚀 開発

### 開発サーバー起動

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（ポート: 5173）
npm run dev
```

開発サーバーが起動したら http://localhost:5173 にアクセス

### 本番ビルド

```bash
# ビルド（backend/public/ に出力）
npm run build

# クリーンビルド（既存のassetsを削除してからビルド）
npm run build:clean

# ビルド結果のプレビュー
npm run preview
```

**注意**: ビルド成果物は `../backend/public/` に出力されます。
詳細は [BUILD.md](BUILD.md) を参照してください。

## 🧪 テスト

```bash
# E2Eテスト実行
npm run test:e2e

# E2EテストUIモード
npm run test:e2e:ui
```

## 📁 ディレクトリ構成

```
frontend/
├── src/           # Reactソースコード
│   ├── main.tsx  # エントリーポイント
│   ├── App.tsx   # メインコンポーネント
│   └── *.css     # スタイルシート
├── test/
│   └── e2e/      # Playwright E2Eテスト
├── public/        # 静的ファイル（ビルド時にコピー）
├── index.html     # HTMLエントリーポイント
└── vite.config.ts # Vite設定（ビルド出力先: ../backend/public）
```

## 🌐 アクセスURL

- **開発環境**: http://localhost:5173 (Vite Dev Server)
- **本番環境**: http://localhost (Laravelがフロントエンドも配信)

## 📝 開発ワークフロー

1. Docker Composeでコンテナを起動: `./sh/start.sh`
2. フロントエンドの開発: http://localhost:5173
3. バックエンドAPI: `/api/*` へのリクエストは自動プロキシ
4. 変更は自動でHMR（Hot Module Replacement）

## 🏗️ 本番デプロイ

詳細は [BUILD.md](BUILD.md) を参照してください。

1. `npm run build:clean` でビルド
2. `backend/public/` にフロントエンドの成果物が出力される
3. バックエンドと一緒にデプロイ
