"use client";
import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import composeClasses from "@mui/utils/composeClasses";
import { alpha } from "@mui/system/colorManipulator";
import getValidReactChildren from "@mui/utils/getValidReactChildren";
import capitalize from "../utils/capitalize";
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";
import createSimplePaletteValueFilter from "../utils/createSimplePaletteValueFilter";
import { useDefaultProps } from "../DefaultPropsProvider";
import buttonGroupClasses, { getButtonGroupUtilityClass } from "./buttonGroupClasses";
import ButtonGroupContext from "./ButtonGroupContext";
import ButtonGroupButtonContext from "./ButtonGroupButtonContext";

const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    { [`& .${buttonGroupClasses.grouped}`]: styles.grouped },
    {
      [`& .${buttonGroupClasses.grouped}`]: styles[`grouped${capitalize(ownerState.orientation)}`],
    },
    { [`& .${buttonGroupClasses.grouped}`]: styles[`grouped${capitalize(ownerState.variant)}`] },
    {
      [`& .${buttonGroupClasses.grouped}`]:
        styles[`grouped${capitalize(ownerState.variant)}${capitalize(ownerState.orientation)}`],
    },
    {
      [`& .${buttonGroupClasses.grouped}`]:
        styles[`grouped${capitalize(ownerState.variant)}${capitalize(ownerState.color)}`],
    },
    {
      [`& .${buttonGroupClasses.firstButton}`]: styles.firstButton,
    },
    {
      [`& .${buttonGroupClasses.lastButton}`]: styles.lastButton,
    },
    {
      [`& .${buttonGroupClasses.middleButton}`]: styles.middleButton,
    },
    styles.root,
    styles[ownerState.variant],
    ownerState.disableElevation === true && styles.disableElevation,
    ownerState.fullWidth && styles.fullWidth,
    ownerState.orientation === "vertical" && styles.vertical,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { classes, color, disabled, disableElevation, fullWidth, orientation, variant } =
    ownerState;

  const slots = {
    root: [
      "root",
      variant,
      orientation,
      fullWidth && "fullWidth",
      disableElevation && "disableElevation",
      `color${capitalize(color)}`,
    ],
    grouped: [
      "grouped",
      `grouped${capitalize(orientation)}`,
      `grouped${capitalize(variant)}`,
      `grouped${capitalize(variant)}${capitalize(orientation)}`,
      `grouped${capitalize(variant)}${capitalize(color)}`,
      disabled && "disabled",
    ],
    firstButton: ["firstButton"],
    lastButton: ["lastButton"],
    middleButton: ["middleButton"],
  };

  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};

