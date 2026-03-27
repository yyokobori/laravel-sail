import React, { type ChangeEvent } from 'react';
import type { RadioProps } from './types';

const DEFAULT_RADIO_MARK_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='7' fill='black'/%3E%3C/svg%3E";

/**
 * ラジオボタングループのテンプレートを描画する。
 * @param props ラジオボタンの表示・値・変更ハンドラ
 *   @property name input要素のname属性に使う識別子
 *   @property value 選択中の値
 *   @property options 選択肢リスト
 *   @property label ラベル文言（未指定時は非表示）
 *   @property status 表示状態（default/error）
 *   @property errorMessage エラー時に表示するメッセージ
 *   @property showErrorMessage エラーメッセージを表示するか
 *   @property required 必須項目かどうか
 *   @property radioIconSrc ラジオマークのSVG画像URL
 *   @property radioMarkColor ラジオマークの色
 *   @property styleClasses スタイルクラス指定
 *   @property onValueChange 値変更時のコールバック
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
    radioIconSrc, // ラジオボタンの中マークに使用するSVG画像URL
    radioMarkColor = '#000000', // ラジオボタン中マークの色
    styleClasses, // 要素別に適用するスタイルクラス群
    onValueChange, // 値変更時に呼び出すコールバック
  } = props;

  const radioMarkIcon = radioIconSrc ?? DEFAULT_RADIO_MARK_SVG;

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
            <label htmlFor={`${name}-${option.value}`} className={styleClasses?.radioWrapper}>
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                style={{
                  borderColor:
                    status === 'error'
                      ? '#ef4444'
                      : status === 'default'
                        ? '#9ca3af'
                        : '#22c55e',
                }}
                aria-invalid={status === 'error'}
                aria-describedby={
                  status === 'error' && errorMessage !== undefined && showErrorMessage
                    ? `${name}-error`
                    : undefined
                }
                className={styleClasses?.radioInput}
              />
              <span
                className={styleClasses?.radioCircle}
                style={{
                  borderColor:
                    status === 'error'
                      ? '#ef4444'
                      : status === 'default'
                        ? '#9ca3af'
                        : '#22c55e',
                }}
              />
              {value === option.value ? (
                <span
                  className={styleClasses?.radioMark}
                  style={{
                    backgroundColor: radioMarkColor,
                    WebkitMaskImage: `url("${radioMarkIcon}")`,
                    maskImage: `url("${radioMarkIcon}")`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                  }}
                />
              ) : null}
            </label>
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
