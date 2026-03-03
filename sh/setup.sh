#!/usr/bin/env bash
set -euo pipefail

# setup.sh - Laravel + React プロジェクトを初期化
# バックエンド: app/backend (Laravel)
# フロントエンド: app/frontend (React)

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$ROOT_DIR/.." && pwd)/app"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"
LOCAL_DIR="$(cd "$ROOT_DIR/.." && pwd)/conf/local"

# copy helper function
copy_with_check(){
  local src="$1" dest="$2"
  if [ -f "$src" ]; then
    if [ -f "$dest" ] && [ "$dest" -nt "$src" ]; then
      echo "警告: $dest の方が新しいため $src で上書きしません。"
      return 1
    fi
    cp "$src" "$dest"
    echo "コピー: $src -> $dest"
  fi
}

echo "================================"
echo "Laravel + React 初期セットアップ"
echo "================================"

# バックエンドセットアップ
echo ""
echo "[1/3] バックエンド (Laravel) セットアップ"
if [ -d "$BACKEND_DIR" ] && [ -n "$(ls -A "$BACKEND_DIR" 2>/dev/null || true)" ]; then
  echo "バックエンドディレクトリが既に存在します。"
  read -p "Laravel を再インストールしますか? (yes/no): " reinstall_choice
  
  if [ "$reinstall_choice" = "yes" ]; then
    echo "既存ファイルを削除します..."
    docker run --rm -v "$BACKEND_DIR":/app alpine:latest sh -c \
      'rm -rf /app/* /app/.[!.]* /app/..?* || true'
    mkdir -p "$BACKEND_DIR"
    
    echo "composer create-project (Docker 経由で実行)"
    docker run --rm -v "$BACKEND_DIR":/app -w /app composer create-project laravel/laravel . --prefer-dist
    
    echo "laravel/sail を composer で追加"
    docker run --rm -v "$BACKEND_DIR":/app -w /app composer require laravel/sail --dev
    
    echo "所有権を現在のユーザーに設定"
    sudo chown -R $(id -u):$(id -g) "$BACKEND_DIR" || true
  else
    echo "既存のバックエンドを使用します。"
  fi
else
  echo "バックエンドプロジェクトを作成します..."
  mkdir -p "$BACKEND_DIR"
  
  docker run --rm -v "$BACKEND_DIR":/app -w /app composer create-project laravel/laravel . --prefer-dist
  docker run --rm -v "$BACKEND_DIR":/app -w /app composer require laravel/sail --dev
  sudo chown -R $(id -u):$(id -g) "$BACKEND_DIR" || true
fi

# .env がなければコピー
if [ ! -f "$BACKEND_DIR/.env" ] && [ -f "$BACKEND_DIR/.env.example" ]; then
  cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
  echo ".env を .env.example からコピーしました"
fi

# local ディレクトリがあれば各種設定を上書き
if [ -d "$LOCAL_DIR" ]; then
  echo "conf/local ディレクトリから設定ファイルを反映します: $LOCAL_DIR"
  copy_with_check "$LOCAL_DIR/.env.example" "$BACKEND_DIR/.env" || true
  copy_with_check "$LOCAL_DIR/mysql.cnf" "$BACKEND_DIR/mysql.cnf" || true
  copy_with_check "$LOCAL_DIR/php.ini" "$BACKEND_DIR/php.ini" || true
else
  echo "注意: conf/local ディレクトリが見つかりません。デフォルト設定を使用します。"
  echo "Docker Compose環境では、.env の DB_HOST を 'mysql' に設定する必要があります。"
  
  # DB_HOST を自動的に mysql に変更
  if [ -f "$BACKEND_DIR/.env" ]; then
    sed -i.bak 's/^DB_HOST=.*/DB_HOST=mysql/' "$BACKEND_DIR/.env"
    echo "DB_HOST を 'mysql' に自動設定しました"
  fi
fi

# フロントエンドセットアップ
echo ""
echo "[2/3] フロントエンド (React) の依存関係を確認"
if [ -d "$FRONTEND_DIR" ]; then
  echo "フロントエンドディレクトリが存在します。"
  if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    echo "npm install は Docker Compose 起動時に自動実行されます。"
  fi
else
  echo "エラー: フロントエンドディレクトリが見つかりません: $FRONTEND_DIR"
  echo "手動で frontend ディレクトリを作成してください。"
  exit 1
fi

# Docker Compose設定の確認
echo ""
echo "[3/3] Docker Compose 設定の確認"
if [ ! -f "$APP_DIR/compose.yaml" ] && [ ! -f "$APP_DIR/docker-compose.yml" ]; then
  echo "警告: compose.yaml が見つかりません。"
  echo "app/compose.yaml を確認してください。"
fi

# 初回コンテナ起動（キー生成・マイグレーション）
echo ""
echo "コンテナを一時起動してキー生成・マイグレーションを行います..."
cd "$APP_DIR"

if docker compose up -d; then
  echo "MySQLの起動を待機中..."
  sleep 10
  
  # MySQLが起動するまで待機
  echo "MySQLの起動確認..."
  for i in {1..30}; do
    if docker compose exec mysql mysqladmin ping -h localhost --silent 2>/dev/null; then
      echo "MySQL起動完了"
      break
    fi
    echo "待機中... ($i/30)"
    sleep 2
  done
  
  echo "アプリケーションキーを生成..."
  docker compose exec backend php artisan key:generate || true
  
  echo "データベースマイグレーション実行..."
  docker compose exec backend php artisan migrate --force || true
  
  echo "コンテナを停止..."
  docker compose down
  
  echo "storage ディレクトリに権限を付与..."
  if [ -d "$BACKEND_DIR/storage" ]; then
    docker run --rm -v "$BACKEND_DIR":/app -w /app alpine:latest chmod -R 777 /app/storage
  fi
  
  echo "所有権を現在のユーザーに設定..."
  sudo chown -R $(id -u):$(id -g) "$BACKEND_DIR" || true
else
  echo "警告: Docker Compose の起動に失敗しました。"
  echo "compose.yaml の設定を確認してください。"
fi

echo ""
echo "✓ セットアップ完了"
echo ""
echo "次のステップ:"
echo "  1. コンテナ起動: ./sh/start.sh"
echo "  2. バックエンド: http://localhost"
echo "  3. フロントエンド: http://localhost:5173"
echo "  4. 停止: ./sh/stop.sh"
echo ""
