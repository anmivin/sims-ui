import * as React from "react";
import clsx from "clsx";
import styled from "@emotion/styled";

export type TextFieldVariants = "outlined" | "standard" | 'filled' ;

export interface InputBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "defaultValue" | "onChange" > {
  defaultValue?: string | number | readonly string[] | undefined;
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
  value?: string | number | readonly string[] | undefined;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  variant?: TextFieldVariants;
  className?: string
}

const FormControlRoot = styled("div")({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,

  

});

export const InputBaseRoot = styled("div")({
  lineHeight: "1.4375em", // 23px
  boxSizing: "border-box", // Prevent padding issue with fullWidth.
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",

  
  "-disabled": {
    color: "gray",
    cursor: "default",
  },
});

export const InputArea = styled("textarea")({});

export const InputBaseInput = styled("input")({
  font: "inherit",
  letterSpacing: "inherit",
  color: "currentColor",
  padding: "4px 0 5px",
  border: 0,
  boxSizing: "content-box",
  background: "none",
  height: "1.4375em", // Reset 23pxthe native input line-height
  WebkitTapHighlightColor: "transparent",
  display: "block",
  width: "100%",
  "-multiline": {
    height: "auto",
    resize: "none",
    padding: 0,
    paddingTop: 0,
  },
  "&:focus": {
    outline: 0,
  },
});

const InputLabelRoot = styled("label")({
  lineHeight: "1.5em",
  padding: 0,
  position: "relative",

  "-disabled": {
    color: "gray",
    "-error": {
      color: "red",
    },
  },
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  "-shrink": {
    transform: "translate(0, -1.5px) scale(0.75)",
    transformOrigin: "top left",
    maxWidth: "133%",
  },
});

const FormHelperTextRoot = styled("p")({
  color: "",
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  "-disabled": {
    color: "",
  },
  "-error": {
    color: "",
  },
});

const TextField = (props: InputBaseProps) => {
  const {
    defaultValue,
    disabled = false,
    endAdornment,
    error = false,
    fullWidth = false,
    multiline = false,
    label,
    helperText,
    onChange,
    placeholder,
    rows,
    startAdornment,
    value: valueProp,
    required,
    variant = 'standard',
    ...other
  } = props;

  const value = valueProp;

  const handleChange = (event, ...args) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControlRoot
      className={clsx(variant, disabled && '-disabled', error && '-error', fullWidth && '-fullWidth', required && '-required')
      }
     {...other} 
    >
      {label != null && label !== "" && <InputLabelRoot>{label}</InputLabelRoot>}

      {
        <>
          {multiline ? (
            <InputArea rows={rows} className={clsx('multiline')}/>
          ) : (
            <InputBaseRoot {...other} className={clsx('inputBase', `input-${variant}`)}>
              {startAdornment}
              <InputBaseInput
              className={clsx('input')}
                type='text'
                defaultValue={defaultValue}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={handleChange}
              />
              {endAdornment}
            </InputBaseRoot>
          )}
        </>
      }

      {helperText && <FormHelperTextRoot>{helperText}</FormHelperTextRoot>}
    </FormControlRoot>
  );
};

export default TextField;
