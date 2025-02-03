import React from "react";

export type TextFieldVariants = "outlined" | "standard" | "filled";

export interface TextfieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "defaultValue" | "onChange"> {
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
  value?: string | number;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  variant?: TextFieldVariants;
  className?: string;
}
