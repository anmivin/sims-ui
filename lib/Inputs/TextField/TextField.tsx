import * as React from "react";
import clsx from "clsx";
import styled from "@emotion/styled";

export type TextFieldVariants = "outlined" | "standard" | "filled";

export interface TextfieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "defaultValue" | "onChange"> {
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
  className?: string;
}

const TextfieldRoot = styled("div")({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
});

export const TextfieldInput = styled("div")({
  boxSizing: "border-box",
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",

  ".disabled": {
    color: "gray",
    cursor: "default",
  },
});

export const TextfieldArea = styled("textarea")({});

export const Input = styled("input")({
  font: "inherit",
  letterSpacing: "inherit",
  color: "currentColor",
  padding: "4px 0 5px",
  border: 0,
  boxSizing: "content-box",
  background: "none",
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

const TextfieldLabelRoot = styled("label")({
  lineHeight: "1.5em",
  padding: 0,
  position: "relative",

  ".disabled": {
    color: "gray",
    ".error": {
      color: "red",
    },
  },
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
});

const HelperText = styled("p")({
  color: "",
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  ".disabled": {
    color: "",
  },
  ".error": {
    color: "",
  },
});

const TextField = (props: TextfieldProps) => {
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
    variant = "standard",
    ...other
  } = props;

  const value = valueProp;

  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextfieldRoot
      className={clsx(
        variant,
        disabled && ".disabled",
        error && ".error",
        fullWidth && ".fullWidth",
        required && ".required"
      )}
      {...other}
    >
      {label && <TextfieldLabelRoot>{label}</TextfieldLabelRoot>}

      {
        <>
          {multiline ? (
            <TextfieldArea rows={rows} className={clsx("multiline")} />
          ) : (
            <TextfieldInput {...other} className={clsx("inputBase", `input-${variant}`)}>
              {startAdornment}
              <Input
                className={clsx("input")}
                type='text'
                defaultValue={defaultValue}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={handleChange}
              />
              {endAdornment}
            </TextfieldInput>
          )}
        </>
      }

      {helperText && <HelperText>{helperText}</HelperText>}
    </TextfieldRoot>
  );
};

export default TextField;
