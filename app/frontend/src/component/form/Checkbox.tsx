import React, { type ChangeEvent } from 'react';
import { Label } from './Label';
import type { CheckboxProps } from './types';

const DEFAULT_CHECK_ICON_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 12.5 9.2 17.5 20 6.5' fill='none' stroke='black' stroke-width='4.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

/**
 * チェックボックスコンポーネントを描画する。
 * @param props チェックボックスの表示・値・変更ハンドラ
 * @returns チェックボックスコンポーネント
 */
export function Checkbox(props: CheckboxProps): JSX.Element {
  const {
    name, // checkbox要素のname/idに使用する識別子
    checked, // チェック状態
    label, // チェックボックス全体のラベル（未指定時は非表示）
    optionLabel, // チェック項目のラベル
    status = 'default', // 表示状態（default/error）
    errorMessage, // エラー時に表示するメッセージ
    showErrorMessage = true, // エラーメッセージをコンポーネント内に表示するかどうか
    required = false, // 必須項目かどうか（ラベルに*を表示）
    checkIconSrc, // チェックマークに使用するSVG画像URL
    checkMarkColor = '#000000', // チェックマークの色
    styleClasses, // 要素別に適用するスタイルクラス群
    onCheckedChange, // チェック状態変更時に呼び出すコールバック
  } = props;

  const checkIcon = checkIconSrc ?? DEFAULT_CHECK_ICON_SVG;

  /**
   * チェック状態変更時に親へ値を通知する。
   * @param event 変更イベント
   */
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onCheckedChange(event.target.checked);
  }

  return (
    <div className={styleClasses?.container}>
      {label !== undefined ? (
        <Label htmlFor={name} text={label} className={styleClasses?.label} required={required} />
      ) : null}

      <label htmlFor={name} className={styleClasses?.optionWrapper}>
        <span className={styleClasses?.checkboxWrapper}>
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            aria-invalid={status === 'error'}
            aria-describedby={
              status === 'error' && errorMessage !== undefined && showErrorMessage
                ? `${name}-error`
                : undefined
            }
            className={styleClasses?.checkboxInput}
          />
          <span
            className={styleClasses?.checkboxBox}
            style={status === 'default' ? { borderColor: '#9ca3af' } : undefined}
          />
          {checked ? (
            <span
              className={styleClasses?.checkMark}
              style={{
                backgroundColor: checkMarkColor,
                WebkitMaskImage: `url("${checkIcon}")`,
                maskImage: `url("${checkIcon}")`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          ) : null}
        </span>
        <span className={styleClasses?.optionLabel}>{optionLabel}</span>
      </label>

      {status === 'error' && errorMessage !== undefined && showErrorMessage ? (
        <p id={`${name}-error`} role="alert" className={styleClasses?.errorMessage}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
