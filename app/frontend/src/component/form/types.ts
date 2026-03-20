
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
  /** 選択中の値 */
  value: string;
  /** 選択肢リスト */
  options: SelectOption[];
  /** ラベル文言（未指定時は非表示） */
  label?: string;
  /** プレースホルダー（未選択時の補助テキスト） */
  placeholder?: string;
  /** 表示状態（default/error） */
  status?: InputFieldStatus;
  /** エラー時に表示するメッセージ */
  errorMessage?: string;
  /** エラーメッセージを表示するか */
  showErrorMessage?: boolean;
  /** 必須項目かどうか */
  required?: boolean;
  /** スタイルクラス指定 */
  styleClasses?: SelectStyleClasses;
  /** 値変更時のコールバック */
  onValueChange: (value: string) => void;
};

/**
 * 入力欄の状態種別
 */
export type InputFieldStatus = 'default' | 'error';


/**
 * 入力欄の種別
 */
export type InputFieldKind = 'text' | 'email' | 'password';


/**
 * テキストエリアのリサイズ可否・方向
 */
export type TextareaResizeMode = 'none' | 'vertical' | 'horizontal' | 'both';


/**
 * Inputコンポーネントのスタイルクラス指定
 */
export type InputStyleClasses = {
  /** ラベル部分のクラス */
  label?: string;
  /** input本体のクラス */
  input?: string;
  /** エラーメッセージのクラス */
  errorMessage?: string;
};


/**
 * Inputコンポーネントのprops
 */
export type InputProps = {
  /** input要素のname/idに使う識別子 */
  name: string;
  /** 入力欄に表示する現在値 */
  value: string;
  /** 入力欄のラベル文言（未指定時は非表示） */
  label?: string;
  /** 未入力時に表示する補助テキスト */
  placeholder?: string;
  /** 入力欄の種別（text/email/password） */
  kind?: InputFieldKind;
  /** 表示状態（default/error） */
  status?: InputFieldStatus;
  /** エラー時に表示するメッセージ */
  errorMessage?: string;
  /** エラーメッセージを表示するか */
  showErrorMessage?: boolean;
  /** 必須項目かどうか */
  required?: boolean;
  /** スタイルクラス指定 */
  styleClasses?: InputStyleClasses;
  /** 値変更時のコールバック */
  onValueChange: (value: string) => void;
};


/**
 * ラジオボタンの選択肢情報
 */
export type RadioOption = {
  /** 選択肢の値 */
  value: string;
  /** 表示ラベル */
  label: string;
};


/**
 * Radioコンポーネントのスタイルクラス指定
 */
export type RadioStyleClasses = {
  /** 外枠のクラス */
  container?: string;
  /** ラベル部分のクラス */
  label?: string;
  /** 選択肢ラッパーのクラス */
  optionWrapper?: string;
  /** ラジオ本体のラッパー */
  radioWrapper?: string;
  /** input要素のクラス */
  radioInput?: string;
  /** ラジオ円のクラス */
  radioCircle?: string;
  /** チェックマークのクラス */
  radioMark?: string;
  /** 選択肢ラベルのクラス */
  optionLabel?: string;
  /** エラーメッセージのクラス */
  errorMessage?: string;
};


/**
 * Radioコンポーネントのprops
 */
export type RadioProps = {
  /** input要素のname属性に使う識別子 */
  name: string;
  /** 選択中の値 */
  value: string;
  /** 選択肢リスト */
  options: RadioOption[];
  /** ラベル文言（未指定時は非表示） */
  label?: string;
  /** 表示状態（default/error） */
  status?: InputFieldStatus;
  /** エラー時に表示するメッセージ */
  errorMessage?: string;
  /** エラーメッセージを表示するか */
  showErrorMessage?: boolean;
  /** 必須項目かどうか */
  required?: boolean;
  /** ラジオマークのSVG画像URL */
  radioIconSrc?: string;
  /** ラジオマークの色 */
  radioMarkColor?: string;
  /** スタイルクラス指定 */
  styleClasses?: RadioStyleClasses;
  /** 値変更時のコールバック */
  onValueChange: (value: string) => void;
};


/**
 * Checkboxコンポーネントのスタイルクラス指定
 */
export type CheckboxStyleClasses = {
  /** 外枠のクラス */
  container?: string;
  /** ラベル部分のクラス */
  label?: string;
  /** 選択肢ラッパーのクラス */
  optionWrapper?: string;
  /** チェックボックス本体のラッパー */
  checkboxWrapper?: string;
  /** input要素のクラス */
  checkboxInput?: string;
  /** チェックボックス枠のクラス */
  checkboxBox?: string;
  /** チェックマークのクラス */
  checkMark?: string;
  /** 選択肢ラベルのクラス */
  optionLabel?: string;
  /** エラーメッセージのクラス */
  errorMessage?: string;
};


/**
 * Checkboxコンポーネントのprops
 */
export type CheckboxProps = {
  /** input要素のname属性に使う識別子 */
  name: string;
  /** チェック状態 */
  checked: boolean;
  /** ラベル文言（未指定時は非表示） */
  label?: string;
  /** 選択肢のラベル */
  optionLabel: string;
  /** 表示状態（default/error） */
  status?: InputFieldStatus;
  /** エラー時に表示するメッセージ */
  errorMessage?: string;
  /** エラーメッセージを表示するか */
  showErrorMessage?: boolean;
  /** 必須項目かどうか */
  required?: boolean;
  /** チェックマークSVG画像URL */
  checkIconSrc?: string;
  /** チェックマークの色 */
  checkMarkColor?: string;
  /** スタイルクラス指定 */
  styleClasses?: CheckboxStyleClasses;
  /** チェック状態変更時のコールバック */
  onCheckedChange: (checked: boolean) => void;
};


/**
 * Textareaコンポーネントのスタイルクラス指定
 */
export type TextareaStyleClasses = {
  /** ラベル部分のクラス */
  label?: string;
  /** textarea本体のクラス */
  textarea?: string;
  /** エラーメッセージのクラス */
  errorMessage?: string;
};


/**
 * Textareaコンポーネントのprops
 */
export type TextareaProps = {
  /** input要素のname/idに使う識別子 */
  name: string;
  /** 入力欄に表示する現在値 */
  value: string;
  /** 入力欄のラベル文言（未指定時は非表示） */
  label?: string;
  /** 未入力時に表示する補助テキスト */
  placeholder?: string;
  /** 初期表示行数 */
  rows?: number;
  /** リサイズ可否・方向 */
  resizeMode?: TextareaResizeMode;
  /** 表示状態（default/error） */
  status?: InputFieldStatus;
  /** エラー時に表示するメッセージ */
  errorMessage?: string;
  /** エラーメッセージを表示するか */
  showErrorMessage?: boolean;
  /** 必須項目かどうか */
  required?: boolean;
  /** スタイルクラス指定 */
  styleClasses?: TextareaStyleClasses;
  /** 値変更時のコールバック */
  onValueChange: (value: string) => void;
};
