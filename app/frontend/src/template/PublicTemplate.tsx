import React, { ReactNode } from 'react';
import './reset.css';
import './tailwind.css';

type PublicTemplateProps = {
  children: ReactNode;
};

/**
 * 公開画面向けテンプレートを描画する。
 * @param props 子要素
 * @returns 公開画面テンプレート
 */
export default function PublicTemplate(props: PublicTemplateProps): JSX.Element {
  return <>{props.children}</>;
}
