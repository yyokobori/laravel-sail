
import React, { useRef, useState, useEffect } from 'react';


/**
 * セレクトボックスの選択肢情報
 * @property value 選択肢の値
 * @property label 表示ラベル
 * @property disabled 選択不可かどうか
 */
export type SelectOption = {
  /** 選択肢の値 */
  value: string;
  /** 表示ラベル */
  label: string;
  /** 選択不可の場合true */
  disabled?: boolean;
};


/**
 * Selectコンポーネントのスタイルクラス指定
 */
export type SelectStyleClasses = {
  /** 外枠のクラス */
  container?: string;
  /** ラベル部分のクラス */
  label?: string;
  /** セレクトボックス全体のラッパー */
  selectWrapper?: string;
  /** セレクト本体のクラス */
  select?: string;
  /** ドロップダウン矢印のクラス */
  arrow?: string;
  /** エラーメッセージのクラス */
  errorMessage?: string;
};


/**
 * Selectコンポーネントのprops
 */
export type SelectProps = {
  /** input要素のname/idに使う識別子 */
  name: string;
  /** 選択中の値（複数選択時は配列） */
  value: string | string[];
  /** 選択肢リスト */
  options: SelectOption[];
  /** ラベル文言（未指定時は非表示） */
  label?: string;
  /** プレースホルダー（未選択時の補助テキスト） */
  placeholder?: string;
  /** 表示状態（default/error） */
  status?: 'default' | 'error';
  /** エラー時に表示するメッセージ */
  errorMessage?: string;
  /** エラーメッセージを表示するか */
  showErrorMessage?: boolean;
  /** 必須項目かどうか */
  required?: boolean;
  /** スタイルクラス指定 */
  styleClasses?: SelectStyleClasses;
  /** 値変更時のコールバック */
  onValueChange: (value: string | string[]) => void;
  /** 選択肢の先頭にチェックアイコンを表示するか */
  showCheckIcon?: boolean;
  /** 複数選択を許可するか */
  multiple?: boolean;
  /** 選択肢リストの左インデントを有効化するか */
  enableOptionIndent?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  name,
  value,
  options,
  label,
  placeholder,
  status = 'default',
  errorMessage,
  showErrorMessage = true,
  required = false,
  styleClasses = {},
  onValueChange,
  showCheckIcon = false,
  multiple = false,
  enableOptionIndent = true,
}) => {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // 選択中ラベル
  const isMulti = multiple;
  const valueArr = isMulti ? (Array.isArray(value) ? value : []) : [typeof value === 'string' ? value : ''];
  const selectedLabel = isMulti
    ? options.filter(opt => valueArr.includes(opt.value)).map(opt => opt.label).join(', ')
    : options.find(opt => opt.value === value)?.label || '';

  // キーボード操作
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h: number | null) => {
        const idx = h === null ? options.findIndex(opt => opt.value === value) : h;
        let next = idx + 1;
        while (next < options.length && options[next].disabled) next++;
        if (next >= options.length) return idx;
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h: number | null) => {
        const idx = h === null ? options.findIndex(opt => opt.value === value) : h;
        let prev = idx - 1;
        while (prev >= 0 && options[prev].disabled) prev--;
        if (prev < 0) return idx;
        return prev;
      });
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open && highlight !== null && !options[highlight].disabled) {
        if (isMulti) {
          const v = options[highlight].value;
          let newArr = valueArr.includes(v)
            ? valueArr.filter(val => val !== v)
            : [...valueArr, v];
          onValueChange(newArr);
        } else {
          onValueChange(options[highlight].value);
          setOpen(false);
        }
        setHighlight(null);
        buttonRef.current?.focus();
      } else {
        setOpen((o: boolean) => !o);
        setHighlight(options.findIndex(opt => opt.value === (isMulti ? valueArr[0] : value)));
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setHighlight(null);
    }
  };

  // 選択肢クリック
  const handleSelect = (val: string) => {
    if (isMulti) {
      let newArr = valueArr.includes(val)
        ? valueArr.filter(v => v !== val)
        : [...valueArr, val];
      onValueChange(newArr);
    } else {
      onValueChange(val);
      setOpen(false);
    }
    setHighlight(null);
    buttonRef.current?.focus();
  };

  // 外部クリックで閉じる
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
        setHighlight(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // open時にhighlight初期化
  useEffect(() => {
    if (open) {
      setHighlight(options.findIndex(opt => opt.value === value));
    }
  }, [open, options, value]);

  // 枠・色は他フォームと統一
  const baseClass = 'w-full bg-template-white border-2 rounded-lg px-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none transition-colors';
  const borderClass = status === 'error'
    ? 'border-template-error-500 focus:border-template-error-600'
    : 'border-template-gray-400 focus:border-template-gray-400';
  const dropdownClass = 'shadow-lg';
  const uiClass = `${baseClass} ${borderClass} ${dropdownClass} flex items-center justify-between cursor-pointer ${styleClasses.select ?? ''}`;
  const optionIndentClass = enableOptionIndent ? 'px-4' : 'px-0';
  const optionIconPlaceholderClass = enableOptionIndent ? 'w-5' : 'w-0';

  return (
    <div className={styleClasses.container ?? 'block'}>
      {label && (
        <label className={styleClasses.label ?? 'block w-[200px] text-sm font-semibold mb-2'} htmlFor={name}>
          {label}
          {required && <span className="text-template-error-500 ml-1">*</span>}
        </label>
      )}
      <div className={styleClasses.selectWrapper ?? 'relative'}>
        {/* 隠しselect（アクセシビリティ・自動補完用） */}
        <select
          id={name}
          name={name}
          value={value}
          required={required}
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
          onChange={e => {
            if (isMulti) {
              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
              onValueChange(selected);
            } else {
              onValueChange(e.target.value);
            }
          }}
          multiple={isMulti}
        >
          {placeholder && !isMulti && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* UI用カスタム選択欄 */}
        <button
          ref={buttonRef}
          type="button"
          className={
            uiClass +
            (open ? ' border-b-0 rounded-b-none' : '')
          }
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${name}-label`}
          onClick={() => {
            setOpen((o: boolean) => !o);
            setHighlight(options.findIndex(opt => opt.value === value));
          }}
          onKeyDown={handleKeyDown}
          id={`${name}-button`}
        >
          <span>{selectedLabel || placeholder || ''}</span>
          <span className={styleClasses.arrow ?? 'ml-2 text-template-gray-400'}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={`${name}-label`}
          className={`absolute z-20 mt-1 w-full bg-white border-2 border-template-gray-400 border-t-0 rounded-lg shadow-lg overflow-auto transition-all duration-200 ease-in-out
            ${open ? 'max-h-60 opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
            ${open ? 'py-1' : 'py-0'}
            ${open ? 'rounded-t-none' : ''}
          `}
          style={{ left: 0 }}
        >
          {options.map((opt, i) => {
            const checked = valueArr.includes(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={checked}
                className={`${optionIndentClass} py-2 cursor-pointer flex items-center gap-2 ${checked ? 'bg-template-gray-200 font-bold' : ''} ${opt.disabled ? 'opacity-50 pointer-events-none' : ''} ${(highlight === i || (!opt.disabled && open && highlight === i)) ? 'bg-gray-100' : ''} hover:bg-gray-100`}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                tabIndex={-1}
                onMouseEnter={() => setHighlight(i)}
              >
                <span className={`inline-flex justify-center ${optionIconPlaceholderClass}`}>
                  {showCheckIcon && checked && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 12.5 9.2 17.5 20 6.5" fill="none" stroke="black" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {opt.label}
              </li>
            );
          })}
        </ul>
      </div>
      {status === 'error' && errorMessage && showErrorMessage && (
        <span className={styleClasses.errorMessage ?? 'block text-sm font-medium text-template-error-600 mt-1.5'}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
