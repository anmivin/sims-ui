import styled from "@emotion/styled";

import Dialog, { DialogProps } from "./Dialog";

import IconButton from "../../Inputs/IconButton/IconButton";
import CloseIcon from "../../Display/Icon/Modern/CloseIcon";
import Button from "../../Inputs/Button/Button";

const StyledWrapper = styled("div")({
  fontFamily: "Comic Sans Ms",
  width: "600px",
  backgroundColor: "rgba(81, 115, 189, 0.9)",
  borderRadius: "40px",
  border: "4px solid #121b61",
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
});

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  border: "2px solid #121b61",
  backgroundColor: "#95a6de",
  borderRadius: "30px",
  fontSize: "18px",
});

const Body = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  color: "#100d60",
});

const Footer = styled("div")({
  borderRadius: "3% 3% 0px 0px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  gap: "20px",
});

const Header = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  padding: "20px",
  color: "#100d60",
});

interface OldDialogProps extends DialogProps {
  title?: string;
  actions?: { title: string; action: () => void }[];
}

export const DialogOld = ({ title, children, open, onClose, actions }: OldDialogProps) => {
  return (
    <Dialog open={open}>
      <StyledWrapper>
        <Content>
          <Header>
            <h1 style={{ color: "#100d60", margin: 0 }}>{title}</h1>
            {onClose && (
              <IconButton>
                <CloseIcon onClick={() => onClose()} />
              </IconButton>
            )}
          </Header>
          <Body> {children}</Body>
        </Content>
        <Footer>
          {actions?.map((item) => (
            <Button onClick={item.action}>{item.title}</Button>
          ))}
        </Footer>
      </StyledWrapper>
    </Dialog>
  );
};
