#!/usr/bin/env bash
set -euo pipefail

# stop.sh - Laravel Sail コンテナを停止する

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$ROOT_DIR/.." && pwd)/app"

if [ ! -d "$APP_DIR" ]; then
  echo "アプリケーションディレクトリが見つかりません: $APP_DIR"
  exit 1
fi

cd "$APP_DIR"

if [ -f compose.yaml ] || [ -f docker-compose.yml ]; then
  echo "Stopping Docker Compose containers..."
  docker compose down
  echo "Containers stopped."
else
  echo "compose.yaml または docker-compose.yml が見つかりません。プロジェクトが未初期化の可能性があります。" >&2
  exit 1
fi
