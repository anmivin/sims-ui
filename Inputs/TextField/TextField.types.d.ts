import { Variant } from '../../shared/types';
import * as React from "react";
export type TextFieldAppearence = "outlined" | "standard" | "filled";
export interface TextfieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "defaultValue" | "onChange"> {
    defaultValue?: string | number;
    disabled?: boolean;
    endAdornment?: React.ReactNode;
    error?: boolean;
    fullWidth?: boolean;
    multiline?: boolean;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    startAdornment?: React.ReactNode;
    helperText?: React.ReactNode;
    label?: React.ReactNode;
    appearence?: "primary" | "secondary";
    variant?: Variant;
}
