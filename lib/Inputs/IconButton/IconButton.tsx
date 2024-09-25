import * as React from "react";

import styled from "@emotion/styled";
export interface IconButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
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
  padding: 8,
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  textAlign: "center",
  flex: "0 0 auto",
  borderRadius: "50%",
  transition: "",

  "-disabled": {
    backgroundColor: "transparent",
    color: "gray",
    pointerEvents: "none",
    cursor: "default",
  },
});

const IconButton = (props: IconButtonProps) => {
  const { children, disabled = false } = props;

  return <IconButtonRoot disabled={disabled}>{children}</IconButtonRoot>;
};

export default IconButton;
