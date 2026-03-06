# role管理仕様

更新日: 2026-03-06

## 前提
- 本仕様では、`laravel(backend)` と `react(frontend)` の責務を分離して定義する。

## role定義
- roleは以下の2種で管理する。
  - `User`
  - `Admin`

## 用語（認証系）
- 未認証: セッション未確立、または有効期限切れの状態。
- 権限不足: 認証済みだが要求リソースへのアクセス権がない状態。
- セッションタイムアウト: 認証済み操作中にセッションが失効し、`401` が返る状態。

## laravel(backend) 側
- 権限管理は Laravel の標準機能に準拠して実装する。
  - 認証: Laravel標準認証機構
  - 認可: Gate / Policy / Middleware など標準機能
- APIアクセス可否の最終判定は `laravel(backend)` が行う。
- `react(frontend)` から渡される role値は信頼しない。
- 権限不足時は適切なHTTPステータス（例: 403）を返す。

## react(frontend) 側
- `laravel(backend)` が返す認証・認可結果に従って画面遷移/表示制御を行う。
- roleに基づく制御はUX目的の事前ガードに限定し、最終判定は行わない。
- 権限エラー表示のデザインとタイミングは利用先アプリ仕様に準拠する。

## デグレ防止
- role定義の変更は破壊的変更として扱う。
- role変更時は `laravel(backend)` と `react(frontend)` を同時に更新する。
