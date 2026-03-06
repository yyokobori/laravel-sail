# React 実装方針（AI引継ぎ用）

更新日: 2026-03-04

## 目的
- 今後のフロント実装におけるルールを統一し、AI実装時のブレを防ぐ。

## 確定要件（ユーザー指定）
- React は TypeScript を使用する。
- 関数には必ず doc 形式のコメントを記載する。

## 命名規約（確定）
- Reactコンポーネント名: PascalCase
- 変数名: camelCase
- 定数名: UPPER_SNAKE_CASE

## フォルダ構成方針
```
src/
  view/
      public/
      user/
      admin/
      errors/
   component/
      form/
      table/
      modal/
      ...
   template/
   api/
   types/
   hooks/
```

## 各フォルダの役割
- `view/`
   - 画面単位の構成と表示制御を担当する。
   - 区分は `public / user / admin / errors` とする。
   - 直接API通信は `api/` または `hooks/` を経由する。
- `component/`
   - 再利用UI部品を担当する。
   - `component/***/` 形式で配置し、`component/` 直下にファイルを置かない。
   - 詳細ルールは `ai/03.03_component.md` を参照する。
- `template/`
   - `public / user / admin` の共通レイアウト枠を担当する。
   - `reset.css` と `tailwind.css` の読み込み起点とする。
- `api/`
   - バックエンド通信処理を担当する。
   - API呼び出し実体はこの配下に集約する。
- `types/`
   - 共通型・API関連型・画面利用型を管理する。
- `hooks/`
   - 再利用可能な状態管理・副作用処理を担当する。

## 実装ルール（確定）
- TypeScript の型を省略しない（props, 戻り値, API レスポンス）。
- 関数コメントは JSDoc 形式を使用する。
- API 呼び出しは `src/api` に集約し、画面コンポーネントから直接 `fetch` しない。
- 認証境界（`public/user/admin`）のアクセス制御はルーティング層で実施する。

### コメント例
```ts
/**
 * ログイン済みユーザー情報を取得する。
 * @returns ユーザー情報
 */
export async function fetchCurrentUser(): Promise<User> {
  // ...
}
```

## ルーティング方針（確定）
- ルーティングは React Router を採用する。

## URL規約（確定版: 2026-03-04）

### 基本方針
- URLは `kebab-case` を使用する。
- 区分は `public` / `user` / `admin` の3系統とする。
- 認証・権限制御はルーティング層で実施する。

### ルート構造
- Public（ログイン不要）: `/`
- Public配下: `/{resource}`
- User配下: `/user/{resource}`
- Admin配下: `/admin/{resource}`

### CRUDパターン（共通）
- TOP: `/{scope}/{resource}/`
- 一覧: `/{scope}/{resource}/list`
- 詳細: `/{scope}/{resource}/detail/{id}`
- 新規作成: `/{scope}/{resource}/edit`
- 編集: `/{scope}/{resource}/edit/{id}`

注記:
- `{scope}` は `user` または `admin`。
- `public` は scope なし（例: `/news`, `/help`）。
- `resource` は `kebab-case` で定義する（例: `user-profile`, `order-history`）。

### errors画面の方針
- 権限不足を含むエラー画面は `view/errors` 配下で管理する。
- エラー画面は静的表示コンテンツを返す構造とする。
- 代表例: `forbidden`, `not-found`, `server-error`。

### errors画面の実装テンプレート（確定）
```text
src/view/errors/
├── ErrorStatusPage.tsx
├── ErrorStatusPage.css
├── ForbiddenPage.tsx
├── NotFoundPage.tsx
├── ServerErrorPage.tsx
└── index.ts
```

- 表示内容は以下の2要素のみとする。
   - 大きめのステータスコード（例: `404`）
   - ステータス概要テキスト（例: `Not Found`）
- 画面背景は白（`#ffffff`）とする。

### 初期ルート実装（2026-03-04）
- ルート先は `App.tsx` で template 適用し、errors は実装ファイルを使用する。
- 定義済みルート:
   - `/`
   - `/login`
   - `/user/dashboard`
   - `/admin/dashboard`
   - `/errors/forbidden`
   - `/errors/not-found`
   - `/errors/server-error`
   - `*`

