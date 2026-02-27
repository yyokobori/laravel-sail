#!/usr/bin/env bash
set -euo pipefail

# restart.sh - Laravel Sail コンテナを再起動する

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$ROOT_DIR/.." && pwd)/app"

if [ ! -d "$APP_DIR" ]; then
  echo "アプリケーションディレクトリが見つかりません: $APP_DIR"
  exit 1
fi

cd "$APP_DIR"

if [ -f vendor/bin/sail ]; then
  echo "Stopping Sail containers..."
  ./vendor/bin/sail down || true
  echo "Starting Sail containers..."
  ./vendor/bin/sail up -d
  echo "Generating app key if missing..."
  ./vendor/bin/sail artisan key:generate || true
  echo "Sail containers restarted."
else
  echo "vendor/bin/sail が見つかりません。プロジェクトが未初期化の可能性があります。" >&2
  exit 1
fi
