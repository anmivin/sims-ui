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
  open?: boolean;
  options: Value[];
  value?: Value | Value[];
}

export interface UseAutocompleteReturnValue<Value> {
  valueInput: string;
  inputValue: string;
  value: Value | Value[] | null;
  dirty: boolean;
  expanded: boolean;
  filteredOptions: Value[];
  onInputChange: (value: string) => void;
  onMouseDown: () => void;
  onClickClear: () => void;
  onClickIndicator: () => void;
  getTagProps: (index: number) => {
    key: number;
    "data-tag-index": number;
    onDelete: (index: number) => void;
  };

  getOptionProps: (
    option: Value,
    index: number
  ) => {
    key: string;
    onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    "data-option-index": number;
    disabled: boolean;
    selected: boolean;
  };
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
