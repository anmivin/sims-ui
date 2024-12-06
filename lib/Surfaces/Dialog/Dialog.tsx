import * as React from "react";
import Modal, { ModalProps } from "../../Internal/Modal";
import { clsx } from "clsx";
import styled from "@emotion/styled";

export interface DialogProps extends Omit<ModalProps, "children"> {
  children?: React.ReactNode;
  fullScreen?: boolean;
  fullWidth?: boolean;
  onBackdropClick?: () => void;
  onClose?: () => void;
  open: boolean;
}

const DialogRoot = styled(Modal)({});

const DialogContainer = styled("div")({
  height: "100%",
  outline: 0,
  overflowY: "auto",
  overflowX: "hidden",
  textAlign: "center",
});

const DialogPaper = styled("div")({
  justifyContent: 'center',
  margin: 'auto',
  position: "relative",


  ".fullWidth": {
    width: "calc(100% - 64px)",
  },
  ".fullScreen": {
    margin: 0,
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    maxHeight: "none",
    borderRadius: 0,
  },
});

const Dialog = (props: DialogProps) => {
  const {
    children,
    fullScreen = false,
    fullWidth = false,
    open,
    ...other
  } = props;



  return (
    <DialogRoot  open={open}  {...other}>
      <DialogContainer>
        <DialogPaper className={clsx('dialogPaper', fullScreen && 'fullScreen', fullWidth && 'fullWidth')}>{children}</DialogPaper>
      </DialogContainer>
    </DialogRoot>
  );
};

export default Dialog;
