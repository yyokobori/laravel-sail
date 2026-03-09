export type InputFieldStatus = 'default' | 'error';

export type InputFieldKind = 'text' | 'email' | 'password';

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
  radio?: string;
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
  styleClasses?: RadioStyleClasses;
  onValueChange: (value: string) => void;
};
