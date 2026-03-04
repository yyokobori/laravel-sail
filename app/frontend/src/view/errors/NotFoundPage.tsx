import React from 'react';
import ErrorStatusPage from './ErrorStatusPage';

/**
 * 404 Not Found の静的エラーページを描画する。
 * @returns 404エラーページコンポーネント
 */
export default function NotFoundPage(): JSX.Element {
  return <ErrorStatusPage statusCode={404} summary="Not Found" />;
}
