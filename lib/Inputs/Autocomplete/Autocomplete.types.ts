import { Variant } from "../../shared/types";

export interface ValueType {
  id: string;
  label: string;
}

export interface UseAutocompleteProps<Value> {
  defaultValue?: Value | Value[];
  getOptionDisabled?: (option: Value) => boolean;
  getOptionLabel?: (option: Value) => string;
  inputValue?: string;
  multiple?: boolean;
  onChange?: (value: Value | Value[] | null) => void;
  options: Value[];
}

export interface OptionProps {
  key: string;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  "data-option-index": number;
  disabled: boolean;
  selected: boolean;
}

export interface UseAutocompleteReturnValue<Value> {
  valueInput: string;
  inputValue: string;
  value: Value | Value[] | null;
  dirty: boolean;
  expanded: boolean;
  filteredOptions: Value[];
  onInputChange: (value: string) => void;
  onOpen: () => void;
  onClose: () => void;
  onClickClear: () => void;
  onClickIndicator: () => void;
  optionProps: (option: Value, index: number) => OptionProps;
}

export interface AutocompleteProps<Value>
  extends UseAutocompleteProps<Value>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "children"> {
  disabled?: boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  noOptionsText?: React.ReactNode;
  openText?: string;
  variant?: Variant;
}