const ButtonGroupRoot = styled("div", {
  name: "MuiButtonGroup",
  slot: "Root",
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    display: "inline-flex",
    borderRadius: (theme.vars || theme).shape.borderRadius,
    variants: [
      {
        props: { variant: "contained" },
        style: {
          boxShadow: (theme.vars || theme).shadows[2],
        },
      },
      {
        props: { disableElevation: true },
        style: {
          boxShadow: "none",
        },
      },
      {
        props: { fullWidth: true },
        style: {
          width: "100%",
        },
      },
      {
        props: { orientation: "vertical" },
        style: {
          flexDirection: "column",
          [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          },
        },
      },
      {
        props: { orientation: "horizontal" },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        },
      },
      {
        props: { variant: "text", orientation: "horizontal" },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderRight: theme.vars
              ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
              : `1px solid ${
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.23)"
                    : "rgba(255, 255, 255, 0.23)"
                }`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
            },
          },
        },
      },
      {
        props: { variant: "text", orientation: "vertical" },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderBottom: theme.vars
              ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
              : `1px solid ${
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.23)"
                    : "rgba(255, 255, 255, 0.23)"
                }`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
            },
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .flatMap(([color]) => [
          {
            props: { variant: "text", color },
            style: {
              [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
                borderColor: theme.vars
                  ? `rgba(${theme.vars.palette[color].mainChannel} / 0.5)`
                  : alpha(theme.palette[color].main, 0.5),
              },
            },
          },
        ]),
      {
        props: { variant: "outlined", orientation: "horizontal" },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderRightColor: "transparent",
            "&:hover": {
              borderRightColor: "currentColor",
            },
          },
          [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
            marginLeft: -1,
          },
        },
      },
      {
        props: { variant: "outlined", orientation: "vertical" },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderBottomColor: "transparent",
            "&:hover": {
              borderBottomColor: "currentColor",
            },
          },
          [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
            marginTop: -1,
          },
        },
      },
      {
        props: { variant: "contained", orientation: "horizontal" },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderRight: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
            },
          },
        },
      },
      {
        props: { variant: "contained", orientation: "vertical" },
        style: {
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
            borderBottom: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
            [`&.${buttonGroupClasses.disabled}`]: {
              borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`,
            },
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(["dark"]))
        .map(([color]) => ({
          props: { variant: "contained", color },
          style: {
            [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
              borderColor: (theme.vars || theme).palette[color].dark,
            },
          },
        })),
    ],
    [`& .${buttonGroupClasses.grouped}`]: {
      minWidth: 40,
      boxShadow: "none",
      props: { variant: "contained" },
      style: {
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  }))
);

const ButtonGroup = React.forwardRef(function ButtonGroup(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiButtonGroup" });
  const {
    children,
    className,
    color = "primary",
    component = "div",
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    orientation = "horizontal",
    size = "medium",
    variant = "outlined",
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const context = React.useMemo(
    () => ({
      className: classes.grouped,
      color,
      disabled,
      disableElevation,
      disableFocusRipple,
      disableRipple,
      fullWidth,
      size,
      variant,
    }),
    [
      color,
      disabled,
      disableElevation,
      disableFocusRipple,
      disableRipple,
      fullWidth,
      size,
      variant,
      classes.grouped,
    ]
  );

  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;

  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;

    if (isFirstButton && isLastButton) {
      return "";
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };

  return (
    <ButtonGroupRoot
      as={component}
      role='group'
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <ButtonGroupContext.Provider value={context}>
        {validChildren.map((child, index) => {
          return (
            <ButtonGroupButtonContext.Provider
              key={index}
              value={getButtonPositionClassName(index)}
            >
              {child}
            </ButtonGroupButtonContext.Provider>
          );
        })}
      </ButtonGroupContext.Provider>
    </ButtonGroupRoot>
  );
});

export default ButtonGroup;

import * as React from "react";
import { SxProps } from "@mui/system";
import { OverridableStringUnion } from "@mui/types";
import { OverridableComponent, OverrideProps } from "../OverridableComponent";
import { Theme } from "..";
import { ButtonGroupClasses } from "./buttonGroupClasses";

export interface ButtonGroupPropsColorOverrides {}
export interface ButtonGroupPropsVariantOverrides {}
export interface ButtonGroupPropsSizeOverrides {}

export interface ButtonGroupOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonGroupClasses>;

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: "vertical" | "horizontal";
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<"small" | "medium" | "large", ButtonGroupPropsSizeOverrides>;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: OverridableStringUnion<
    "text" | "outlined" | "contained",
    ButtonGroupPropsVariantOverrides
  >;
}

export interface ButtonGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div"
> {
  props: AdditionalProps & ButtonGroupOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Button Group](https://mui.com/material-ui/react-button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://mui.com/material-ui/api/button-group/)
 */
declare const ButtonGroup: OverridableComponent<ButtonGroupTypeMap>;

export type ButtonGroupProps<
  RootComponent extends React.ElementType = ButtonGroupTypeMap["defaultComponent"],
  AdditionalProps = {}
> = OverrideProps<ButtonGroupTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default ButtonGroup;

import * as React from "react";

type ButtonPositionClassName = string;

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = React.createContext<ButtonPositionClassName | undefined>(
  undefined
);

if (process.env.NODE_ENV !== "production") {
  ButtonGroupButtonContext.displayName = "ButtonGroupButtonContext";
}

export default ButtonGroupButtonContext;
