import * as React from "react";

import useControlled from "../utils/useControlled";
import ButtonBase from "./ButtonBase";

import styled from "@emotion/styled";

import { ButtonBaseProps } from "./ButtonBase";
export interface SwitchBaseClasses {
  root: string;
  checked: string;
  disabled: string;
  input: string;
  edgeStart: string;
  edgeEnd: string;
}

export interface SwitchBaseProps
  extends Omit<ButtonBaseProps, "children" | "onChange" | "type" | "value"> {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  checkedIcon: React.ReactNode;

  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge?: "start" | "end" | false;
  icon: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required?: boolean;

  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value?: unknown;
}

const SwitchBaseRoot = styled(ButtonBase)({
  padding: 9,
  borderRadius: "50%",
  "-start": {
    marginLeft: -3,
  },
  "-end": {
    marginRight: -3,
  },
});

const SwitchBaseInput = styled("input")({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1,
});

const SwitchBase = React.forwardRef(function SwichBase(props: SwitchBaseProps, ref) {
  const {
    checked: checkedProp,
    checkedIcon,
    defaultChecked,
    disabled: disabledProp,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    required = false,
    type,
    value,
    ...other
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
  });

  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleInputChange = (event) => {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    const newChecked = event.target.checked;

    setCheckedState(newChecked);

    if (onChange) {
      onChange(event, newChecked);
    }
  };

  let disabled = disabledProp;

  const hasLabelFor = type === "checkbox" || type === "radio";

  const ownerState = {
    ...props,
    checked,
    disabled,
    edge,
  };

  return (
    <SwitchBaseRoot
      component='span'
      centerRipple
      disabled={disabled}
      role={undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={ref}
      {...other}
    >
      <SwitchBaseInput
        checked={checkedProp}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={hasLabelFor ? id : undefined}
        onChange={handleInputChange}
        ref={inputRef}
        required={required}
        type={type}
        value={value}
        {...inputProps}
      />
      {checked ? checkedIcon : icon}
    </SwitchBaseRoot>
  );
});

export default SwitchBase;