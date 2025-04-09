import { ModalProps } from '../../Internal/Modal';
import * as React from "react";
export interface DialogProps extends Omit<ModalProps, "children"> {
    children?: React.ReactNode;
    fullScreen?: boolean;
    fullWidth?: boolean;
    onBackdropClick?: () => void;
    onClose?: () => void;
    open: boolean;
}
declare const Dialog: (props: DialogProps) => import("react/jsx-runtime").JSX.Element;
export default Dialog;
