import React from 'react';
import ErrorStatusPage from './ErrorStatusPage';

/**
 * 403 Forbidden の静的エラーページを描画する。
 * @returns 403エラーページコンポーネント
 */
export default function ForbiddenPage(): JSX.Element {
  return <ErrorStatusPage statusCode={403} summary="Forbidden" />;
}
