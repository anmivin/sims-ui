import * as React from "react";
export type Placement = "top" | "bottom" | "left" | "right";
export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
    anchorEl: HTMLElement | null;
    children?: React.ReactNode;
    onClose?: () => void;
    open: boolean;
    placement?: Placement;
}
declare const Popper: React.ForwardRefExoticComponent<PopperProps & React.RefAttributes<HTMLDivElement>>;
export default Popper;
