
import * as React from "react";
import useId from "@mui/utils/useId";

import styled from "@emotion/styled";
import { useDefaultProps } from "../DefaultPropsProvider";
import Input from "../mui/mui-material/src/Input";
import FilledInput from "../mui/mui-material/src/FilledInput";
import OutlinedInput from "../mui/mui-material/src/OutlinedInput";
import InputLabel from "../mui/mui-material/src/InputLabel";
import FormControl from "../mui/mui-material/src/FormControl";
import FormHelperText from "../mui/mui-material/src/FormHelperText";
import Select from "../mui/mui-material/src/Select";
import { getTextFieldUtilityClass } from "./textFieldClasses";
import useSlot from "../utils/useSlot";

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ["root"],
  };

  return composeClasses(slots, getTextFieldUtilityClass, classes);
};

const TextFieldRoot = styled(FormControl, {
  name: "MuiTextField",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})({});

/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 *
 * - [FormControl](/material-ui/api/form-control/)
 * - [InputLabel](/material-ui/api/input-label/)
 * - [FilledInput](/material-ui/api/filled-input/)
 * - [OutlinedInput](/material-ui/api/outlined-input/)
 * - [Input](/material-ui/api/input/)
 * - [FormHelperText](/material-ui/api/form-helper-text/)
 *
 * If you wish to alter the props applied to the `input` element, you can do so as follows:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 *
 * - using the upper case props for passing values directly to the components
 * - using the underlying components directly as shown in the demos
 */
const TextField = React.forwardRef(function TextField(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiTextField" });
  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color = "primary",
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps: FormHelperTextPropsProp,
    fullWidth = false,
    helperText,
    id: idOverride,
    InputLabelProps: InputLabelPropsProp,
    inputProps: inputPropsProp,
    InputProps: InputPropsProp,
    inputRef,
    label,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    select = false,
    SelectProps: SelectPropsProp,
    slots = {},
    slotProps = {},
    type,
    value,
    variant = "outlined",
    ...other
  } = props;

  const ownerState = {
    ...props,
    autoFocus,
    color,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    select,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  if (process.env.NODE_ENV !== "production") {
    if (select && !children) {
      console.error(
        "MUI: `children` must be passed when using the `TextField` component with `select`."
      );
    }
  }

  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;
  const InputComponent = variantComponent[variant];

  const externalForwardedProps = {
    slots,
    slotProps: {
      input: InputPropsProp,
      inputLabel: InputLabelPropsProp,
      htmlInput: inputPropsProp,
      formHelperText: FormHelperTextPropsProp,
      select: SelectPropsProp,
      ...slotProps,
    },
  };

  const inputAdditionalProps = {};
  const inputLabelSlotProps = externalForwardedProps.slotProps.inputLabel;

  if (variant === "outlined") {
    if (inputLabelSlotProps && typeof inputLabelSlotProps.shrink !== "undefined") {
      inputAdditionalProps.notched = inputLabelSlotProps.shrink;
    }
    inputAdditionalProps.label = label;
  }
  if (select) {
    // unset defaults from textbox inputs
    if (!SelectPropsProp || !SelectPropsProp.native) {
      inputAdditionalProps.id = undefined;
    }
    inputAdditionalProps["aria-describedby"] = undefined;
  }

  const [InputSlot, inputProps] = useSlot("input", {
    elementType: InputComponent,
    externalForwardedProps,
    additionalProps: inputAdditionalProps,
    ownerState,
  });

  const [InputLabelSlot, inputLabelProps] = useSlot("inputLabel", {
    elementType: InputLabel,
    externalForwardedProps,
    ownerState,
  });

  const [HtmlInputSlot, htmlInputProps] = useSlot("htmlInput", {
    elementType: "input",
    externalForwardedProps,
    ownerState,
  });

  const [FormHelperTextSlot, formHelperTextProps] = useSlot("formHelperText", {
    elementType: FormHelperText,
    externalForwardedProps,
    ownerState,
  });

  const [SelectSlot, selectProps] = useSlot("select", {
    elementType: Select,
    externalForwardedProps,
    ownerState,
  });

  const InputElement = (
    <InputSlot
      aria-describedby={helperTextId}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      fullWidth={fullWidth}
      multiline={multiline}
      name={name}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      type={type}
      value={value}
      id={id}
      inputRef={inputRef}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      inputProps={htmlInputProps}
      slots={{
        input: slots.htmlInput ? HtmlInputSlot : undefined,
      }}
      {...inputProps}
    />
  );

  return (
    <TextFieldRoot
      className={clsx(classes.root, className)}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      ref={ref}
      required={required}
      color={color}
      variant={variant}
      ownerState={ownerState}
      {...other}
    >
      {label != null && label !== "" && (
        <InputLabelSlot htmlFor={id} id={inputLabelId} {...inputLabelProps}>
          {label}
        </InputLabelSlot>
      )}

      {select ? (
        <SelectSlot
          aria-describedby={helperTextId}
          id={id}
          labelId={inputLabelId}
          value={value}
          input={InputElement}
          {...selectProps}
        >
          {children}
        </SelectSlot>
      ) : (
        InputElement
      )}

      {helperText && (
        <FormHelperTextSlot id={helperTextId} {...formHelperTextProps}>
          {helperText}
        </FormHelperTextSlot>
      )}
    </TextFieldRoot>
  );
});

export default TextField;

import { InternalStandardProps as StandardProps } from "..";
import { FormControlProps } from "../mui/mui-material/src/FormControl";
import { InputBaseProps } from "../InputBase";
import { InputProps as StandardInputProps } from "../mui/mui-material/src/Input";
import { FilledInputProps } from "../mui/mui-material/src/FilledInput";
import { OutlinedInputProps } from "../mui/mui-material/src/OutlinedInput";

export interface BaseTextFieldProps
  extends StandardProps<
    FormControlProps,
    // event handlers are declared on derived interfaces
    "onChange" | "onBlur" | "onFocus" | "defaultValue"
  > {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
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
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id?: string;

  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline?: boolean;
  onBlur?: InputBaseProps["onBlur"];
  onFocus?: StandardInputProps["onFocus"];
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
   * Render a [`Select`](https://mui.com/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select?: boolean;

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
}

export interface StandardTextFieldProps
  extends BaseTextFieldProps,
    TextFieldSlotsAndSlotProps<StandardInputProps> {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: StandardInputProps["onChange"];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: "standard";
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](https://mui.com/material-ui/api/filled-input/),
   * [`OutlinedInput`](https://mui.com/material-ui/api/outlined-input/) or [`Input`](https://mui.com/material-ui/api/input/)
   * component depending on the `variant` prop value.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputProps?: Partial<StandardInputProps>;
}

export interface FilledTextFieldProps
  extends BaseTextFieldProps,
    TextFieldSlotsAndSlotProps<FilledInputProps> {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: FilledInputProps["onChange"];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: "filled";
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](https://mui.com/material-ui/api/filled-input/),
   * [`OutlinedInput`](https://mui.com/material-ui/api/outlined-input/) or [`Input`](https://mui.com/material-ui/api/input/)
   * component depending on the `variant` prop value.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputProps?: Partial<FilledInputProps>;
}

export interface OutlinedTextFieldProps
  extends BaseTextFieldProps,
    TextFieldSlotsAndSlotProps<OutlinedInputProps> {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: OutlinedInputProps["onChange"];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: "outlined";
}

export type TextFieldVariants = "outlined" | "standard" | "filled";
