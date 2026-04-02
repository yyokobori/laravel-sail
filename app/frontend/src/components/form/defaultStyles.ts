import type {
  DatapickerStyleClasses,
  CheckboxStyleClasses,
  InputStyleClasses,
  RadioStyleClasses,
  TextareaStyleClasses,
} from './types';

/**
 * Input コンポーネントのデフォルトスタイル定義（Tailwind CSS）。
 * template-* カラーパレット（白黒ベース）に準拠。
 * プロジェクト要件に応じて上書き可能。
 */
export const DEFAULT_INPUT_STYLES: InputStyleClasses = {
  label: 'block w-[200px] text-sm font-semibold mb-2',
  input: 'block w-full bg-template-white border-2 border-template-gray-400 rounded-lg px-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-gray-400 transition-colors',
  errorMessage: 'block text-sm font-medium mt-1.5',
};

/**
 * エラー状態用のスタイル定義。
 */
export const ERROR_INPUT_STYLES: InputStyleClasses = {
  label: 'block w-[200px] text-sm font-semibold text-template-gray-900 mb-2',
  input: 'block w-full bg-template-white border-2 border-template-error-500 rounded-lg px-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-error-600 transition-colors',
  errorMessage: 'block text-sm font-medium text-template-error-600 mt-1.5',
};

/**
 * 成功状態用のスタイル定義。
 */
export const SUCCESS_INPUT_STYLES: InputStyleClasses = {
  label: 'block w-[200px] text-sm font-semibold text-template-gray-900 mb-2',
  input: 'block w-full bg-template-white border-2 border-template-success-500 rounded-lg px-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-success-600 transition-colors',
  errorMessage: 'block text-sm font-medium text-template-success-600 mt-1.5',
};

/**
 * Radio コンポーネントのデフォルトスタイル定義（Tailwind CSS）。
 * template-* カラーパレット（白黒ベース）に準拠。
 * プロジェクト要件に応じて上書き可能。
 */
export const DEFAULT_RADIO_STYLES: RadioStyleClasses = {
  container: 'block',
  label: 'block w-[200px] text-sm font-semibold mb-2',
  optionWrapper: 'flex items-center mb-2',
  radioWrapper: 'relative inline-flex items-center justify-center',
  radioInput: 'peer sr-only',
  radioCircle: 'w-6 h-6 border-2 border-template-gray-400 rounded-full bg-template-white peer-checked:bg-template-white peer-checked:border-template-gray-500 transition-colors',
  radioMark: 'absolute top-1/2 left-1/2 z-10 block w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
  optionLabel: 'ml-2 text-sm font-medium text-template-gray-900',
  errorMessage: 'block text-sm font-medium mt-1.5',
};

/**
 * Radio エラー状態用のスタイル定義。
 */
export const ERROR_RADIO_STYLES: RadioStyleClasses = {
  container: 'block',
  label: 'block w-[200px] text-sm font-semibold text-template-gray-900 mb-2',
  optionWrapper: 'flex items-center mb-2',
  radioWrapper: 'relative inline-flex items-center justify-center',
  radioInput: 'peer sr-only',
  radioCircle: 'w-6 h-6 border-2 border-template-error-500 rounded-full bg-template-white peer-checked:bg-template-white peer-checked:border-template-error-600 transition-colors',
  radioMark: 'absolute top-1/2 left-1/2 z-10 block w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
  optionLabel: 'ml-2 text-sm font-medium text-template-gray-900',
  errorMessage: 'block text-sm font-medium text-template-error-600 mt-1.5',
};

/**
 * Radio 成功状態用のスタイル定義。
 */
export const SUCCESS_RADIO_STYLES: RadioStyleClasses = {
  container: 'block',
  label: 'block w-[200px] text-sm font-semibold text-template-gray-900 mb-2',
  optionWrapper: 'flex items-center mb-2',
  radioWrapper: 'relative inline-flex items-center justify-center',
  radioInput: 'peer sr-only',
  radioCircle: 'w-6 h-6 border-2 border-template-success-500 rounded-full bg-template-white peer-checked:bg-template-white peer-checked:border-template-success-600 transition-colors',
  radioMark: 'absolute top-1/2 left-1/2 z-10 block w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
  optionLabel: 'ml-2 text-sm font-medium text-template-gray-900',
  errorMessage: 'block text-sm font-medium text-template-success-600 mt-1.5',
};

/**
 * Checkbox コンポーネントのデフォルトスタイル定義（Tailwind CSS）。
 */
