export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectStyleClasses = {
  container?: string;
  label?: string;
  selectWrapper?: string;
  select?: string;
  arrow?: string;
  errorMessage?: string;
};

export type SelectProps = {
  name: string;
  value: string;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  status?: InputFieldStatus;
  errorMessage?: string;
  showErrorMessage?: boolean;
  required?: boolean;
  styleClasses?: SelectStyleClasses;
  onValueChange: (value: string) => void;
};
export type InputFieldStatus = 'default' | 'error';

export type InputFieldKind = 'text' | 'email' | 'password';

export type TextareaResizeMode = 'none' | 'vertical' | 'horizontal' | 'both';

export type InputStyleClasses = {
  label?: string;
  input?: string;
  errorMessage?: string;
};

export type InputProps = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  kind?: InputFieldKind;
  status?: InputFieldStatus;
  errorMessage?: string;
  showErrorMessage?: boolean;
  required?: boolean;
  styleClasses?: InputStyleClasses;
  onValueChange: (value: string) => void;
};

export type RadioOption = {
  value: string;
  label: string;
};

export type RadioStyleClasses = {
  container?: string;
  label?: string;
  optionWrapper?: string;
  radioWrapper?: string;
  radioInput?: string;
  radioCircle?: string;
  radioMark?: string;
  optionLabel?: string;
  errorMessage?: string;
};

export type RadioProps = {
  name: string;
  value: string;
  options: RadioOption[];
  label?: string;
  status?: InputFieldStatus;
  errorMessage?: string;
  showErrorMessage?: boolean;
  required?: boolean;
  radioIconSrc?: string;
  radioMarkColor?: string;
  styleClasses?: RadioStyleClasses;
  onValueChange: (value: string) => void;
};

export type CheckboxStyleClasses = {
  container?: string;
  label?: string;
  optionWrapper?: string;
  checkboxWrapper?: string;
  checkboxInput?: string;
  checkboxBox?: string;
  checkMark?: string;
  optionLabel?: string;
  errorMessage?: string;
};

export type CheckboxProps = {
  name: string;
  checked: boolean;
  label?: string;
  optionLabel: string;
  status?: InputFieldStatus;
  errorMessage?: string;
  showErrorMessage?: boolean;
  required?: boolean;
  checkIconSrc?: string;
  checkMarkColor?: string;
  styleClasses?: CheckboxStyleClasses;
  onCheckedChange: (checked: boolean) => void;
};

export type TextareaStyleClasses = {
  label?: string;
  textarea?: string;
  errorMessage?: string;
};

export type TextareaProps = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  resizeMode?: TextareaResizeMode;
  status?: InputFieldStatus;
  errorMessage?: string;
  showErrorMessage?: boolean;
  required?: boolean;
  styleClasses?: TextareaStyleClasses;
  onValueChange: (value: string) => void;
};
