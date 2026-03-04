import React, { ReactNode } from 'react';
import './reset.css';
import './tailwind.css';

type UserTemplateProps = {
  children: ReactNode;
};

/**
 * ユーザー画面向けテンプレートを描画する。
 * @param props 子要素
 * @returns ユーザー画面テンプレート
 */
export default function UserTemplate(props: UserTemplateProps): JSX.Element {
  return <>{props.children}</>;
}
