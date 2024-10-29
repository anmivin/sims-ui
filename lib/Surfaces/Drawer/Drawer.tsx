import * as React from "react";
import clsx from "clsx";
import Modal, { ModalProps } from "../../Internal/Modal";

import styled from "@emotion/styled";

export interface DrawerProps extends Omit<ModalProps, "open" | "children"> {
  anchor?: "left" | "right" 
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
}

const DrawerRoot = styled(Modal)({
  zIndex: 1000,
});

const DrawerPaper = styled("div")({
  width: "600px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  flex: "1 0 auto",
  zIndex: 1000,
  position: "fixed",
  top: 0,
  outline: 0,
  right: 0,
  ".left": {
    left: 0,
  },
  ".right": {
    right: 0,
  },
});

const Drawer = (props: DrawerProps) => {
  const {
    anchor = "right",
    children,
    hideBackdrop = false,
    onClose,
    open = false,
    ...other
  } = props;

  return (
    <DrawerRoot
      open={open}
      onClose={onClose}
      onBackdropClick={onClose}
      hideBackdrop={hideBackdrop}
      {...other}
    >
      <DrawerPaper className={clsx("paper", anchor)}>{children}</DrawerPaper>
    </DrawerRoot>
  );
};

export default Drawer;
