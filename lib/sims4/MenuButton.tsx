import type { ReactNode } from "react";
import styled from "@emotion/styled";

interface ButtonProps {
  children: ReactNode;
  selected?: boolean
}

interface Bur {
  selected: boolean
}


const StyledButton = styled.button<Bur>`
  font-family: The Sims Sans;
  font-size: 20px;
  border-radius: 10px 10px 0px 0px;
  color: ${(props) => props.selected ? '#fff':'#0949ab'}; ;
  background: ${(props) => props.selected ? 'linear-gradient(180deg, #92ce31 20%, #3bb435)':'linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)'};
  cursor: pointer;
  border: none;
padding: 0;
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

/*   &:hover {
    color: #199c2c;
    transform: scale(1.01);
  } */
`;

export const MenuButton = ({ children, selected = false }: ButtonProps): ReactNode => {
  return <StyledButton selected={selected}>{children}</StyledButton>;
};
