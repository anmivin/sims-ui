import * as React from "react";

import styled from "@emotion/styled";
import clsx from "clsx";

export interface IconButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
}

const IconButtonRoot = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  padding: 0,
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  textAlign: "center",
  flex: "0 0 auto",
  borderRadius: "50%",

  ".disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
});

const IconButton = (props: IconButtonProps) => {
  const { children, disabled = false, error, ...other } = props;

  return (
    <IconButtonRoot
      disabled={disabled}
      className={clsx(disabled && "disabled", error && "error")}
      {...other}
    >
      {children}
    </IconButtonRoot>
  );
};

export default IconButton;
