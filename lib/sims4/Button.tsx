import type { ReactNode } from "react";
import styled from "@emotion/styled";

interface ButtonProps {
  children: ReactNode;
  fullWidth?: boolean
}

interface Bur {
  fullWidth: boolean
}


const StyledButton = styled.button<Bur>`
  font-family: The Sims Sans;
  font-size: 20px;
  border-radius: 50px;
  color: #124fae;
  background: linear-gradient(180deg, #fbfbfb 20%, #d9d9d9);
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 6px 0 #606164;
  width: ${(props) => props.fullWidth ? '100%' : '300px'};
  height: 60px;
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

export const Button = ({ children, fullWidth = false }: ButtonProps): ReactNode => {
  return <StyledButton fullWidth={fullWidth}>{children}</StyledButton>;
};
