import * as React from "react";

import styled from "@emotion/styled";
import ButtonBase from "../../Internal/ButtonBase";

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
 
  border: 0,
  "&:hover": {
    textDecoration: "none",
  },
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

const Button = (props: ButtonOwnProps) => {

  const {
    children,
    disabled = false,
    endIcon: endIconProp,
    fullWidth = false,
    startIcon: startIconProp,
    ...other
  } = props;

  const startIcon = startIconProp && <ButtonStartIcon>{startIconProp}</ButtonStartIcon>;

  const endIcon = endIconProp && <ButtonEndIcon>{endIconProp}</ButtonEndIcon>;

  return (
    <ButtonRoot disabled={disabled} {...other}>
      {startIcon}
      {children}
      {endIcon}
    </ButtonRoot>
  );
};

export default Button;
