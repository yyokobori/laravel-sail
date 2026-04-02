import React, { type ChangeEvent } from 'react';
import { Label } from './Label';
import type { TextareaProps } from './types';

/**
 * 複数行テキスト入力欄のテンプレートを描画する。
 * @param props 入力欄の表示・値・変更ハンドラ
 *   @property name input要素のname/idに使う識別子
 *   @property value 入力欄に表示する現在値
 *   @property label 入力欄のラベル文言（未指定時は非表示）
 *   @property placeholder 未入力時に表示する補助テキスト
 *   @property rows 初期表示行数
 *   @property resizeMode リサイズ可否・方向
 *   @property status 表示状態（default/error）
 *   @property errorMessage エラー時に表示するメッセージ
 *   @property showErrorMessage エラーメッセージを表示するか
 *   @property required 必須項目かどうか
 *   @property styleClasses スタイルクラス指定
 *   @property onValueChange 値変更時のコールバック
 * @returns テキストエリアコンポーネント
 */
export function Textarea(props: TextareaProps): JSX.Element {
  const {
    name, // textarea要素のname/idに使用する識別子
    value, // 入力欄に表示する現在値
    label, // 入力欄のラベル文言（未指定時は非表示）
    placeholder, // 未入力時に表示する補助テキスト
    rows = 4, // 初期表示行数
    resizeMode = 'none', // リサイズ可否・方向（デフォルトは不可）
    status = 'default', // 表示状態（default/error）
    errorMessage, // エラー時に表示するメッセージ
    showErrorMessage = true, // エラーメッセージをコンポーネント内に表示するかどうか
    required = false, // 必須項目かどうか（ラベルに*を表示）
    styleClasses, // 要素別に適用するスタイルクラス群
    onValueChange, // 値変更時に呼び出すコールバック
  } = props;

  /**
   * 入力値変更時に親へ値を通知する。
   * @param event 入力イベント
   */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    onValueChange(event.target.value);
  }

  return (
    <div>
      {label !== undefined ? (
        <Label htmlFor={name} text={label} className={styleClasses?.label} required={required} />
      ) : null}
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={handleChange}
        style={{
          resize: resizeMode,
          borderColor:
            status === 'error' ? '#ef4444' : status === 'default' ? '#9ca3af' : '#22c55e',
        }}
        aria-invalid={status === 'error'}
        aria-describedby={
          status === 'error' && errorMessage !== undefined && showErrorMessage
            ? `${name}-error`
            : undefined
        }
        className={styleClasses?.textarea}
      />
      {status === 'error' && errorMessage !== undefined && showErrorMessage ? (
        <p id={`${name}-error`} role="alert" className={styleClasses?.errorMessage}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
