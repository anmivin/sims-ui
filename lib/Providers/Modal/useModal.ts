import React, { useContext } from "react";
import { ModalContext } from "./ModalProvider";

export interface UseModalProps {
  open: boolean;
  onClose?: () => void;
}

export const useModal = (props: UseModalProps) => {
  const { open, onClose } = props;
  const context = useContext(ModalContext);

  const modal = React.useRef<{ modalRef: HTMLDivElement; mount: HTMLElement }>({});
  const mountNodeRef = React.useRef<HTMLElement | null>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const getModal = () => {
    modal.current.modalRef = modalRef.current!;
    modal.current.mount = mountNodeRef.current!;
    return modal.current;
  };

  const handleOpen = React.useCallback(() => {
    context.add(getModal());
  }, []);

  const handleClose = React.useCallback(() => {
    onClose?.();
    context.remove(getModal());
  }, []);

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open]);
};
