import styled from "@emotion/styled";
import React from "react";
import Dialog, { DialogProps } from "./Dialog";

import IconButton from "../../Inputs/IconButton/IconButton";
import CloseIcon from "../../icons/Modern/CloseIcon";
import { OldButton } from "../../Inputs/Button/Old";

const StyledWrapper = styled.div`
  border: 4px solid #121b61;
  width: 300px;
  height: 300px;
  background-color: rgba(81, 115, 189, 0.9);
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  border: 2px solid #121b61;
  width: 260px;
  height: 260px;
  background-color: #95a6de;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const Footer = styled.div`
  border-radius: 3% 3% 0px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
`;

interface OldDialogProps extends DialogProps {
  title: string;
}

export const DialogOld = ({ title, children, open, onClose }: OldDialogProps) => {
  return (
    <Dialog open={open}>
      <StyledWrapper>
        <Content>
          <Header>
            <h1 style={{ color: "#0949ab" }}>{title}</h1>
            {onClose && (
              <IconButton>
                <CloseIcon onClick={() => onClose()} />
              </IconButton>
            )}
          </Header>
          {children}
        </Content>
        <Footer>
          <OldButton>sdfsdfsfd</OldButton>
          <OldButton>sdfsdfsfd</OldButton>
        </Footer>
      </StyledWrapper>
    </Dialog>
  );
};
