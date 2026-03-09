import React, { type ChangeEvent } from 'react';
import type { RadioProps } from './types';

/**
 * ラジオボタングループのテンプレートを描画する。
 * @param props ラジオボタンの表示・値・変更ハンドラ
 * @returns ラジオボタンコンポーネント
 */
export function Radio(props: RadioProps): JSX.Element {
  const {
    name, // radio要素のname属性に使用する識別子
    value, // 現在選択されている値
    options, // ラジオボタンの選択肢配列
    label, // ラジオボタングループのラベル文言（未指定時は非表示）
    status = 'default', // 表示状態（default/error）
    errorMessage, // エラー時に表示するメッセージ
    showErrorMessage = true, // エラーメッセージをコンポーネント内に表示するかどうか
    required = false, // 必須項目かどうか（ラベルに*を表示）
    styleClasses, // 要素別に適用するスタイルクラス群
    onValueChange, // 値変更時に呼び出すコールバック
  } = props;

  /**
   * ラジオボタン変更時に親へ値を通知する。
   * @param event 変更イベント
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onValueChange(event.target.value);
  }

  return (
    <div className={styleClasses?.container}>
      {label !== undefined ? (
        <label className={styleClasses?.label}>
          {label}
          {required ? (
            <span style={{ color: '#dc2626', marginLeft: '0.25rem' }}>*</span>
          ) : null}
        </label>
      ) : null}
      <div>
        {options.map((option) => (
          <div key={option.value} className={styleClasses?.optionWrapper}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              aria-invalid={status === 'error'}
              aria-describedby={
                status === 'error' && errorMessage !== undefined && showErrorMessage
                  ? `${name}-error`
                  : undefined
              }
              className={styleClasses?.radio}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={styleClasses?.optionLabel}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {status === 'error' && errorMessage !== undefined && showErrorMessage ? (
        <p id={`${name}-error`} role="alert" className={styleClasses?.errorMessage}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
