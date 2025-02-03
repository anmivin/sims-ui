import styled from "@emotion/styled";
import React from "react";

import { IconButtonModern } from "sims-ui";
import CloseIcon from "../../icons/Modern/CloseIcon";
import { ModernButton } from "sims-ui";

const StyledContainer = styled("div")(({ theme }) => ({
  width: "360px",
  color: "white",
  borderRadius: "8px",
  "&.success": {
    background: theme.color.alertSuccess,
  },
  "&.warning": {
    background: theme.color.alertWarning,
  },
  "&.info": {
    background: theme.color.alertInfo,
  },
  "&.error": {
    background: theme.color.alertError,
  },
}));

const Header = styled.div`
  width: 100%;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 4px;
  display: flex;
  justify-content: end;
`;
const Content = styled("div")({
  padding: "16px",
});
export const AlertModern = ({
  children,
  action,
  className,
}: {
  children: React.ReactNode;
  action?: () => void;
  className: "success" | "warning" | "info" | "error";
}) => {
  return (
    <StyledContainer className={className}>
      <Header>
        <IconButtonModern>
          <CloseIcon color='#9f1a1f' />
        </IconButtonModern>
      </Header>
      <Content>
        {children}
        {action && <ModernButton />}
      </Content>
    </StyledContainer>
  );
};
