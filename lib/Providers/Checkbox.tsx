import * as React from "react";
import { SwitchBaseProps } from "./SwitchBase";

import SwitchBase from "./SwitchBase";
import CheckBoxOutlineBlankIcon from "../internal/svg-icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "../internal/svg-icons/CheckBox";

import styled from "@emotion/styled";

import createSimplePaletteValueFilter from "../utils/createSimplePaletteValueFilter";

const CheckboxRoot = styled(SwitchBase)({
  color: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: { color: "default", disableRipple: false },
      style: {
        "&:hover": {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
            : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
        },
      },
    },
    ...Object.entries(theme.palette)
      .filter(createSimplePaletteValueFilter())
      .map(([color]) => ({
        props: { color, disableRipple: false },
        style: {
          "&:hover": {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
          },
        },
      })),
    ...Object.entries(theme.palette)
      .filter(createSimplePaletteValueFilter())
      .map(([color]) => ({
        props: { color },
        style: {
          [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
            color: (theme.vars || theme).palette[color].main,
          },
          [`&.${checkboxClasses.disabled}`]: {
            color: (theme.vars || theme).palette.action.disabled,
          },
        },
      })),
  ],
});

const defaultCheckedIcon = <CheckBoxIcon />;
const defaultIcon = <CheckBoxOutlineBlankIcon />;

const Checkbox = React.forwardRef(function Checkbox(props: CheckboxProps, ref) {
  const { checkedIcon = defaultCheckedIcon, icon = defaultIcon, inputProps, ...other } = props;

  return (
    <CheckboxRoot
      type='checkbox'
      inputProps={{
        ...inputProps,
      }}
      icon={icon}
      checkedIcon={checkedIcon}
      ref={ref}
      {...other}
    />
  );
});

export default Checkbox;

export interface CheckboxProps
  extends Omit<SwitchBaseProps, "checkedIcon" | "color" | "icon" | "type"> {
  /**
   * If `true`, the component is checked.
   */
  checked?: SwitchBaseProps["checked"];
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon?: React.ReactNode;

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: SwitchBaseProps["disabled"];

  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon?: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: SwitchBaseProps["id"];

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: SwitchBaseProps["inputProps"];
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: SwitchBaseProps["onChange"];
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required?: SwitchBaseProps["required"];

  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: SwitchBaseProps["value"];
}
