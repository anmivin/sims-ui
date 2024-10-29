import type { ReactNode } from "react";
import styled from "@emotion/styled";
import Button, { ButtonProps } from "./Button";

const StyledButton = styled(Button)({
  fontFamily: "The Sims Sans",
  fontSize: "20px",
  borderRadius: "50px",
  color: "#0949ab",
  background: "linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",
  boxShadow: "0 4px 6px 0 #606164",
  width: "300px",
  height: "60px",
  gap: "10px",
  transition: "transform 0.1s ease-in-out",

  "&:hover": {
    color: "#199c2c",
    transform: "scale(1.01)",
  },

  "&:active": {
    color: "#006634",
    background: "linear-gradient(180deg, #e1e1e1 20%, #c3c3c3)",
  },
});

export const ModernButton = ({
  children,
  disabled,
  endIcon,
  fullWidth,
  href,
  startIcon,
  onClick,
}: ButtonProps): ReactNode => {
  return (
    <StyledButton
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      href={href}
    >
      {children}
    </StyledButton>
  );
};
