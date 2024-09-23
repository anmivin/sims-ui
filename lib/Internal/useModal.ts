import React, { useContext } from "react";
import { ModalContext } from "./ModalProvider";

export interface UseModalRootSlotOwnProps {
  ref: React.RefCallback<Element> | null;
}

export interface UseModalBackdropSlotOwnProps {
  onClick: React.MouseEventHandler;
  open?: boolean;
}

export interface UseModalReturnValue {
  getRootProps: () => UseModalRootSlotOwnProps;
  /**
   * Resolver for the backdrop slot's props.
   * @param externalProps props for the backdrop slot
   * @returns props that should be spread on the backdrop slot
   */
  getBackdropProps: () => UseModalBackdropSlotOwnProps;
  /**
   * A ref to the component's root DOM element.
   */
  rootRef: React.RefCallback<Element> | null;
  /**
   * A ref to the component's portal DOM element.
   */
  handleClose;
  handleOpen;
}
export interface UseModalProps {
  open: boolean;
  onClose?: () => void;
  rootRef: React.Ref<Element>;
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

  return {
    handleClose,
    handleOpen,
  };
};
