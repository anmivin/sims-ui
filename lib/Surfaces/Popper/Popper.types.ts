import { ModalProps } from "../../Internal/Modal";
import * as React from "react";

export interface PopoverOrigin {
  vertical: "top" | "center" | "bottom";
  horizontal: "left" | "center" | "right";
}

export const placementArray = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;
export type Placement = (typeof placementArray)[number];
export interface PopoverProps extends Omit<ModalProps, "children"> {
  anchorEl: HTMLElement | null;
  children?: React.ReactNode;
  onClose?: () => void;
  open: boolean;
  placement?: Placement;
}
