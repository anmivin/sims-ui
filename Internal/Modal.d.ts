import * as React from "react";
export interface ModalProps {
    children: React.ReactElement<unknown>;
    hideBackdrop?: boolean;
    onBackdropClick?: () => void;
    onClose?: () => void;
    open: boolean;
    invisibleBackdrop?: boolean;
}
declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement | null>>;
export default Modal;
