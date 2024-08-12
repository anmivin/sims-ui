import type { ReactNode } from "react";
import styled from "@emotion/styled";
import React from "react";
interface ButtonProps {
  children: ReactNode;
}

const StyledButton = styled.button`
  font-family: Comic Sans Ms;
  font-size: 30px;
  fornt-weight: 500;
  border-radius: 15px;
  color: #100d60;
  border: 4px solid #000d60;
  background-color: #95a6de;
  cursor: pointer;
  /*  width: 100px; */
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const Button2 = ({ children }: ButtonProps): ReactNode => {
  return <StyledButton>{children}</StyledButton>;
};
