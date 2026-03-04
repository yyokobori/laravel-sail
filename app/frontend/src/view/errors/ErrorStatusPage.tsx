import React from 'react';
import './ErrorStatusPage.css';

type ErrorStatusPageProps = {
  statusCode: number;
  summary: string;
};

/**
 * ステータスコードと概要のみを表示する静的エラーページを描画する。
 * @param props 表示するステータスコードと概要
 * @returns エラーページコンポーネント
 */
export default function ErrorStatusPage(props: ErrorStatusPageProps): JSX.Element {
  return (
    <main className="errorStatusPage">
      <h1 className="errorStatusPage__code">{props.statusCode}</h1>
      <p className="errorStatusPage__summary">{props.summary}</p>
    </main>
  );
}
