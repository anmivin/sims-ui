import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const MainWrapper = styled("div")<Theme>`
  height: 100vh;
  padding: 10px;
  background: ${(props) => props.theme.color.alertBrown};
  color: ${(props) => props.theme.color.alertSuccess};
`;

export const Button = styled.div<{
  theme: Theme;
  active?: boolean;
}>`
  display: flex;
  cursor: pointer;
  background: ${(props) =>
    props.active ? props.theme.color.blueMenu : props.theme.color.buttonMenu};
`;
