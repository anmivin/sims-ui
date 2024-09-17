import * as React from "react";
import resolveProps from "@mui/utils/resolveProps";

import styled from "@emotion/styled";
import { useDefaultProps } from "../DefaultPropsProvider";
import ButtonBase from "./ButtonBase";

import ButtonGroupContext from "../ButtonGroup/ButtonGroupContext";

export interface ButtonOwnProps {
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
   * Element placed after the children.
   */
  endIcon?: React.ReactNode;
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string;
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;

  /**
   * The variant to use.
   * @default 'text'
   */
  variant?: "text" | "outlined" | "contained";
}

const commonIconStyles = [
  {
    props: { size: "small" },
    style: {
      "& > *:nth-of-type(1)": {
        fontSize: 18,
      },
    },
  },
  {
    props: { size: "medium" },
    style: {
      "& > *:nth-of-type(1)": {
        fontSize: 20,
      },
    },
  },
  {
    props: { size: "large" },
    style: {
      "& > *:nth-of-type(1)": {
        fontSize: 22,
      },
    },
  },
];

const ButtonRoot = styled(ButtonBase)({
  minWidth: 64,
  padding: "6px 16px",
  border: 0,
  borderRadius: "12px",
  "&:hover": {
    textDecoration: "none",
  },
  "-disabled": {
    color: "grey",
  },
  variants: [
    {
      props: { variant: "contained" },
      style: {
        color: `var(--variant-containedColor)`,
        backgroundColor: `var(--variant-containedBg)`,
      },
    },
    {
      props: { variant: "text" },
      style: {
        padding: "6px 8px",
        color: `var(--variant-textColor)`,
        backgroundColor: `var(--variant-textBg)`,
      },
    },
    {
      props: {
        size: "small",
        variant: "text",
      },
      style: {
        padding: "4px 5px",
        fontSize: "12px",
      },
    },
    {
      props: {
        size: "large",
        variant: "text",
      },
      style: {
        padding: "8px 11px",
        fontSize: "18px",
      },
    },
    {
      props: {
        size: "small",
        variant: "outlined",
      },
      style: {
        padding: "3px 9px",
        fontSize: "12px",
      },
    },
    {
      props: {
        size: "large",
        variant: "outlined",
      },
      style: {
        padding: "7px 21px",
        fontSize: "16px",
      },
    },
    {
      props: {
        size: "small",
        variant: "contained",
      },
      style: {
        padding: "4px 10px",
        fontSize: "12px",
      },
    },
    {
      props: {
        size: "large",
        variant: "contained",
      },
      style: {
        padding: "8px 22px",
        fontSize: "16px",
      },
    },
    {
      props: {
        disableElevation: true,
      },
      style: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
        },
        "-disabled": {
          boxShadow: "none",
        },
      },
    },
    {
      props: { fullWidth: true },
      style: { width: "100%" },
    },
  ],
});

const ButtonStartIcon = styled("span")({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
  variants: [
    {
      props: { size: "small" },
      style: {
        marginLeft: -2,
      },
    },
    ...commonIconStyles,
  ],
});

const ButtonEndIcon = styled("span")({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
  variants: [
    {
      props: { size: "small" },
      style: {
        marginRight: -2,
      },
    },
    ...commonIconStyles,
  ],
});

const Button = React.forwardRef(function Button(inProps, ref) {
  const contextProps = React.useContext(ButtonGroupContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: "MuiButton" });
  const {
    children,
    disabled = false,
    endIcon: endIconProp,
    fullWidth = false,
    size = "medium",
    startIcon: startIconProp,
    type,
    variant = "text",
    ...other
  } = props;

  const startIcon = startIconProp && <ButtonStartIcon>{startIconProp}</ButtonStartIcon>;

  const endIcon = endIconProp && <ButtonEndIcon>{endIconProp}</ButtonEndIcon>;

  return (
    <ButtonRoot disabled={disabled} ref={ref} type={type} {...other}>
      {startIcon}
      {children}
      {endIcon}
    </ButtonRoot>
  );
});

export default Button;
