import type { InputStyleClasses, RadioStyleClasses } from './types';

/**
 * Input コンポーネントのデフォルトスタイル定義（Tailwind CSS）。
 * template-* カラーパレット（白黒ベース）に準拠。
 * プロジェクト要件に応じて上書き可能。
 */
export const DEFAULT_INPUT_STYLES: InputStyleClasses = {
  label: 'block w-[200px] text-sm font-semibold mb-2',
  input: 'block w-full bg-template-white border-2 border-template-gray-300 rounded-lg px-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-black transition-colors',
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
  radio: 'w-4 h-4 text-template-black border-2 border-template-gray-300 focus:ring-2 focus:ring-template-black',
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
  radio: 'w-4 h-4 text-template-error-600 border-2 border-template-error-500 focus:ring-2 focus:ring-template-error-600',
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
  radio: 'w-4 h-4 text-template-success-600 border-2 border-template-success-500 focus:ring-2 focus:ring-template-success-600',
  optionLabel: 'ml-2 text-sm font-medium text-template-gray-900',
  errorMessage: 'block text-sm font-medium text-template-success-600 mt-1.5',
};
