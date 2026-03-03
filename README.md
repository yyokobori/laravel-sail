# Laravel + React アプリケーション

WSL2 + Docker Desktop による Laravel（バックエンド）+ React（フロントエンド）の開発環境です。

## 📁 プロジェクト構成

```
sail-app/
├── app/
│   ├── backend/         # Laravel API
│   ├── frontend/        # React アプリケーション
│   │   ├── src/        # React ソースコード
│   │   └── test/e2e/   # Playwright E2Eテスト
│   └── compose.yaml     # Docker Compose 設定
├── sh/                  # 起動スクリプト
│   ├── setup.sh        # 初回セットアップ
│   ├── start.sh        # コンテナ起動
│   ├── stop.sh         # コンテナ停止
│   └── restart.sh      # コンテナ再起動
├── ai/                  # AI用仕様管理
├── doc/                 # ドキュメント
├── conf/                # 環境別設定ファイル
│   ├── local/          # ローカル開発用設定（.gitignore対象）
│   └── aws/            # AWS環境用設定（将来追加予定）
└── local.sample/       # 設定テンプレート（廃止予定）
```

## 🚀 クイックスタート

### 初回セットアップ

```bash
cd ~/work/sail-app
./sh/setup.sh
```

### 起動

```bash
./sh/start.sh
```

### アクセス

- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost
- **MySQL**: localhost:3306

### 停止

```bash
./sh/stop.sh
```

## 🛠️ 開発コマンド

### バックエンド（Laravel）

```bash
# コンテナ内でコマンド実行
cd ~/work/sail-app/app
docker compose exec backend php artisan <command>

# 例：マイグレーション
docker compose exec backend php artisan migrate

# 例：テスト実行
docker compose exec backend php artisan test
```

### フロントエンド（React）

```bash
# コンテナ内でコマンド実行
cd ~/work/sail-app/app
docker compose exec frontend npm run <command>

# 例：E2Eテスト実行（コンテナ外から）
cd ~/work/sail-app/app/frontend
npm run test:e2e
```

## 📝 開発ワークフロー

1. VSCode Remote - WSL でプロジェクトを開く
2. `./sh/start.sh` でコンテナ起動
3. フロントエンド開発: http://localhost:5173 でHMR有効
4. バックエンド開発: `app/backend` 配下でLaravel開発
5. API呼び出し: フロントエンドから `/api` で自動プロキシ

## 🧪 テスト

### バックエンドテスト

```bash
cd ~/work/sail-app/app
docker compose exec backend php artisan test
```

### E2Eテスト

```bash
cd ~/work/sail-app/app/frontend
npm install  # 初回のみ
npm run test:e2e
```

## 🏗️ 本番環境用ビルド

**開発環境**: フロントエンドとバックエンドが分離（frontend: 5173, backend: 80）
**本番環境**: Laravelがフロントエンドも配信（すべて backend 経由）

### ビルド手順

```bash
# 1. フロントエンドをビルド（backend/public に出力）
cd ~/work/sail-app/app/frontend
npm run build:clean

# 2. ビルド成果物の確認
ls -la ../backend/public/
# -> index.html, assets/, .vite/ が生成される

# 3. 本番環境ではLaravelが全て配信
# http://your-domain.com -> Reactアプリ
# http://your-domain.com/api/* -> Laravel API
```

詳細は [app/frontend/BUILD.md](app/frontend/BUILD.md) を参照してください。
cd ~/work/sail-app/app/frontend
npm install  # 初回のみ
npm run test:e2e
```

## 📚 ドキュメント

- [AI仕様管理](ai/01_readme.md) - AI使用のルール
- [環境詳細](ai/02_laravel.md) - Laravel + React環境の詳細
- [テスト仕様](ai/80_test.md) - テスト作成ガイド
- [起動手順](doc/起動手順.md) - 詳細な起動手順

## ⚙️ 設定のカスタマイズ

`conf/local/` ディレクトリにカスタム設定ファイルを配置すると、起動時に自動反映されます：

- `.env.example` → `app/backend/.env`
- `mysql.cnf` → `app/backend/mysql.cnf`
- `php.ini` → `app/backend/php.ini`

将来的に AWS 環境用設定を追加する場合は、`conf/aws/` に配置してください。

## 🔧 トラブルシューティング

### ポートが使用中

```bash
# 既存のコンテナを停止
./sh/stop.sh
docker compose down
```

### ファイル権限エラー

```bash
sudo chown -R $(id -u):$(id -g) app/backend
```

### node_modules が見つからない

フロントエンドコンテナが初回起動時に自動でnpm installを実行します。起動ログを確認してください。

```bash
docker compose logs frontend
```
