import styled from "@emotion/styled";

import Button from "../../Inputs/Button/Button";
import Dialog, { DialogProps } from "./Dialog";
/* import { IconButtonModern } from "sims-ui"; */
const StyledWrapper = styled("div")({
  fontFamily: "The Sims Sans",
  width: "600px",
  backgroundColor: "rgba(251, 251, 251, 0.7)",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 0px 9px 1px rgba(0, 0, 0, 0.3)",
});

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  borderRadius: "3% 3% 0px 0px",
  backgroundColor: "#fff",
  color: "#1e81e0",
});

const Body = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  color: "#1e81e0",
});

const Footer = styled("div")({
  borderRadius: "3% 3% 0px 0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  gap: "16px",
});

const Header = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  padding: "16px",
});

interface ModernDialogProps extends DialogProps {
  title?: string;
  actions?: { title: string; action: () => void }[];
}
export const DialogModern = ({ title, children, open, onClose, actions }: ModernDialogProps) => {
  return (
    <Dialog open={open} onBackdropClick={onClose} fullScreen={true}>
      <StyledWrapper>
        <Content>
          <Header>
            <h2 style={{ color: "#0949ab", margin: 0 }}>{title}</h2>

            {/*             {onClose && (
              <IconButtonModern onClick={() => onClose?.()}>
                <CloseIcon />
              </IconButtonModern>
            )} */}
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
