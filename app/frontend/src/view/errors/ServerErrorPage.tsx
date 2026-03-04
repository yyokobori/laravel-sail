import React from 'react';
import ErrorStatusPage from './ErrorStatusPage';

/**
 * 500 Server Error の静的エラーページを描画する。
 * @returns 500エラーページコンポーネント
 */
export default function ServerErrorPage(): JSX.Element {
  return <ErrorStatusPage statusCode={500} summary="Server Error" />;
}
