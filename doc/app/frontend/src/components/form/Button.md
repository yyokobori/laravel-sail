# Buttonコンポーネント仕様

## ■ 目的

汎用的に使用可能なUIボタンコンポーネントを実装する。
**ビジネスロジックや状態管理は一切持たず、純粋なUIコンポーネントとして設計する。**

---

## ■ 設計原則（最重要）

### 1. ロジックを持たない

* API通信を行わない
* 内部で状態管理をしない（useState禁止）
* onClickは受け取るのみ

```tsx
<Button onClick={handleClick} />
```

---

### 2. ローディングは外部制御

* Buttonはローディング状態を「管理しない」
* 表示のみ行う

```tsx
<Button loading={isLoading} />
```

#### 補足

* ローディングの開始・終了は呼び出し元が制御する
* Buttonは「ローディング状態を受け取って見た目を変えるだけ」

---

### 3. 再利用性最優先

* 特定用途に依存しない
* どの画面でも使用可能にする

---

## ■ Props仕様

```ts
type ButtonProps = {
  children?: React.ReactNode;

  // 見た目
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';

  // 状態（外部制御）
  loading?: boolean;
  disabled?: boolean;

  // レイアウト
  fullWidth?: boolean;

  // アイコン
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;

  // 視覚エフェクト
  blink?: 'once' | 'pulse' | false;

  // 拡張
  className?: string;

  // ネイティブ属性
  type?: 'button' | 'submit' | 'reset';

  // 要素切り替え
  as?: 'button' | 'a';
  href?: string;
};
```

---

## ■ デフォルト値

```ts
type = 'button'
variant = 'primary'
size = 'md'
blink = false
```

---

## ■ 挙動仕様

### 1. disabled制御

```ts
const isDisabled = disabled || loading;
```

* loading時はクリック不可
* disabled時もクリック不可

---

### 2. ローディング表示

* loading=true の場合：

  * クリック不可
  * ローディングUIを表示

#### 重要

* ローディングUIは外部コンポーネントを使用可能にする
* Button内部で固定実装しない（差し替え可能）

---

### 3. アイコン表示

* leftIcon → 前
* rightIcon → 後ろ

#### iconOnly=true の場合

* childrenは表示しない
* ボタンサイズは正方形に近づける

---

### 4. ブリンク（視覚強調）

#### blink = 'once'

* 一度だけ強調アニメーション

#### blink = 'pulse'

* 緩やかな繰り返し強調（短時間想定）

#### 実装

* CSSアニメーションで制御
* JSで状態管理しない

#### 注意

* 常時点滅は禁止（UX低下）

---

### 5. aタグ時

* disabled / loading の場合：

  * hrefを無効化
  * aria-disabled=true

---

### 6. アクセシビリティ

* focusリングを表示
* loading時：aria-busy=true

---

## ■ 禁止事項

* API通信の実装
* useStateの使用
* 業務ロジックの記述
* 特定画面依存の分岐

---

## ■ 設計思想

Buttonは処理を持たない

```tsx
<Button onClick={save} loading={isSaving} />
```

* save → 呼び出し元
* isSaving → 呼び出し元


---

## ■ 拡張前提

* IconButton
* ButtonGroup
* Spinner差し替え
* デザイントークン化

---

## ■ 一言で

「何もしないが、どこでも使えるボタン」
