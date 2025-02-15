import styled from "@emotion/styled";
import * as React from "react";
import clsx from "clsx";

const Button = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "&.disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
});

const DefaultButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props) => {
  const { disabled, children, className, ...other } = props;

  return (
    <Button className={clsx(disabled && "disabled", className)} {...other}>
      {children}
    </Button>
  );
});

export default DefaultButton;
