import React, { ReactNode } from 'react';
import './reset.css';
import './tailwind.css';

type AdminTemplateProps = {
  children: ReactNode;
};

/**
 * 管理画面向けテンプレートを描画する。
 * @param props 子要素
 * @returns 管理画面テンプレート
 */
export default function AdminTemplate(props: AdminTemplateProps): JSX.Element {
  return <>{props.children}</>;
}
