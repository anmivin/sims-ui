import { ComponentSize, Variant } from '../../shared/types';
export interface CheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> {
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    required?: boolean;
    checked?: boolean;
    checkedIcon?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    variant?: Variant;
    label?: string;
    size?: ComponentSize;
}
