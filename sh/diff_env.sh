#!/bin/bash
# .envファイル差分比較スクリプト
# backendのlaravel .envとconf/local/.env.sampleの差分を見やすく出力

BACKEND_ENV="$(cd "$(dirname "$0")/../app/backend" && pwd)/.env"
SAMPLE_ENV="$(cd "$(dirname "$0")/../conf/local" && pwd)/.env.example"

if [ ! -f "$BACKEND_ENV" ]; then
  echo "[ERROR] backend .envが存在しません: $BACKEND_ENV"
  exit 1
fi
if [ ! -f "$SAMPLE_ENV" ]; then
  echo "[ERROR] sample .envが存在しません: $SAMPLE_ENV"
  exit 1
fi

echo "=== backend/.env と conf/local/.env.sample の差分 ==="
# コメント・空行を除外し、key順でソートしてdiff
TMP1=$(mktemp)
TMP2=$(mktemp)
grep -vE '^(#|$)' "$BACKEND_ENV" | sort > "$TMP1"
grep -vE '^(#|$)' "$SAMPLE_ENV" | sort > "$TMP2"
diff -u "$TMP2" "$TMP1"

rm -f "$TMP1" "$TMP2"
