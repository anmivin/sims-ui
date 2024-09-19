export function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

export function isFilled(obj, SSR = false) {
  return (
    obj &&
    ((hasValue(obj.value) && obj.value !== "") ||
      (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ""))
  );
}

import * as React from "react";

import { FormControlContext } from "./FormControl";

import styled from "@emotion/styled";

import { isFilled } from "./utils";

export const rootOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.formControl && styles.formControl,
    ownerState.startAdornment && styles.adornedStart,
    ownerState.endAdornment && styles.adornedEnd,
    ownerState.error && styles.error,
    ownerState.size === "small" && styles.sizeSmall,
    ownerState.multiline && styles.multiline,
    ownerState.color && styles[`color${capitalize(ownerState.color)}`],
    ownerState.fullWidth && styles.fullWidth,
    ownerState.hiddenLabel && styles.hiddenLabel,
  ];
};

export const inputOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.input,
    ownerState.size === "small" && styles.inputSizeSmall,
    ownerState.multiline && styles.inputMultiline,
    ownerState.type === "search" && styles.inputTypeSearch,
    ownerState.startAdornment && styles.inputAdornedStart,
    ownerState.endAdornment && styles.inputAdornedEnd,
    ownerState.hiddenLabel && styles.inputHiddenLabel,
  ];
};

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

export const InputBaseInput = styled("input")({
  font: "inherit",
  letterSpacing: "inherit",
  color: "currentColor",
  padding: "4px 0 5px",
  border: 0,
  boxSizing: "content-box",
  background: "none",
  height: "1.4375em", // Reset 23pxthe native input line-height
  margin: 0, // Reset for Safari
  WebkitTapHighlightColor: "transparent",
  display: "block",
  // Make the flex item shrink with Firefox
  minWidth: 0,
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
  // Reset Firefox invalid required input style
  "&:invalid": {
    boxShadow: "none",
  },
  "&::-webkit-search-decoration": {
    // Remove the padding when type=search.
    WebkitAppearance: "none",
  },
  // Show and hide the placeholder logic
  [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
    "&::-webkit-input-placeholder": placeholderHidden,
    "&::-moz-placeholder": placeholderHidden, // Firefox 19+
    "&::-ms-input-placeholder": placeholderHidden, // Edge
    "&:focus::-webkit-input-placeholder": placeholderVisible,
    "&:focus::-moz-placeholder": placeholderVisible, // Firefox 19+
    "&:focus::-ms-input-placeholder": placeholderVisible, // Edge
  },
});

const InputBase = (props: InputBaseProps) => {
  const {
    defaultValue,
    disabled,
    endAdornment,
    error,
    fullWidth = false,
    multiline = false,
    onChange,
    placeholder,
    rows,
    startAdornment,
    type = "text",
    value: valueProp,
    required,
    ...other
  } = props;

  const value = valueProp;

  const handleChange = (event, ...args) => {
    if (onChange) {
      onChange(event);
    }
  };

  let InputComponent = "input";

  const Root = InputBaseRoot;

  const Input = InputBaseInput;

  return (
    <React.Fragment>
      <Root {...other}>
        {startAdornment}
        <FormControlContext.Provider value={undefined}>
          <Input
            defaultValue={defaultValue}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            rows={rows}
            value={value}
            type={type}
            onChange={handleChange}
          />
        </FormControlContext.Provider>
        {endAdornment}
      </Root>
    </React.Fragment>
  );
};

export default InputBase;

export interface InputBaseProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    /*
     * `onBlur`, `onChange`, `onFocus`, `onInvalid`, `onKeyDown`, `onKeyUp` are applied to the inner `InputComponent`,
     * which by default is an input or textarea. Since these handlers differ from the
     * ones inherited by `React.HTMLAttributes<HTMLDivElement>` we need to omit them.
     */
    "children" | "defaultValue" | "onChange"
  > {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string | number | readonly string[] | undefined;
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled?: boolean;

  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: React.ReactNode;
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error?: boolean;
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline?: boolean;

  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;

  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;

  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: React.ReactNode;

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type?: string;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: string | number | readonly string[] | undefined;
}
