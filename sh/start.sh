#!/usr/bin/env bash
set -euo pipefail

# start.sh - Sail コンテナを起動し、初期化を行う
# 前提条件: setup.sh で初期化が完了していること

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
# アプリ本体は sh の親ディレクトリ配下の app に存在
APP_DIR="$(cd "$ROOT_DIR/.." && pwd)/app"

if [ ! -d "$APP_DIR" ]; then
  echo "エラー: アプリケーションディレクトリが見つかりません: $APP_DIR"
  echo "先に setup.sh を実行してください。"
  exit 1
fi

# .env がなければ example からコピー／localディレクトリの内容で上書き
LOCAL_DIR="$(cd "$ROOT_DIR/.." && pwd)/local"

# copy helper function
copy_with_check(){
  local src="$1" dest="$2"
  if [ -f "$src" ]; then
    if [ -f "$dest" ] && [ "$dest" -nt "$src" ]; then
      echo "警告: $dest の方が新しいため $src で上書きしません。処理を中止します。"
      exit 1
    fi
    cp "$src" "$dest"
    echo "コピー: $src -> $dest"
  fi
}

if [ ! -f "$APP_DIR/.env" ]; then
  cp "$APP_DIR/.env.example" "$APP_DIR/.env"
  echo ".env を .env.example からコピーしました"
fi

# local ディレクトリがあれば各種設定を上書き
if [ -d "$LOCAL_DIR" ]; then
  echo "local ディレクトリから設定ファイルを反映します: $LOCAL_DIR"
  copy_with_check "$LOCAL_DIR/.env.example" "$APP_DIR/.env"
  copy_with_check "$LOCAL_DIR/mysql.cnf" "$APP_DIR/mysql.cnf"
  copy_with_check "$LOCAL_DIR/php.ini" "$APP_DIR/php.ini"
fi

if [ ! -f "$APP_DIR/docker-compose.yml" ] && [ ! -f "$APP_DIR/compose.yaml" ]; then
  echo "エラー: docker-compose.yml または compose.yaml が見つかりません。"
  echo "先に setup.sh を実行してください。"
  exit 1
fi

cd "$APP_DIR"

if [ ! -f vendor/bin/sail ]; then
  echo "エラー: vendor/bin/sail が見つかりません。"
  exit 1
fi

echo "================================"
echo "Sail コンテナの起動"
echo "================================"
echo ""

echo "[1/3] Sail コンテナを起動します (./vendor/bin/sail up -d)"
./vendor/bin/sail up -d

echo "[2/2] コンテナの初期化は setup.sh で行われています。必要であれば手動で artisan コマンドを実行してください。"

echo ""
echo "✓ 起動完了！"
echo ""
echo "確認:"
echo "  - ブラウザで http://localhost にアクセス"
echo "  - コンテナログ確認: ./vendor/bin/sail logs -f"
echo "  - 停止: ./stop.sh"
echo "  - 再起動: ./restart.sh"
echo ""
