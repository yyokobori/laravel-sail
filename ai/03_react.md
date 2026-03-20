# React 実装方針（AI引継ぎ用・TypeDoc対応版）

更新日: 2026-03-19

---

## 1. 目的

* フロント実装ルールを統一し、AI実装時のブレを防ぐ
* TypeDocにより**コードからドキュメントを自動生成可能にする**
* 実装とドキュメントの乖離を防ぐ

---

## 2. 確定要件（ユーザー指定）

* React は TypeScript を使用する
* 関数・コンポーネントには必ず **JSDocコメント** を記載する

---

## 3. 命名規約（変更なし）

* Reactコンポーネント名: PascalCase
* 変数名: camelCase
* 定数名: UPPER_SNAKE_CASE

---

## 4. フォルダ構成方針（変更なし）

```id="mttb7u"
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
   template/
   api/
   types/
   hooks/
```

---

## 5. 各フォルダの役割（変更なし）

※既存内容を維持

---

## 6. 実装ルール（更新あり）

### ■ 6.1 型定義（強化）

* **Propsは必ずexportする**

```ts id="3t49mc"
// ❌ NG
type InputProps = { value: string };

// ⭕ OK
export type InputProps = { value: string };
```

---

### ■ 6.2 コンポーネント定義

* **named exportを使用する（default exportは禁止）**

```ts id="y3t3xm"
// ❌ NG
export default function Input() {}

// ⭕ OK
export const Input = () => {};
```

---

### ■ 6.3 型の省略禁止（既存ルール強化）

* props
* 戻り値
* APIレスポンス

👉 すべて明示する

---

### ■ 6.4 API呼び出し（変更なし）

* `src/api` に集約
* view/componentから直接fetchしない

---

### ■ 6.5 importルール（変更なし）

```ts id="48j9z4"
import { Input } from "@/component/form";
```

* `@` エイリアス使用
* 相対パス禁止

---

## 7. コメント規約（重要強化）

### ■ 7.1 コンポーネント

```ts id="3m9eqp"
/**
 * 入力フィールドコンポーネント
 *
 * @param props 入力値とイベントハンドラ
 */
export const Input = (props: InputProps) => {
  ...
};
```

---

### ■ 7.2 Props

```ts id="yqyr3r"
export type InputProps = {
  /** 入力値 */
  value: string;

  /** 変更イベント */
  onChange: (value: string) => void;
};
```

---

### ■ 7.3 関数

```ts id="p6o1e3"
/**
 * ユーザー情報を取得する
 * @returns ユーザー情報
 */
export async function fetchUser(): Promise<User> {
  ...
}
```

---

## 8. TypeDoc対応ルール（新規）

### ■ 8.1 ドキュメント対象

* `component/`
* `template/`

👉 `view/` は対象外（tsconfig.doc.jsonで制御）

---

### ■ 8.2 非公開コード

```ts id="3a9v3b"
/**
 * @internal
 */
export const debugHelper = () => {};
```

👉 TypeDocから除外

---

### ■ 8.3 コメント必須レベル

| 対象      | 必須 |
| ------- | -- |
| コンポーネント | 必須 |
| Props   | 必須 |
| API関数   | 必須 |
| hooks   | 推奨 |

---

## 9. ルーティング方針（変更なし）

※既存内容を維持

---

## 10. URL規約（変更なし）

※既存内容を維持

---

## 11. エラー画面（変更なし）

※既存内容を維持

---

## 12. 運用ルール（変更なし）

※既存内容を維持

---

## 13. AIへの指示テンプレ（重要）

AIにコード生成させる際は必ず以下を付与：

```text id="8yl3px"
- すべてのコンポーネントは named export にすること
- Props型は export type で定義すること
- すべてのPropsにJSDocコメントを書くこと
- コンポーネントにJSDocコメントを書くこと
- 関数には説明コメントを付けること
- 型を省略しないこと
- default exportは禁止
- API呼び出しはsrc/api経由にすること
- importは@エイリアスを使うこと
```

---

## 14. 本プロジェクト特有ルール（更新）

* tsconfig.doc.json によりドキュメント対象を制御
* index.ts による export制御は不要
* docs-siteでドキュメント生成を一元管理

---

## 15. ゴール

* TypeDoc単体で仕様書として読める状態を作る
* AIが生成したコードでもそのままドキュメント化できる
* コード＝ドキュメントの状態を維持する

## 7. コメント規約（最重要・日本語必須）

### ■ 7.0 共通ルール（新規）

* **すべてのJSDocコメントは日本語で記述すること**
* 英語コメントは禁止
* 単語のみのコメントは禁止（例: `/** value */`）
* **仕様書として読める文章で書くこと**

---

### ■ NGパターン（禁止）

```ts
/** value */
value: string;
```

```ts
/** input value */
value: string;
```

```ts
/** ボタン */
onClick: () => void;
```

👉 意味が不十分・仕様として読めない

---

### ■ OKパターン

```ts
/** 入力フィールドの現在値 */
value: string;

/** ボタン押下時に呼び出されるイベントハンドラ */
onClick: () => void;
```

---

### ■ 補足

* 「何のための値か」を必ず書く
* UI上の役割・用途を明示する
* 第三者が見て意味が分かる文章にする

---

## 7.2 Props（最重要・強化版）

* **すべてのPropsフィールドに日本語JSDocコメントを必ず記載する**
* 1つでも欠けている場合は不正実装とする

---

## 13. AIへの指示テンプレ（最終強化版）

```text
- すべてのコンポーネントは named export にすること
- Props型は export type で定義すること

【最重要】
- PropsのすべてのフィールドにJSDocコメントを書くこと
- 1つでもコメントが欠けていたら不正とみなす

【日本語必須】
- すべてのコメントは日本語で書くこと
- 英語コメントは禁止
- 「value」など単語のみのコメントは禁止
- UIとしての意味・用途が分かる文章にすること

- コンポーネントにJSDocコメントを書くこと
- 関数には説明コメントを付けること
- 型を省略しないこと
- default exportは禁止
- API呼び出しはsrc/api経由にすること
- importは@エイリアスを使うこと
```
