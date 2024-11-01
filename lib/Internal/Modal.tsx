import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "@emotion/styled";
import { useModal } from "../Providers/Modal/useModal";

export interface ModalProps {
  children: React.ReactElement<unknown>;
  hideBackdrop?: boolean;
  onBackdropClick?: () => void;
  onClose?: () => void;
  open: boolean;
}

const ModalRoot = styled("div")({
  position: "fixed",
  zIndex: "1000",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
});

const ModalBackdrop = styled("div")({
  zIndex: -1,
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
});

const Modal = (props: ModalProps) => {
  const { children, hideBackdrop = false, onBackdropClick, onClose, open } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setMountNode(document.body);
  }, []);

  useModal({
    onClose,
    open,
  });

  if (!open) {
    return null;
  }

  return (
    <React.Fragment>
      {mountNode
        ? ReactDOM.createPortal(
            <ModalRoot ref={ref}>
              {!hideBackdrop ? <ModalBackdrop onClick={() => onBackdropClick?.()} /> : null}

              {children}
            </ModalRoot>,
            mountNode
          )
        : mountNode}
    </React.Fragment>
  );
};

export default Modal;
