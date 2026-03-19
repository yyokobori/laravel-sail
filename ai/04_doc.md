# docs-site（ドキュメントサイト）構成・運用ガイド

## 1. 目的

* プロジェクトの自動生成・手動生成ドキュメントを一元管理し、DocusaurusでWeb公開する。
* TypeScript（フロントエンド）・PHP（バックエンド）のAPIドキュメントを自動生成し、統合的に参照可能とする。
* **docs-siteコンテナ単体でドキュメント生成・閲覧が完結する構成とする**

---

## 2. ディレクトリ構成（主要）

```
app/
├── backend/              # Laravel
├── frontend/             # React
│   ├── tsconfig.json
│   ├── tsconfig.doc.json # ★ ドキュメント用設定
│   └── src/
├── docs-site/
│   ├── api/              # ドキュメント生成APIサーバ
│   ├── blog/             # Docusaurusブログ
│   ├── docs/             # Docusaurusドキュメント
│   ├── scripts/          # ドキュメント生成スクリプト
│   ├── static/           # 静的ファイル（typedoc/phpdoc出力先）
│   ├── src/              # Docusaurusページ/コンポーネント
│   ├── Dockerfile
│   ├── docusaurus.config.js
│   ├── package.json
│   └── ...
```

---

## 3. 主な構成要素

### ■ Docusaurus

* ドキュメントWebサイトの静的サイトジェネレータ
* `static/` 配下のファイルは **ルートパスにマッピングされる**

例：

```
static/typedoc/index.html → /typedoc/
```

---

### ■ TypeDoc

* frontend（React）のAPIドキュメント生成
* `tsconfig.doc.json` を使用して**ドキュメント対象を制御**
* 出力先：

```
/app/docs-site/static/typedoc
```

---

### ■ phpDocumentor

* backend（Laravel）のAPIドキュメント生成
* 出力先：

```
/app/docs-site/static/phpdoc
```

※ Laravelの構成によっては警告が出るが、生成自体は成功するケースあり

---

### ■ Express API

* `/api/server.js` でドキュメント生成をAPI化
* フロント（Docusaurus）からHTTP経由で実行

エンドポイント：

```
POST http://localhost:4000/generate-docs
```

---

### ■ Docker

* docs-siteは独立コンテナ
* Node + PHP + Composer を同居させている
* backend / frontend を volume マウントして参照

---

## 4. 運用フロー

### 4.1 ドキュメント生成

1. http://localhost:3000 にアクセス
2. 「Generate Docs」ボタン押下
3. API経由で以下を実行

   * typedoc
   * phpdoc

出力先：

```
static/typedoc/
static/phpdoc/
```

---

### 4.2 サイト閲覧

```
http://localhost:3000/
```

* TypeDoc:

```
/typedoc/
```

* PHPDoc:

```
/phpdoc/
```

※ **/index.html は付けない（404になる）**

---

## 5. Docusaurus設定の重要ポイント

### ■ staticファイルへのリンク

❌ NG（SPAルーティングになる）

```js
{ to: '/typedoc/' }
```

⭕ OK（通常リンク）

```js
{ href: '/typedoc/' }
```

---

### ■ ナビゲーション設定例

```js
navbar: {
  title: 'My Docs',
  items: [
    { href: '/typedoc/', label: 'TypeDoc', position: 'right' },
    { href: '/phpdoc/', label: 'PHPDoc', position: 'right' },
  ],
},
```

---

## 6. TypeDoc設定

### ■ tsconfig.doc.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": [
    "src/component/**/*",
    "src/template/**/*"
  ],
  "exclude": [
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/main.tsx",
    "src/App.tsx"
  ]
}
```

---

### ■ ポイント

* 本番コードを変更せずドキュメント対象を制御
* index.ts（barrel export）不要
* Typedocは `--tsconfig` で明示指定する

---

## 7. Docker運用ポイント

* volume変更時は再起動必須

```
docker compose down
docker compose up
```

* restartでは反映されない

---

### ■ コンテナ内パス

| 種類        | パス               |
| --------- | ---------------- |
| frontend  | /app/frontend    |
| backend   | /var/www/backend |
| docs-site | /app/docs-site   |

---

## 8. よくあるトラブル

### ■ ① Typedocが出ない

原因：

* tsconfig未指定
* include不足

---

### ■ ② ナビゲーションから404

原因：

* `to` を使っている（SPAルーティング）

---

### ■ ③ URL直打ちだと見れる

原因：

* staticファイルはサーバー配信
* クリック時はReact Router

---

### ■ ④ phpdocエラー

例：

```
Cannot use Response because name is already in use
```

→ Laravelのuse衝突（基本無視可）

---

## 9. 今後の拡張案

* ドキュメント生成ログをUIに表示
* typedoc/phpdocの個別実行
* CI/CDで自動生成
* docs-site単体デプロイ

---

## 10. 補足

* 本構成は「ドキュメント生成環境の分離」を重視
* フロント/バックエンドの実装に影響を与えない設計

---

> 本ファイルはAI・開発者向けの構成ドキュメントです。
> 構成変更時は必ず更新してください。
