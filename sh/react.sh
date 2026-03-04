#!/usr/bin/env bash
set -euo pipefail

# react.sh - React(frontend) 関連コマンドを Docker Compose 経由で実行する

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$(cd "$ROOT_DIR/.." && pwd)/app"

if [ ! -d "$APP_DIR/frontend" ]; then
  echo "エラー: フロントエンドディレクトリが見つかりません: $APP_DIR/frontend"
  exit 1
fi

if [ ! -f "$APP_DIR/compose.yaml" ] && [ ! -f "$APP_DIR/docker-compose.yml" ]; then
  echo "エラー: compose.yaml または docker-compose.yml が見つかりません。"
  exit 1
fi

if [ $# -lt 1 ]; then
  echo "使い方: ./sh/react.sh <command>"
  echo ""
  echo "command:"
  echo "  build                 frontend で npm run build を実行"
  echo "  logs                  frontend のログを表示（follow）"
  echo ""
  echo "例:"
  echo "  ./sh/react.sh build"
  echo "  ./sh/react.sh logs"
  exit 1
fi

cd "$APP_DIR"

command="$1"

case "$command" in
  build)
    echo "frontend: npm run build"
    docker compose exec -T frontend npm run build
    ;;
  logs)
    echo "frontend logs (follow)"
    docker compose logs -f frontend
    ;;
  *)
    echo "エラー: 未対応コマンドです: $command"
    echo "./sh/react.sh を引数なしで実行して使い方を確認してください。"
    exit 1
    ;;
esac
