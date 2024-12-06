// @inheritedComponent ButtonBase
import * as React from "react";
import resolveProps from "@mui/utils/resolveProps";
import composeClasses from "@mui/utils/composeClasses";
import { alpha } from "@mui/system/colorManipulator";
import ButtonBase from "../ButtonBase";
import capitalize from "../utils/capitalize";
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";
import createSimplePaletteValueFilter from "../utils/createSimplePaletteValueFilter";
import { useDefaultProps } from "../DefaultPropsProvider";
import toggleButtonClasses, { getToggleButtonUtilityClass } from "./toggleButtonClasses";
import ToggleButtonGroupContext from "../ToggleButtonGroup/ToggleButtonGroupContext";
import ToggleButtonGroupButtonContext from "../ToggleButtonGroup/ToggleButtonGroupButtonContext";
import isValueSelected from "../ToggleButtonGroup/isValueSelected";

const useUtilityClasses = (ownerState) => {
  const { classes, fullWidth, selected, disabled, size, color } = ownerState;

  const slots = {
    root: [
      "root",
      selected && "selected",
      disabled && "disabled",
      fullWidth && "fullWidth",
      `size${capitalize(size)}`,
      color,
    ],
  };

  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};

const ToggleButtonRoot = styled(ButtonBase, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[`size${capitalize(ownerState.size)}`]];
  },
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.button,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    padding: 11,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
    color: (theme.vars || theme).palette.action.active,
    [`&.${toggleButtonClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
    },
    "&:hover": {
      textDecoration: "none",
      // Reset on mouse devices
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
        : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    variants: [
      {
        props: { color: "standard" },
        style: {
          [`&.${toggleButtonClasses.selected}`]: {
            color: (theme.vars || theme).palette.text.primary,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.selectedOpacity})`
              : alpha(theme.palette.text.primary, theme.palette.action.selectedOpacity),
            "&:hover": {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.text.primaryChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
                : alpha(
                    theme.palette.text.primary,
                    theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
                  ),
              // Reset on touch devices, it doesn't add specificity
              "@media (hover: none)": {
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.selectedOpacity})`
                  : alpha(theme.palette.text.primary, theme.palette.action.selectedOpacity),
              },
            },
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${toggleButtonClasses.selected}`]: {
              color: (theme.vars || theme).palette[color].main,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
                : alpha(theme.palette[color].main, theme.palette.action.selectedOpacity),
              "&:hover": {
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
                  : alpha(
                      theme.palette[color].main,
                      theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
                    ),
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                  backgroundColor: theme.vars
                    ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
                    : alpha(theme.palette[color].main, theme.palette.action.selectedOpacity),
                },
              },
            },
          },
        })),
      {
        props: { fullWidth: true },
        style: {
          width: "100%",
        },
      },
      {
        props: { size: "small" },
        style: {
          padding: 7,
          fontSize: theme.typography.pxToRem(13),
        },
      },
      {
        props: { size: "large" },
        style: {
          padding: 15,
          fontSize: theme.typography.pxToRem(15),
        },
      },
    ],
  }))
);

const ToggleButton = React.forwardRef(function ToggleButton(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const { value: contextValue, ...contextProps } = React.useContext(ToggleButtonGroupContext);
  const toggleButtonGroupButtonContextPositionClassName = React.useContext(
    ToggleButtonGroupButtonContext
  );
  const resolvedProps = resolveProps(
    { ...contextProps, selected: isValueSelected(inProps.value, contextValue) },
    inProps
  );
  const props = useDefaultProps({ props: resolvedProps, name: "MuiToggleButton" });
  const {
    children,
    className,
    color = "standard",
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = "medium",
    value,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    disabled,
    disableFocusRipple,
    fullWidth,
    size,
  };

  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return (
    <ToggleButtonRoot
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      ref={ref}
      onClick={handleChange}
      onChange={onChange}
      value={value}
      ownerState={ownerState}
      aria-pressed={selected}
      {...other}
    >
      {children}
    </ToggleButtonRoot>
  );
});

export default ToggleButton;

import { OverridableStringUnion } from "@mui/types";

import { ExtendButtonBase, ExtendButtonBaseTypeMap } from "../ButtonBase";

export interface ToggleButtonOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Callback fired when the state changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  /**
   * Callback fired when the button is clicked.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  /**
   * If `true`, the button is rendered in an active state.
   */
  selected?: boolean;
  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<"small" | "medium" | "large", ToggleButtonPropsSizeOverrides>;

  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: NonNullable<unknown>;
}

export type ToggleButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button"
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ToggleButtonOwnProps;
  defaultComponent: RootComponent;
}>;
