import type { ReactNode } from "react";
import styled from "@emotion/styled";
import Button from './Button'
import React from "react";
interface ButtonProps {
  children: ReactNode;
}

const StyledButton = styled(Button)({
  fontFamily: 'Comic Sans Ms',
  fontSize: '30px',
  fontWeight: 500,
  borderRadius: '15px',
  color: '#100d60',
  border: '4px solid #000d60',
  backgroundColor: '#95a6de',
  cursor: 'pointer',
  height: '60px',
/*   outline: '2px solid #000d60',
  boxShadow: 'inset 0px 0px 0px 2px #000d60', */

 ':before': {
    content: '""',
    position: 'absolute',
    top: '-3px',
    left: '-3px',
    right: '-3px',
    bottom: '-3px',
    border: '2px solid #000d60',
    borderRadius: '14px',

  } ,    '&:hover:before': {
      border: '2px solid white',
    },
    '&:active:before': {
      border: '2px solid #00ff00',
    },
})

;
export const OldButton = ({ children }: ButtonProps): ReactNode => {
  return <StyledButton>{children}</StyledButton>;
};
