# OpenAPI YAML 作成ガイド（最終版 / AIエージェント用）

---

## 目的

本プロジェクトでは、OpenAPI（Swagger）を唯一のAPI仕様として扱う。
AIエージェントは、このルールに従ってYAMLを作成すること。

---

## ディレクトリ構成

```plaintext
app/
├── openapi/
│   └── openapi.yaml
├── sh/
│   ├── start.sh
│   └── restart.sh
```

---

## Swagger環境

```bash
sh/sh/start.sh
```

```bash
sh/sh/restart.sh
```

---

## 基本方針

* OpenAPIを唯一の真実とする
* モックファースト
* フロントエンド先行開発前提
* 人間が読んで理解できる仕様にする

---

## YAML記述ルール

### 必須項目

* openapi
* info
* servers
* paths
* description（全スキーマ・全プロパティに必須）
* operationId（全スキーマ・全プロパティに必須）

---

### servers

```yaml
servers:
  - url: http://localhost:4010
```

---

### description（必須）

すべてのAPIおよびパラメータに記述すること

```yaml
description: ユーザー一覧を取得するAPI
```

---

## レスポンス仕様

すべてのレスポンスは以下の形式で統一すること

```yaml
example:
  status: 200
  data:
    content: []
```

---

### 単体レスポンス

```yaml
example:
  status: 200
  data:
    content:
      id: 1
      name: "テスト"
```

---

### 配列レスポンス

```yaml
example:
  status: 200
  data:
    content:
      - id: 1
        name: "テスト1"
      - id: 2
        name: "テスト2"
```

---

### ページネーション

```yaml
example:
  status: 200
  data:
    content: []
    meta:
      currentPage: 1
      perPage: 10
      total: 0
```

---

### 削除レスポンス

```yaml
example:
  status: 204
```

---

## エラー仕様

### 共通エラー

```yaml
example:
  status: 500
  message: "エラーが発生しました"
```

---

### バリデーションエラー（422）

* errors直下は項目名とする
* 各項目は配列で複数メッセージを持つ

```yaml
example:
  status: 422
  message: "入力内容に誤りがあります"
  errors:
    name:
      - "名前は必須です"
      - "名前は50文字以内です"
    email:
      - "メール形式が不正です"
```

---

## requestBody（必須）

必ずexampleを記載すること

```yaml
requestBody:
  required: true
  content:
    application/json:
      example:
        name: "テストユーザー"
        email: "test@example.com"
```

---

## データ設計ルール

* idはinteger固定
* 主キーは必ずid
* enumは必ず明示する
* contentは以下のいずれかに統一する

  * 配列
  * オブジェクト
* 空配列は必ず [] を返す（null禁止）

---

## 日付フォーマット

```plaintext
形式: yyyy-MM-dd HH:mm:ss
タイムゾーン: JST固定
```

---

## CRUD設計

```plaintext
GET    /resources
GET    /resources/{id}
POST   /resources
PUT    /resources/{id}
DELETE /resources/{id}
```

---

## 禁止事項

* example未定義
* description未記載
* operationId未定義
* nullレスポンス
* 型未定義
* 命名ルール違反

---

## 命名ルール

| 対象          | 形式         |
| ----------- | ---------- |
| JSON        | camelCase  |
| operationId | camelCase  |
| schema名     | PascalCase |

---

## シェル

```bash
# start.sh
docker compose up -d swagger-mock swagger-ui
```

```bash
# restart.sh
docker compose down
docker compose up -d swagger-mock swagger-ui
```

---

## ゴール

* Swagger UIで確認できる
* モックAPIが返る
* フロントエンドがこのAPIで実装可能
* 人間が読んで理解できる

---

## サンプル（paths以下フル）

```yaml
paths:
  /users:
    get:
      summary: ユーザー一覧取得
      description: 登録されているユーザーの一覧をページネーション形式で取得する
      operationId: getUsers
      responses:
        '200':
          description: 成功
          content:
            application/json:
              example:
                status: 200
                data:
                  content:
                    - id: 1
                      name: "山田 太郎"
                      email: "taro@example.com"
                      statusType: "active"
                      createdAt: "2026-01-01 12:00:00"
                  meta:
                    currentPage: 1
                    perPage: 10
                    total: 1

  /users/{id}:
    get:
      summary: ユーザー詳細取得
      description: 指定したIDのユーザー情報を取得する
      operationId: getUser
      parameters:
        - name: id
          in: path
          required: true
          description: ユーザーID
          schema:
            type: integer
      responses:
        '200':
          description: 成功
          content:
            application/json:
              example:
                status: 200
                data:
                  content:
                    id: 1
                    name: "山田 太郎"
                    email: "taro@example.com"
                    statusType: "active"
                    createdAt: "2026-01-01 12:00:00"

    put:
      summary: ユーザー更新
      description: 指定したユーザー情報を更新する
      operationId: updateUser
      parameters:
        - name: id
          in: path
          required: true
          description: ユーザーID
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            example:
              name: "更新ユーザー"
              email: "updated@example.com"
      responses:
        '200':
          description: 更新成功
          content:
            application/json:
              example:
                status: 200
                data:
                  content:
                    id: 1
                    name: "更新ユーザー"
                    email: "updated@example.com"

    delete:
      summary: ユーザー削除
      description: 指定したユーザーを削除する
      operationId: deleteUser
      parameters:
        - name: id
          in: path
          required: true
          description: ユーザーID
          schema:
            type: integer
      responses:
        '204':
          description: 削除成功
          content:
            application/json:
              example:
                status: 204

  /users:
    post:
      summary: ユーザー作成
      description: 新規ユーザーを作成する
      operationId: createUser
      requestBody:
        required: true
        content:
          application/json:
            example:
              name: "新規ユーザー"
              email: "new@example.com"
      responses:
        '201':
          description: 作成成功
          content:
            application/json:
              example:
                status: 201
                data:
                  content:
                    id: 2
                    name: "新規ユーザー"
                    email: "new@example.com"
```
