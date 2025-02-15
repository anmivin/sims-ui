import styled from "@emotion/styled";
import * as React from "react";
import clsx from "clsx";

const Input = styled("input")({
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
  "&.disabled": {
    cursor: "default",
    pointerEvents: "none",
  },
});

const DefaultInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props) => {
  const { disabled, ...other } = props;
  return <Input {...other} className={clsx(disabled && "desabled")} />;
});

export default DefaultInput;
