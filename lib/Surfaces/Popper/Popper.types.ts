import { ModalProps } from "../../Internal/Modal";
import * as React from "react";

export type BasePlacement = "top" | "bottom" | "left" | "right";
export type BetweenPlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface PopoverProps extends Omit<ModalProps, "children"> {
  anchorEl: HTMLElement | null;
  children?: React.ReactNode;
  onClose?: () => void;
  open: boolean;
  placement?: BasePlacement | BetweenPlacement;
  arrow?: boolean;
}
