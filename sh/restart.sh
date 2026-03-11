#!/usr/bin/env bash
set -euo pipefail

# restart.sh - stop.sh → start.sh を順に実行

"$(cd "$(dirname "$0")" && pwd)/stop.sh"
"$(cd "$(dirname "$0")" && pwd)/start.sh"
