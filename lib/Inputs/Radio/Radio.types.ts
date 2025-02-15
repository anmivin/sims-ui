import { Variant } from "../../shared/types";

export interface RadioGroupProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  row?: boolean;
  defaultValue?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: T) => void;
  options: {
    label: string;
    value: T;
    disabled?: boolean;
  }[];
  variant?: Variant;
  getOptionDisabled?: () => boolean;
}