export const DEFAULT_CHECKBOX_STYLES: CheckboxStyleClasses = {
  container: 'block',
  label: 'block w-[200px] text-sm font-semibold mb-2',
  optionWrapper: 'flex items-center',
  checkboxWrapper: 'relative inline-flex items-center',
  checkboxInput: 'peer sr-only',
  checkboxBox: 'w-5 h-5 border-2 border-template-gray-400 rounded bg-template-white peer-checked:bg-template-white peer-checked:border-template-gray-400 transition-colors',
  checkMark: 'absolute top-1/2 left-1/2 z-10 block w-7 h-7 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
  optionLabel: 'ml-2 text-sm font-medium text-template-gray-900',
  errorMessage: 'block text-sm font-medium mt-1.5',
};

/**
 * Checkbox エラー状態用のスタイル定義。
 */
export const ERROR_CHECKBOX_STYLES: CheckboxStyleClasses = {
  container: 'block',
  label: 'block w-[200px] text-sm font-semibold text-template-gray-900 mb-2',
  optionWrapper: 'flex items-center',
  checkboxWrapper: 'relative inline-flex items-center',
  checkboxInput: 'peer sr-only',
  checkboxBox: 'w-5 h-5 border-2 border-template-error-500 rounded bg-template-white peer-checked:bg-template-white peer-checked:border-template-error-600 transition-colors',
  checkMark: 'absolute top-1/2 left-1/2 z-10 block w-7 h-7 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
  optionLabel: 'ml-2 text-sm font-medium text-template-gray-900',
  errorMessage: 'block text-sm font-medium text-template-error-600 mt-1.5',
};

/**
 * Checkbox 成功状態用のスタイル定義。
 */
export const SUCCESS_CHECKBOX_STYLES: CheckboxStyleClasses = {
  container: 'block',
  label: 'block w-[200px] text-sm font-semibold text-template-gray-900 mb-2',
  optionWrapper: 'flex items-center',
  checkboxWrapper: 'relative inline-flex items-center',
  checkboxInput: 'peer sr-only',
  checkboxBox: 'w-5 h-5 border-2 border-template-success-500 rounded bg-template-white peer-checked:bg-template-white peer-checked:border-template-success-600 transition-colors',
  checkMark: 'absolute top-1/2 left-1/2 z-10 block w-7 h-7 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
  optionLabel: 'ml-2 text-sm font-medium text-template-gray-900',
  errorMessage: 'block text-sm font-medium text-template-success-600 mt-1.5',
};

/**
 * Textarea コンポーネントのデフォルトスタイル定義（Tailwind CSS）。
 */
export const DEFAULT_TEXTAREA_STYLES: TextareaStyleClasses = {
  label: 'block w-[200px] text-sm font-semibold mb-2',
  textarea:
    'block w-full bg-template-white border-2 border-template-gray-400 rounded-lg px-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-gray-400 transition-colors',
  errorMessage: 'block text-sm font-medium mt-1.5',
};

/**
 * Textarea エラー状態用のスタイル定義。
 */
export const ERROR_TEXTAREA_STYLES: TextareaStyleClasses = {
  label: 'block w-[200px] text-sm font-semibold text-template-gray-900 mb-2',
  textarea:
    'block w-full bg-template-white border-2 border-template-error-500 rounded-lg px-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-error-600 transition-colors',
  errorMessage: 'block text-sm font-medium text-template-error-600 mt-1.5',
};

/**
 * Textarea 成功状態用のスタイル定義。
 */
export const SUCCESS_TEXTAREA_STYLES: TextareaStyleClasses = {
  label: 'block w-[200px] text-sm font-semibold text-template-gray-900 mb-2',
  textarea:
    'block w-full bg-template-white border-2 border-template-success-500 rounded-lg px-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-success-600 transition-colors',
  errorMessage: 'block text-sm font-medium text-template-success-600 mt-1.5',
};

/**
 * Datapicker コンポーネントのデフォルトスタイル定義（Tailwind CSS）。
 */
export const DEFAULT_DATAPICKER_STYLES: DatapickerStyleClasses = {
  container: 'relative block',
  input:
    'block w-full bg-template-white border-2 border-template-gray-400 rounded-lg pr-12 pl-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-gray-500 transition-colors',
  icon: 'absolute right-3 top-1/2 -translate-y-1/2 text-template-gray-500',
  calendar:
    'absolute z-30 mt-2 w-[22rem] rounded-lg border-2 border-template-gray-300 bg-white opacity-100 p-4 shadow-lg',
  header: 'relative z-40 mb-3 flex items-center justify-between gap-2',
  day: 'h-9 w-9 rounded-full text-sm transition-colors',
  selectedDay: 'bg-red-100 text-template-gray-900 rounded-md font-semibold',
  today: 'bg-red-100 text-template-gray-900 rounded-full font-semibold',
  footer: 'mt-3 grid grid-cols-3 items-center text-sm font-semibold',
};
