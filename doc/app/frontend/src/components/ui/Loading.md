# Loadingコンポーネント仕様（AI実装用）

## ■ 目的

アプリ全体で共通利用可能なローディングUIを提供する。
**状態は持たず、純粋に表示のみを担当する。**

---

## ■ 設計原則

### 1. 完全プレゼンテーション

* 状態管理しない
* 表示のみ

---

### 2. 再利用性

* ボタン・画面・モーダルなど全てで使用可能

---

## ■ Props仕様

```ts
type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots';
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
};
```

---

## ■ デフォルト値

```ts
size = 'md'
variant = 'spinner'
fullScreen = false
overlay = false
```

---

## ■ 挙動仕様

### 1. 表示バリエーション

#### spinner

* 回転アニメーション

#### dots

* 点が順番に点滅

---

### 2. サイズ

* sm → ボタン内想定
* md → コンポーネント内
* lg → 画面中央

---

### 3. fullScreen

* 画面中央に配置
* flex + center

---

### 4. overlay

* 半透明背景を表示
* 背面操作をブロック

---

## ■ 使用例

```tsx
<Loading />

<Loading size="sm" />

<Loading fullScreen overlay />
```

---

## ■ Buttonとの連携

```tsx
<Button loading>
  <Loading size="sm" />
</Button>
```

Button内部でも使用可能にする

---

## ■ 禁止事項

* API通信
* useState
* 外部依存ロジック

---

## ■ 拡張前提

* Skeleton
* ProgressBar
* カスタムローダー差し替え

---

## ■ 一言で

「状態を持たないローディング表示専用UI」
