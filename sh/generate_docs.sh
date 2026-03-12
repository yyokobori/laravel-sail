#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/app/frontend"
BACKEND_DIR="$ROOT_DIR/app/backend"
DOCS_SITE_DIR="$ROOT_DIR/app/docs-site"

# frontend: typedoc
gen_frontend() {
  cd "$FRONTEND_DIR"
  npm install
  npx --yes typedoc --entryPointStrategy expand --out "$DOCS_SITE_DIR/typedoc" src
  cd "$ROOT_DIR/sh"
}

# backend: phpdoc
gen_backend() {
  cd "$BACKEND_DIR"
  composer install
  if ! command -v phpdoc >/dev/null 2>&1; then
    composer global require phpdocumentor/phpdocumentor
    export PATH="$PATH:$HOME/.composer/vendor/bin"
  fi
  phpdoc -d app -t "$DOCS_SITE_DIR/phpdoc"
  cd "$ROOT_DIR/sh"
}

case "${1:-all}" in
  frontend) gen_frontend ;;
  backend)  gen_backend ;;
  all|*)    gen_frontend; gen_backend ;;
esac

echo "=== ドキュメント生成完了 ==="
