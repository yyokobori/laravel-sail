# 現在の Laravel 構築状況

以下は `/home/yokobori/work/sail-app` 以下の構成と説明です。WSL2 + Docker Desktop + Laravel Sail を使ったプロジェクトで、すべて Docker コンテナ内の PHP で動作します。

## ルートディレクトリ (`~/work`)

```
doc                 # ドキュメント（起動手順など）
ai                  # AI用情報共有ファイル
sail-app            # 開発環境プロジェクト
```

## ルートディレクトリ (`sail-app`)

```
doc/                # ドキュメント（起動手順など）
app/                # Laravel アプリ本体（プロジェクトルート）
sh/                 # sailでの起動関連
   restart.sh          # Sail コンテナ再起動スクリプト
   setup.sh            # 初回セットアップスクリプト（プロジェクト作成 + sail:install）
   start.sh            # コンテナ起動スクリプト
   stop.sh             # コンテナ停止スクリプト
```

- `setup.sh` を一度実行し、Laravel プロジェクトと `compose.yaml`（または `docker-compose.yml`）を生成する。
- `start.sh` はコンテナを起動し、キー生成とマイグレーションを自動で行う。
- `stop.sh`/`restart.sh` は運用用の停止・再起動コマンド。

## Laravel プロジェクト (`app` ディレクトリ)

標準的な Laravel 10.x 以降の構成になっています。特に変更した点はなく、Sail が作成した `compose.yaml` を使用しています。

主なディレクトリとファイル:

```
app/                # アプリケーションコード（Http/Controllers, Models, Providers など）
artisan             # CLI エントリポイント
bootstrap/          # フレームワークブートストラップ
compose.yaml        # Docker Compose 設定（Sail 生成）
composer.json       # Composer 依存定義
config/             # Laravel 設定
database/           # マイグレーション、シード、SQLite DB
public/             # Web サーバのドキュメントルート
resources/          # フロントエンドアセットとビュー
routes/             # ルーティング定義
storage/            # ログ、キャッシュ、セッションなど
tests/              # PHPUnit テスト
vendor/             # Composer 管理パッケージ
.env                # 環境変数（デフォルトは setup.sh で生成）

``` 

`compose.yaml` には MySQL が含まれ、開発用に以下のサービスが定義されています：`laravel.test`、`mysql`、`redis` など（構成は Sail 標準）。

## 実際の作業フロー

1. WSL ターミナルで `~/work/sail-app` に移動。
2. 必要に応じて Docker Desktop を起動しておく。
3. 初回は `./sh/setup.sh` を実行する。
   - プロジェクトが未作成なら Laravel をインストール。
   - `composer require laravel/sail --dev` を実行。
   - `artisan sail:install --with=mysql` で Docker 設定を生成。
4. 以後の起動は `./sh/start.sh`。
5. 停止/再起動は `./sh/stop.sh`/`./sh/restart.sh`。
6. VSCode Remote - WSL でプロジェクトを開き、ターミナルから同じコマンドを実行可能。

## 注意点・補足

- ファイル権限：ホストからファイルを扱う場合は所有権がズレることがあるため、`chown -R $(id -u):$(id -g) app` で修正。
- PHP バージョン：Laravel 10 以降は PHP 8.4+ 必須のため、`setup.sh` は `php:8.4-cli-alpine` を使用。
- 永続化：`compose.yaml` の内容を変更してサービス追加やポート調整が可能。
- ドキュメントは `doc/起動手順.md` に詳細が記載されている。

### local フォルダ (新仕様)
プロジェクトルート直下に `local/` ディレクトリを作り、
カスタム設定ファイルを置くことで起動時に自動反映される。
- `.env.example` → `app/.env` へコピー
- `mysql.cnf`, `php.ini` → それぞれ `app/` 配下に上書きコピー
上書き時、`app` 側のファイルが新しい場合は警告を表示して起動を中断する。


