import * as React from "react";

import styled from "@emotion/styled";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  startIcon?: React.ReactNode;
}

const ButtonRoot = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  ".fullwidth": {
    width: "100%",
  },
  ".disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
  "&:hover": {
    textDecoration: "none",
  },
});

const ButtonStartIcon = styled("span")({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
});

const ButtonEndIcon = styled("span")({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
});

const Button = (props: ButtonProps) => {
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
    <ButtonRoot disabled={disabled} className={clsx(fullWidth && "fullwidth")} {...other}>
      {startIcon}
      {children}
      {endIcon}
    </ButtonRoot>
  );
};

export default Button;
