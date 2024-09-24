import * as React from "react";

import Modal, { ModalOwnProps } from "../../Internal/MuiModal";

import styled from "@emotion/styled";

export interface DrawerProps extends Omit<ModalOwnProps, "open" | "children"> {
  anchor?: "left" | "top" | "right" | "bottom";
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
}

const DrawerRoot = styled(Modal)({
  zIndex: 1000,
});

const DrawerPaper = styled("div")({
  width: '200px',
  backgroundColor: 'blue',
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
  ".-left": {
    left: 0,
  },
  ".-top": {
    top: 0,
    left: 0,
    right: 0,
    height: "auto",
    maxHeight: "100%",
  },
  ".-right": {
    right: 0,
  },
  ".-bottom": {
    top: "auto",
    left: 0,
    bottom: 0,
    right: 0,
    height: "auto",
    maxHeight: "100%",
  },
});

const Drawer = (props: DrawerProps) => {
  const {
    anchor: anchorProp = "right",
    children,
    hideBackdrop = false,
    onClose,
    open = false,
    ...other
  } = props;

  const drawer = <DrawerPaper className={'-bottom'}>{children}</DrawerPaper>;

  return (
    <DrawerRoot open={open} onClose={onClose} onBackdropClick={onClose} hideBackdrop={hideBackdrop} {...other}>
      {drawer}
    </DrawerRoot>
  );
};

export default Drawer;
