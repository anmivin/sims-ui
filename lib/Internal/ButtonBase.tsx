import React, { ReactNode } from "react";
import styled from "@emotion/styled";

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content of the component.
   */
  children?: ReactNode;

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
}

export const ButtonBaseRoot = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "-disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
});

const ButtonBase = (props: ButtonBaseProps) => {
  const { children, disabled = false, ...other } = props;

  return (
    <ButtonBaseRoot className={disabled ? "-disabled" : undefined} {...other}>
      {children}
    </ButtonBaseRoot>
  );
};

export default ButtonBase;
