# Frontend ビルドと本番デプロイ

## 📁 ディレクトリ構成

```
app/
├── frontend/          # 開発用ソースコード
│   ├── src/          # Reactソースコード
│   ├── test/e2e/     # E2Eテスト
│   ├── index.html    # エントリーHTML
│   └── vite.config.ts # ビルド設定（出力先: backend/public）
└── backend/
    └── public/       # 本番ビルド成果物の配置先
        ├── index.html     # ビルド後に生成
        ├── assets/        # ビルド後に生成
        └── .vite/         # マニフェスト
```

## 🚀 開発環境（現在の構成）

開発時は **フロントエンドとバックエンドが分離** しています：

- **フロントエンド**: http://localhost:5173 (Vite Dev Server)
- **バックエンドAPI**: http://localhost (Laravel)

```bash
# 起動
cd ~/work/sail-app
./sh/start.sh

# アクセス
# フロントエンド: http://localhost:5173
# バックエンド: http://localhost
```

### 開発時の動作

- Viteの開発サーバーが `frontend/` のソースコードを配信
- HMR（Hot Module Replacement）が有効
- `/api` へのリクエストは自動的にバックエンドにプロキシ

## 🏗️ 本番環境用ビルド

本番環境では **LaravelがReactも配信** します：

### 1. ビルド実行

```bash
cd ~/work/sail-app/app/frontend

# 通常ビルド
npm run build

# クリーンビルド（既存のassets削除）
npm run build:clean
```

### 2. 成果物の確認

ビルド後、以下のファイルが `backend/public/` に生成されます：

```
backend/public/
├── index.html          # エントリーHTML
├── assets/             # JS/CSS/画像などのハッシュ化されたファイル
│   ├── index-[hash].js
│   └── index-[hash].css
├── .vite/
│   └── manifest.json   # アセットマニフェスト
└── (Laravelの既存ファイルは保持)
```

### 3. Laravel側の設定

`backend/routes/web.php` でSPAフォールバックが設定されています：

```php
// ルートアクセス: index.htmlを返す
Route::get('/', function () {
    if (file_exists(public_path('index.html'))) {
        return file_get_contents(public_path('index.html'));
    }
    return view('welcome');
});

// その他のルート: Reactルーティング用フォールバック
Route::fallback(function () {
    if (file_exists(public_path('index.html'))) {
        return file_get_contents(public_path('index.html'));
    }
    abort(404);
});
```

### 4. 本番環境でのアクセス

- **すべてのページ**: http://your-domain.com
- **API**: http://your-domain.com/api/*

Laravelがフロントエンドもバックエンドも配信します。

## 📝 .gitignore 設定

`backend/.gitignore` に以下が追加されています：

```gitignore
/public/assets      # ビルドされたJS/CSS
/public/index.html  # ビルドされたHTML
/public/.vite       # Viteマニフェスト
/public/manifest.json
```

これにより、ビルド成果物はGit管理されません。

## 🔄 ワークフロー

### 開発フロー

```bash
# 1. コンテナ起動
./sh/start.sh

# 2. 開発
# - フロントエンド: http://localhost:5173 でHMR開発
# - バックエンド: app/backend/ でAPI開発

# 3. テスト
cd app/frontend
npm run test:e2e
```

### デプロイフロー

```bash
# 1. フロントエンドをビルド
cd app/frontend
npm run build:clean

# 2. バックエンドのビルド成果物を含めてデプロイ
cd ../backend
# ここでデプロイ処理（rsync, git push等）

# 3. 本番環境でLaravelの最適化
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## ⚙️ Vite設定の詳細

`frontend/vite.config.ts`:

```typescript
build: {
  // 本番ビルド時は backend/public に出力
  outDir: path.resolve(__dirname, '../backend/public'),
  emptyOutDir: false, // Laravelのpublicファイルを削除しない
  manifest: true,
  rollupOptions: {
    input: path.resolve(__dirname, 'index.html'),
  },
}
```

## 🚨 注意事項

### 開発時の注意

- **frontend/index.html は必須** - Viteの開発サーバーのエントリーポイント
- ビルドしていない状態では http://localhost だけでフロントエンドは動作しません

### 本番デプロイ時の注意

1. **必ずビルドを実行** してから backend/ をデプロイ
2. **CORS設定** が必要な場合は backend の設定を確認
3. **ベースURL** が異なる場合は vite.config.ts の base オプションを設定

```typescript
// サブディレクトリでホストする場合
export default defineConfig({
  base: '/app/',  // http://example.com/app/ でホストする場合
  // ...
})
```

## 🔧 トラブルシューティング

### ビルドエラー

```bash
# 依存関係を再インストール
cd app/frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 本番環境でReactが表示されない

1. `backend/public/index.html` が存在するか確認
2. `backend/routes/web.php` のフォールバックルートが正しいか確認
3. ブラウザの開発者ツールでアセットのパスを確認

### アセットが404エラー

- `backend/public/assets/` ディレクトリが存在するか確認
- `.htaccess` や nginx設定でアセットへのアクセスが許可されているか確認

## 📚 参考資料

- [Vite - Building for Production](https://vitejs.dev/guide/build.html)
- [Laravel - SPA Fallback](https://laravel.com/docs/routing#fallback-routes)
- [React Router - Server Rendering](https://reactrouter.com/en/main/guides/ssr)
