# React コンポーネントスタイル仕様（styleClassesベース）

## 目的

* コンポーネントの見た目を外部から柔軟に制御する
* デフォルトスタイルと拡張スタイルを分離する
* AI実装時のスタイル固定化を防ぐ
* 要素単位でのスタイル上書きを可能にする

---

## 基本方針（最重要）

* すべてのコンポーネントは `styleClasses` を受け取る
* スタイルは要素単位で分割する
* デフォルトスタイルを持ちつつ、必ず上書き可能にする
* className単体ではなく、構造化されたスタイル指定を使用する

---

## styleClasses構造

### 方針

* コンポーネント内部の各要素ごとにクラスを定義する
* フラットな className は使用しない
* コンポーネントに引数としてクラスを渡す場合は関数定義のコメントに従う

---

### 例（Checkboxの場合）

styleClasses?: {
container?: string
label?: string
checkbox?: string
optionLabel?: string
errorMessage?: string
}

---

## 実装ルール

### クラス適用方法

* デフォルトクラスと styleClasses を結合する

---

### 実装例

const containerClass = `  flex items-center gap-2
  ${styleClasses?.container ?? ''}`;

---

## 命名ルール

* 要素名ベースで命名する
* 意味が曖昧な名前は禁止

---

### OK

* container
* label
* input
* errorMessage

---

### NG

* style
* custom
* class1

---

## 優先順位

1. デフォルトスタイル
2. styleClasses（上書き）

---

## ルール

* デフォルトスタイルは最小限にする
* レイアウト崩壊しない範囲に限定する
* 色・サイズは外部から変更可能にする

---

## 状態スタイル

### 方針

* status による分岐はコンポーネント内で制御する
* styleClassesで上書き可能にする

---

### 例

const errorClass = status === 'error'
? 'border-red-500'
: '';

---

## Tailwindルール適用

* Tailwind クラスのみ使用
* px指定禁止（remベース）
* 任意値 [] の乱用禁止
* カラーは定義済みトークンを使用

---

## 禁止事項

* className のみでスタイル制御する
* styleClasses を無視する
* スタイルを完全固定する
* コンポーネント内で過剰なスタイル分岐
* 要素構造と無関係なスタイル定義

---

## AI向け実装指針

* 必ず styleClasses を定義する
* 各要素ごとに class を分割する
* デフォルトスタイルと結合する
* 上書き可能な設計にする
* className 単体ではなく styleClasses を優先する

---

## 変更時チェック（必須）

* [ ] styleClasses が定義されている
* [ ] 要素単位でクラス分割されている
* [ ] デフォルトスタイルと結合されている
* [ ] 外部からスタイル変更可能
* [ ] Tailwindルールに準拠している

---
