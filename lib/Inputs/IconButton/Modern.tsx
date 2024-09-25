import type { ReactNode } from "react";
import styled from "@emotion/styled";

interface ButtonProps {
  children: ReactNode;
}

const StyledButton = styled.button`
  border-radius: 50%;
  color: #124fae;
  background: linear-gradient(180deg, #fbfbfb 20%, #d9d9d9);
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 6px 0 #606164;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: transform 0.1s ease-in-out;

  &:hover {
    color: #199c2c;
    transform: scale(1.01);
  }
`;

export const IconButton = ({ children }: ButtonProps): ReactNode => {
  return <StyledButton>{children}</StyledButton>;
};
