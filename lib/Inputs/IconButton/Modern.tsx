import type { ReactNode } from "react";
import styled from "@emotion/styled";
import IconButton from "./IconButton";
interface ButtonProps {
  children: ReactNode;

}

const StyledButton = styled(IconButton)({
  color: "#124fae",
  backgrounColor: 'red',
  background: "linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",
  boxShadow: "0 4px 6px 0 #606164",
  width: "36px",
  height: "36px",
  transition: "transform 0.1s ease-in-out",

  "&:hover": {
    color: "#199c2c",
    transform: "scale(1.02)",
  },


});

export const IconButtonModern = ({ children }: ButtonProps): ReactNode => {
  return <StyledButton >{children}</StyledButton>;
};
