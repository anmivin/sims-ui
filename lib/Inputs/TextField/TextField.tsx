import * as React from "react";

import styled from "@emotion/styled";

import InputLabel from "../../Providers/InputLabel";
import FormControl from "../../Providers/FormControl";
import FormHelperText from "../../Providers/FormHelperText";
import InputBase from "../../Providers/InputBase";

const TextFieldRoot = styled(FormControl)({});

const TextField = (props: BaseTextFieldProps) => {
  const {
    children,
    defaultValue,
    disabled = false,
    error = false,
    fullWidth = false,
    helperText,
    label,
    maxRows,
    minRows,
    multiline = false,
    placeholder,
    required = false,
    rows,
    value,
    variant = "outlined",
    ...other
  } = props;

  const InputComponent = InputBase;

  const InputElement = (
    <InputComponent
      defaultValue={defaultValue}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      value={value}
      placeholder={placeholder}
    />
  );

  return (
    <TextFieldRoot
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      required={required}
      variant={variant}
      {...other}
    >
      {label != null && label !== "" && <InputLabel>{label}</InputLabel>}

      {InputElement}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </TextFieldRoot>
  );
};

export default TextField;

import { FormControlProps } from "../../Providers/FormControl";

export interface BaseTextFieldProps
  extends Omit<
    FormControlProps,
    // event handlers are declared on derived interfaces
    "onChange" | "onBlur" | "onFocus" | "defaultValue"
  > {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string | number | readonly string[];
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;

  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode;

  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline?: boolean;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required?: boolean;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows?: string | number;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows?: string | number;

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: string | number | readonly string[];
  variant?: TextFieldVariants;
}

export type TextFieldVariants = "outlined" | "standard" | "filled";
