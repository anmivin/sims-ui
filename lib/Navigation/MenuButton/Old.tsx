import React from "react";
import styled from "@emotion/styled";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  selected?: boolean;
}

const StyledButton = styled('button')({
    position: "relative",
    boxSizing: "border-box",
    outline: 0,
    margin: 0,
    textDecoration: "none",
    "-disabled": {
      pointerEvents: "none",
      cursor: "default",
    },

  fontFamily: 'Comic Sans Ms',
  fontSize: '20px',
  fontWeight: 600,
  borderRadius: '10px 10px 0px 0px',
  color:"#132178",
 backgroundColor: "#7997d5",
  cursor: 'pointer',
  border: 'none',
  padding: 0,
  width: '300px',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',

  '.active-selected': {
    backgroundColor: "#94abdd",
  }
})

;

export const MenuButtonOld= ({ children, selected = false }: ButtonProps): React.ReactNode => {
  return <StyledButton className={clsx(selected && 'active-selected')}>{children}</StyledButton>;
};
