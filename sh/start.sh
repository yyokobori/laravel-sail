#!/usr/bin/env bash
set -euo pipefail

# start.sh - Sail コンテナを起動し、初期化を行う
# 前提条件: setup.sh で初期化が完了していること

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
# アプリ本体は sh の親ディレクトリ配下の app/backend に存在
BACKEND_DIR="$(cd "$ROOT_DIR/.." && pwd)/app/backend"
APP_DIR="$(cd "$ROOT_DIR/.." && pwd)/app"

if [ ! -d "$BACKEND_DIR" ]; then
  echo "エラー: バックエンドディレクトリが見つかりません: $BACKEND_DIR"
  echo "先に setup.sh を実行してください。"
  exit 1
fi

# .env がなければ example からコピー／conf/localディレクトリの内容で上書き
LOCAL_DIR="$(cd "$ROOT_DIR/.." && pwd)/conf/local"

# copy helper function
copy_with_check(){
    local src="$1" dest="$2"
    if [ -f "$src" ]; then
        cp "$src" "$dest"
        echo "コピー: $src -> $dest"
    fi
}

if [ ! -f "$BACKEND_DIR/.env" ]; then
  cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
  echo ".env を .env.example からコピーしました"
fi

# conf/local ディレクトリがあれば設定ファイルを反映
# 注: mysql.cnf と php.ini は compose.yaml のボリュームマウントで conf/local/ から直接参照
if [ -d "$LOCAL_DIR" ]; then
  echo "conf/local ディレクトリから設定ファイルを反映します: $LOCAL_DIR"
  copy_with_check "$LOCAL_DIR/.env.example" "$BACKEND_DIR/.env"
fi

# app/.env も backend/.env と同期（Docker Compose グローバル .env）
cp "$BACKEND_DIR/.env" "$APP_DIR/.env"
echo "同期: $BACKEND_DIR/.env -> $APP_DIR/.env"



# === .envと.env.sampleの差分確認 ===
echo "[INFO] .envとconf/local/.env.sampleの差分を確認します"
DIFF_OUTPUT=$("$ROOT_DIR/diff_env.sh")
if [ -z "$DIFF_OUTPUT" ]; then
  echo "差分はありません。処理を続行します。"
else
  echo "$DIFF_OUTPUT"
  echo "上記diffを確認し、問題があれば修正してください。"
  read -p "このまま続行しますか？ (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

if [ ! -f "$APP_DIR/docker-compose.yml" ] && [ ! -f "$APP_DIR/compose.yaml" ]; then
  echo "エラー: docker-compose.yml または compose.yaml が見つかりません。"
  echo "先に setup.sh を実行してください。"
  exit 1
fi

cd "$APP_DIR"

if [ ! -f "backend/vendor/bin/sail" ]; then
  echo "エラー: backend/vendor/bin/sail が見つかりません。"
  exit 1
fi

echo "================================"
echo "Sail コンテナの起動"
echo "================================"
echo ""

echo "[1/2] Docker Compose でコンテナを起動します (docker compose up -d)"
docker compose up -d

echo "[2/2] 起動後の初期化処理を確認します"

# APP_KEY が未設定の場合のみ生成
if ! grep -q '^APP_KEY=base64:' "$BACKEND_DIR/.env"; then
  echo "APP_KEY が未設定のため生成します..."
  if docker compose exec -T backend php artisan key:generate --force; then
    cp "$BACKEND_DIR/.env" "$APP_DIR/.env"
    echo "APP_KEY を生成し、$APP_DIR/.env に同期しました"
  else
    echo "警告: APP_KEY の生成に失敗しました。手動で実行してください:"
    echo "  docker compose exec -T backend php artisan key:generate --force"
  fi
else
  echo "APP_KEY は既に設定済みです。"
fi

# マイグレーション実行可否を確認（y の場合のみ実行）
read -p "マイグレーションを実行しますか？ (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "マイグレーションを実行します..."
  if ! docker compose exec -T backend php artisan migrate --force; then
    echo "警告: マイグレーションに失敗しました。ログを確認してください。"
  fi
else
  echo "マイグレーションはスキップしました。"
fi

# storage の権限/所有者が適切でない場合のみ補正
if [ -d "$BACKEND_DIR/storage" ]; then
  need_fix=0
  current_uid="$(stat -c %u "$BACKEND_DIR/storage")"
  current_gid="$(stat -c %g "$BACKEND_DIR/storage")"

  if [ "$current_uid" -ne "$(id -u)" ] || [ "$current_gid" -ne "$(id -g)" ]; then
    need_fix=1
  fi

  if [ ! -w "$BACKEND_DIR/storage" ]; then
    need_fix=1
  fi

  if [ "$need_fix" -eq 1 ]; then
    echo "storage の権限/所有者を補正します..."
    if ! chown -R "$(id -u):$(id -g)" "$BACKEND_DIR/storage" 2>/dev/null; then
      sudo chown -R "$(id -u):$(id -g)" "$BACKEND_DIR/storage" || true
    fi
    chmod -R ug+rwX "$BACKEND_DIR/storage" || true
  else
    echo "storage の権限/所有者は適切です。"
  fi

  # storage 配下はフォルダのみ管理し、生成ファイルは都度除外する
  echo "storage 配下の生成ファイルを整理します..."
  cleanup_dirs=(
    "$BACKEND_DIR/storage/framework/sessions"
    "$BACKEND_DIR/storage/framework/views"
    "$BACKEND_DIR/storage/framework/cache/data"
  )

  for cleanup_dir in "${cleanup_dirs[@]}"; do
    if [ -d "$cleanup_dir" ]; then
      find "$cleanup_dir" -type f ! -name '.gitignore' -delete || true
    fi
  done
fi

echo ""
echo "✓ 起動完了！"
echo ""
echo "確認:"
echo "  - バックエンド: http://localhost"
echo "  - フロントエンド: http://localhost:8000"
echo "  - ドキュメントサイト: http://localhost:3000"
echo "  - コンテナログ確認: cd \$PWD && docker compose logs -f"
echo "  - 停止: ./stop.sh"
echo "  - 再起動: ./restart.sh"
echo "  - ドキュメント生成: ./build_doc.sh"
echo ""
