#!/usr/bin/env bash
# sail_up.sh - Laravel Sail エイリアス設定スクリプト
#
# 使用方法:
#   source ./sh/sail_up.sh
#
# その後、以下のように sail コマンドで Sail が実行できます:
#   sail artisan key:generate
#   sail up -d
#   sail down

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
APP_DIR="$PROJECT_ROOT/app"
SAIL_BIN="$APP_DIR/vendor/bin/sail"

# sail 関数を定義（エイリアスより柔軟）
sail() {
  if [ ! -f "$SAIL_BIN" ]; then
    echo "エラー: Laravel Sail が見つかりません。"
    echo "先に ./sh/setup.sh を実行してください。"
    return 1
  fi
  
  # app ディレクトリで sail を実行（サブシェルで実行して CWD を変更しない）
  (cd "$APP_DIR" && ./vendor/bin/sail "$@")
}

echo "✓ Sail エイリアスを設定しました。"
echo "  使用例: sail artisan key:generate"
echo "  使用例: sail up -d"
echo ""
echo "ご注意:"
echo "  - このコマンドはスクリプトの source で設定されます。"
echo "  - 別のターミナルを開いた場合は、再度このスクリプトを source してください。"
echo "  - 永続的に使用したい場合は、~/.bashrc に以下を追加してください:"
echo ""
echo "    source $PROJECT_ROOT/sh/sail_up.sh"
echo ""
