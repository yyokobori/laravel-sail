import React from 'react';

type LabelProps = {
  htmlFor: string;
  text: string;
  className?: string;
  required?: boolean;
};

/**
 * 入力欄用のラベルを描画する。
 * @param props ラベル表示情報
 * @returns ラベルコンポーネント
 */
export function Label(props: LabelProps): JSX.Element {
  const {
    htmlFor, // 対応するinput要素のid
    text, // ラベルとして表示する文言
    className, // ラベルへ適用するスタイルクラス
    required = false, // 必須項目かどうか
  } = props;

  return (
    <label htmlFor={htmlFor} className={className}>
      {text}
      {required ? (
        <span style={{ color: '#dc2626', marginLeft: '0.25rem' }}>*</span>
      ) : null}
    </label>
  );
}
