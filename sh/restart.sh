#!/usr/bin/env bash
set -euo pipefail

# restart.sh - Laravel Sail コンテナを再起動する

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$ROOT_DIR/.." && pwd)/app"
BACKEND_DIR="$(cd "$ROOT_DIR/.." && pwd)/app/backend"

if [ ! -d "$APP_DIR" ]; then
  echo "アプリケーションディレクトリが見つかりません: $APP_DIR"
  exit 1
fi

cd "$APP_DIR"

if [ -f compose.yaml ] || [ -f docker-compose.yml ]; then
  echo "Stopping containers..."
  docker compose down || true
  echo "Starting containers..."
  docker compose up -d
  echo "Generating backend app key if missing..."
  docker compose exec backend php artisan key:generate || true
  echo "Containers restarted."
else
  echo "compose.yaml または docker-compose.yml が見つかりません。プロジェクトが未初期化の可能性があります。" >&2
  exit 1
fi