## 現在の想定ツリー（2026-03-04時点）
```text
src/
├── main.tsx
├── App.tsx
├── api/
│   └── .gitkeep
├── types/
│   └── .gitkeep
├── component/
│   └── .gitkeep
├── template/
│   ├── PublicTemplate.tsx
│   ├── UserTemplate.tsx
│   ├── AdminTemplate.tsx
│   ├── reset.css
│   └── tailwind.css
└── view/
    ├── public/
    │   └── .gitkeep
    ├── user/
    │   └── .gitkeep
    ├── admin/
    │   └── .gitkeep
    └── errors/
        ├── ErrorStatusPage.tsx
        ├── ErrorStatusPage.css
        ├── ForbiddenPage.tsx
        ├── NotFoundPage.tsx
        ├── ServerErrorPage.tsx
        └── index.ts
```

## 配置ファイルの概要
- `src/main.tsx`
   - React アプリのエントリーポイント。
   - `#root` にアプリをマウントし、初期描画を開始する。
- `src/App.tsx`
   - ルート定義の受け口コンポーネント。
- `src/view/public/`
   - 未ログインで閲覧可能な画面群を配置する。
- `src/view/user/`
   - 一般ユーザー向けログイン後画面を配置する。
- `src/view/admin/`
   - 管理者向け画面を配置する。
- `src/view/errors/`
   - エラー画面実装を配置する。
   - ステータスコードと概要のみ表示する。
- `src/component/`
   - 共通利用する再利用コンポーネントを配置する。
- `src/api/`
   - API クライアント・通信処理を配置する。
   - 画面側が直接 `fetch` を持たないよう責務分離する。
- `src/types/`
   - API レスポンス、DTO、画面モデルなどの型定義を配置する。
- `src/template/`
   - `public/user/admin` のテンプレートを配置する。
   - 各テンプレートで `reset.css` と `tailwind.css` を読み込む。

## 運用ルール（コンテナ操作）
- コンテナの起動・停止・再起動・初期化は、必ず `sh` 配下スクリプトを使用する。
   - 起動: `./sh/start.sh`
   - 停止: `./sh/stop.sh`
   - 再起動: `./sh/restart.sh`
   - 初期セットアップ: `./sh/setup.sh`

## 運用ルール（React関連コマンド）
- React 関連のコマンド実行は、直接 `docker compose` や `npm` を叩かず、必ず `sh/react.sh` を使用する。

### 追加スクリプト
- `./sh/react.sh`
   - React(frontend) 関連コマンドの実行を一元化する。

### 利用コマンド
- `./sh/react.sh build`
   - `frontend` コンテナで `npm run build` を実行する。
- `./sh/react.sh logs`
   - `frontend` コンテナのログを follow 表示する。

## Tailwind + reset セットアップ（2026-03-04）

### 導入方針
- スタイリングは Tailwind を採用する。
- `reset.css` はテンプレートで読み込む。

### 追加設定ファイル
- `app/frontend/tailwind.config.js`
- `app/frontend/postcss.config.js`

### 追加テンプレート
- `src/template/PublicTemplate.tsx`
- `src/template/UserTemplate.tsx`
- `src/template/AdminTemplate.tsx`

補足:
- 各テンプレートで `reset.css` と `tailwind.css` を読み込む。

### 追加スタイル
- `src/template/reset.css`
- `src/template/tailwind.css`

### ルーティングへの適用
- `App.tsx` で `public/user/admin` 各ルートを対応するテンプレートでラップする。
- errors ルートも `PublicTemplate` でラップする。

### セットアップコマンド（React用）
- React パッケージの追加/更新が必要な場合は、`react.sh` ではなくセットアップ手順として別途実施する。

## 非採用（現時点）
- Sass は採用しない。
- 理由: 依存増加を避け、テンプレートの汎用性と保守性を優先するため。

## 関連仕様
- role管理: `ai/04_role.md`
- 認証フロー: `ai/04.01_auth.md`
- Config管理: `ai/03.06_config.md`