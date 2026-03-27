# ドキュメントサイト（docs-site）運用・生成手順

このディレクトリは、プロジェクトの自動生成・手動生成ドキュメントを管理します。

## 必須: 事前準備
- WSL/ローカル環境にnpm（Node.js）がインストールされている必要があります。
  - Ubuntu例: `sudo apt install -y nodejs npm`
- PHP/Laravel側はcomposerが必要です。

## 1. ドキュメント自動生成
- すべてのドキュメント生成は `./sh/generate_docs.sh` で一括実行できます。
  ```sh
  ./sh/generate_docs.sh
  ```
- 個別生成も可能:
  ```sh
  ./sh/generate_docs.sh frontend   # TypeScriptのみ
  ./sh/generate_docs.sh backend    # PHPのみ
  ```
- 生成物は `docs-site/static/typedoc`, `docs-site/static/phpdoc` 配下に出力されます。
- Docusaurus起動後、下記URLで直接閲覧できます：
  - [TypeDoc](/typedoc/index.html)
  - [PHPDoc](/phpdoc/index.html)

## 2. 静的サイトジェネレータ（Docusaurus等）
- 必要に応じて `docs-site` 配下で `npm install` や `npm run build` などを実行してください。
  ```sh
  cd app/docs-site
  npm install
  npm run build
  npm run serve
  ```

---

- 生成手順・ツールの詳細はこのREADMEを参照してください。
- 追加のドキュメント生成ツールを導入する場合もここに追記してください。
