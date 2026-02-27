#!/usr/bin/env bash
set -euo pipefail

# setup.sh - Laravel プロジェクトを初期化し、Sail（docker-compose.yml）をセットアップする
# - Laravel プロジェクト作成
# - laravel/sail インストール
# - artisan sail:install --with=mysql で docker-compose.yml 生成

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
# アプリ本体は sh の親ディレクトリ配下の app に存在
APP_DIR="$(cd "$ROOT_DIR/.." && pwd)/app"

echo "================================"
echo "Laravel Sail 初期セットアップ"
echo "================================"

# app ディレクトリが存在して空でない場合、再インストール確認
if [ -d "$APP_DIR" ] && [ -n "$(ls -A "$APP_DIR" 2>/dev/null || true)" ]; then
  echo ""
  echo "app ディレクトリが既に存在します。"
  read -p "Laravel を再インストールしますか? (yes/no): " reinstall_choice
  
  if [ "$reinstall_choice" = "yes" ]; then
    echo "[1/4] 既存ファイルを削除します (コンテナ内で実行)..."
    # ホストから権限がないファイルが存在する場合に備え、docker コンテナ内で削除
    docker run --rm -v "$APP_DIR":/app alpine:latest sh -c \
      'rm -rf /app/* /app/.[!.]* /app/..?* || true'
    mkdir -p "$APP_DIR"
    
    echo "[2/4] composer create-project (Docker 経由で実行)"
    docker run --rm -v "$APP_DIR":/app -w /app composer create-project laravel/laravel . --prefer-dist
    
    echo "[3/4] laravel/sail を composer で追加"
    cd "$APP_DIR"
    docker run --rm -v "$PWD":/app -w /app composer require laravel/sail --dev
    # ホスト側の所有権を現在のユーザーに戻す
    echo "[4/4] 所有権を現在のユーザーに設定"
    sudo chown -R $(id -u):$(id -g) "$APP_DIR" || true
  else
    echo "[1/2] Laravel インストール後の処理から実行します..."
    cd "$APP_DIR"
  fi
else
  echo ""
  echo "[1/4] Laravel プロジェクトを作成します: $APP_DIR"
  mkdir -p "$APP_DIR"
  
  echo "[2/4] composer create-project (Docker 経由で実行)"
  docker run --rm -v "$APP_DIR":/app -w /app composer create-project laravel/laravel . --prefer-dist
  
  echo "[3/4] laravel/sail を composer で追加"
  cd "$APP_DIR"
  docker run --rm -v "$PWD":/app -w /app composer require laravel/sail --dev
fi

# docker-compose.yml が存在しない場合、artisan sail:install を実行
if [ ! -f "$APP_DIR/docker-compose.yml" ]; then
  echo ""
  echo "[4/4] artisan sail:install --with=mysql で docker-compose.yml を生成"
  echo "（これは Docker コンテナ内で PHP を実行して行われます）"
  
  # php:8.4-cli を使って artisan sail:install を実行
  docker run --rm -v "$APP_DIR":/app -w /app php:8.4-cli-alpine php artisan sail:install --with=mysql
  
  if [ $? -ne 0 ]; then
    echo ""
    echo "エラー: artisan sail:install が失敗しました。"
    echo "手動で以下を試してください:"
    echo "  cd $APP_DIR"
    echo "  docker run --rm -v \$PWD:/app -w /app php:8.3-cli php artisan sail:install --with=mysql"
    exit 1
  fi
else
  echo ""
  echo "[2/3] docker-compose.yml が既に存在します。sail:install をスキップします。"
fi

# 動作確認 - docker-compose.yml または compose.yaml が存在するか確認
if [ ! -f "$APP_DIR/docker-compose.yml" ] && [ ! -f "$APP_DIR/compose.yaml" ]; then
  echo ""
  echo "エラー: docker-compose.yml または compose.yaml が見つかりません。"
  exit 1
fi

if [ ! -f "$APP_DIR/vendor/bin/sail" ]; then
  echo ""
  echo "エラー: vendor/bin/sail が見つかりません。"
  exit 1
fi

# .env がなければコピーしておく
if [ ! -f "$APP_DIR/.env" ] && [ -f "$APP_DIR/.env.example" ]; then
  cp "$APP_DIR/.env.example" "$APP_DIR/.env"
fi

# コンテナを立ち上げてキー生成・マイグレーション
echo ""
echo "コンテナを一時起動してキー生成・マイグレーションを行います..."
cd "$APP_DIR"
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate || true
./vendor/bin/sail artisan migrate --force || true
./vendor/bin/sail down

# storage ディレクトリに 777 権限を付与（Docker コンテナ内から実行）
if [ -d "$APP_DIR/storage" ]; then
  echo ""
  echo "storage ディレクトリに 777 権限を付与します..."
  docker run --rm -v "$APP_DIR":/app -w /app alpine:latest chmod -R 777 /app/storage
fi

# 所有者を現在のユーザーに変更（root で作成されたファイル対策）
echo ""
echo "所有権を現在のユーザーに設定します..."
sudo chown -R $(id -u):$(id -g) "$APP_DIR" || true

echo ""
echo "✓ セットアップ完了"
echo ""
echo "次のステップ:"
echo "  1. ブラウザを開く前に: ./start.sh を実行してコンテナを起動してください"
echo "  2. コンテナ起動後: http://localhost でアプリケーション確認"
echo "  3. 停止時: ./stop.sh を実行"
echo "  4. 再起動: ./restart.sh を実行"
echo ""
