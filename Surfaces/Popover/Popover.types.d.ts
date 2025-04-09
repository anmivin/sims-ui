import { ModalProps } from '../../Internal/Modal';
import * as React from "react";
export interface PopoverOrigin {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
}
export interface PopoverProps extends Omit<ModalProps, "children"> {
    anchorEl: HTMLElement | null;
    anchorOrigin?: PopoverOrigin;
    children?: React.ReactNode;
    onClose?: () => void;
    open: boolean;
    transformOrigin?: PopoverOrigin;
}
export interface ElementRectProps {
    width: number;
    height: number;
}
