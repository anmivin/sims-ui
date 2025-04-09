import { ModalProps } from '../../Internal/Modal';
import * as React from "react";
export interface DrawerProps extends Omit<ModalProps, "open" | "children"> {
    anchor?: "left" | "right";
    children?: React.ReactNode;
    onClose?: () => void;
    open?: boolean;
}
declare const Drawer: (props: DrawerProps) => import("react/jsx-runtime").JSX.Element;
export default Drawer;
