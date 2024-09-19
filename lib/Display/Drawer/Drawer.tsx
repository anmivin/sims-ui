import * as React from "react";

import Modal from "../../Providers/MuiModal";

import styled from "@emotion/styled";

const DrawerRoot = styled(Modal)({
  zIndex: 1000,
});

const DrawerDockedRoot = styled("div")({
  flex: "0 0 auto",
});

const DrawerPaper = styled("div")({
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  flex: "1 0 auto",
  zIndex: 1000,
  // temporary style
  position: "fixed",
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0,
  "-left": {
    left: 0,
  },
  "-top": {
    top: 0,
    left: 0,
    right: 0,
    height: "auto",
    maxHeight: "100%",
  },
  "-right": {
    right: 0,
  },
  "-bottom": {
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
    anchor: anchorProp = "left",
    children,
    hideBackdrop = false,
    onClose,
    open = false,
    variant = "temporary",
    ...other
  } = props;

  const drawer = <DrawerPaper>{children}</DrawerPaper>;

  if (variant === "permanent") {
    return <DrawerDockedRoot {...other}>{drawer}</DrawerDockedRoot>;
  }

  if (variant === "persistent") {
    return <DrawerDockedRoot {...other}>{drawer}</DrawerDockedRoot>;
  }

  // variant === temporary
  return (
    <DrawerRoot open={open} onClose={onClose} hideBackdrop={hideBackdrop} {...other}>
      {drawer}
    </DrawerRoot>
  );
};

export default Drawer;

import { ModalProps } from "../../Providers/MuiModal";

export interface DrawerProps extends Omit<ModalProps, "open" | "children"> {
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor?: "left" | "top" | "right" | "bottom";
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: ModalProps["onClose"];
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open?: boolean;

  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant?: "permanent" | "persistent" | "temporary";
}
