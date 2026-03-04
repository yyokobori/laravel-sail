# 現在の Laravel + React 構築状況

以下は `/home/yokobori/work/sail-app` 以下の構成と説明です。WSL2 + Docker Desktop を使ったプロジェクトで、バックエンド（Laravel）とフロントエンド（React）が分離された構成です。

## 前提構成
- バックエンド: Laravel（API専用） - app/backend
- フロントエンド: React + TypeScript + Vite - app/frontend
- Docker Compose で両方のサービスを管理

## ルートディレクトリ (`~/work`)

```
doc                 # ドキュメント（起動手順など）
ai                  # AI用情報共有ファイル
sail-app            # 開発環境プロジェクト
```

## ルートディレクトリ (`sail-app`)

```
doc/                # ドキュメント（起動手順など）
app/                # アプリケーション本体
   backend/         # Laravel API（プロジェクトルート）
   frontend/        # React フロントエンド
      src/          # React ソースコード
      test/e2e/     # Playwright E2Eテスト
   compose.yaml     # Docker Compose 設定
sh/                 # 起動関連スクリプト
   setup.sh         # 初回セットアップスクリプト
   start.sh         # コンテナ起動スクリプト
   stop.sh          # コンテナ停止スクリプト  
   restart.sh       # コンテナ再起動スクリプト
```

- `setup.sh` を一度実行し、Laravel プロジェクトと `compose.yaml` を準備する。
- `start.sh` はコンテナを起動する。
- `stop.sh`/`restart.sh` は停止・再起動コマンド。

aiも基本的に子のシェルを使用して起動と停止を行う。

## バックエンド (`app/backend`)

標準的な Laravel 10.x 以降の構成です。

主なディレクトリとファイル:

```
app/                # アプリケーションコード（Http/Controllers, Models, Providers など）
artisan             # CLI エントリポイント
bootstrap/          # フレームワークブートストラップ
composer.json       # Composer 依存定義
config/             # Laravel 設定
database/           # マイグレーション、シード
public/             # Web サーバのドキュメントルート
routes/             # ルーティング定義
storage/            # ログ、キャッシュ、セッションなど
tests/              # PHPUnit テスト
vendor/             # Composer 管理パッケージ
.env                # 環境変数
```

## フロントエンド (`app/frontend`)

React + TypeScript + Vite の構成です。

```
src/                # React ソースコード
   main.tsx         # エントリーポイント
   App.tsx          # メインコンポーネント
test/
   e2e/             # Playwright E2Eテスト
publiバックエンドが未作成なら Laravel をインストール。
   - フロントエンドの存在を確認。
   - Docker Compose で初回起動し、キー生成とマイグレーションを実行。
4. 以後の起動は `./sh/start.sh`。
5. 停止/再起動は `./sh/stop.sh`/`./sh/restart.sh`。
6. VSCode Remote - WSL でプロジェクトを開き、ターミナルから同じコマンドを実行可能。

## アクセスURL

- **バックエンド（Laravel API）**: http://localhost
- **フロントエンド（React）**: http://localhost:5173

フロントエンドから `/api` へのリクエストは自動的にバックエンドにプロキシされます

## Docker Compose サービス

`app/compose.yaml` には以下のサービスが定義されています：

- `backend`: Laravel（PHP 8.5） - ポート: 80
- `frontend`: React開発サーバー（Node.js 20） - ポート: 5173
- `mysql`: MySQL 8.4 - ポート: 3306

## 実際の作業フロー

1. WSL ターミナルで `~/work/sail-app` に移動。
2. 必要に応じて Docker Desktop を起動しておく。
3. 初回は `./sh/setup.sh` を実行する。
   - プロジェクトが未作成なら Laravel をインストール。
   - `composer require laravel/sail --dev` を実行。
   - `artisan sail:install --with=mysql` で Docker 設定を生成。/backend` で修正。
- PHP バージョン：Laravel 10 以降は PHP 8.4+ 必須。
- Node.js: フロントエンドの依存関係は Docker Compose 起動時に自動インストールされます。
- ドキュメントは `doc/起動手順.md` に詳細が記載されている。
  
### conf/local フォルダ (AWS対応)

プロジェクトルート直下に `conf/` ディレクトリを作成し、その配下で環境ごとの設定を管理します：

```
conf/
  ├ local/              # ローカル開発環境用設定
  │  ├ .env.example
  │  ├ mysql.cnf
  │  └ php.ini
  └ aws/                # AWS環境用設定（将来追加予定）
```

**`conf/local/` の仕様**
- プロジェクトルート直下の `conf/local/` ディレクトリに設定ファイルを配置します
- カスタム設定ファイルを置くことで起動時に自動反映される
  - `.env.example` → `app/backend/.env` へコピー
  - `mysql.cnf`, `php.ini` → それぞれ マウント（コピーではなく直接参照）
- 上書き時、`app/backend` 側のファイルが新しい場合は警告を表示して起動を中断する

**AWS対応の準備**
- 将来的に AWS 環境用に `conf/aws/` フォルダを追加予定
- AWS 環境構築時は、環境選択スクリプト等で `conf/local/` または `conf/aws/` を切り替える想定

