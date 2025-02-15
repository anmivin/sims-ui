import React from "react";
import { Variant } from "../../shared/types";

export type Alertlevel = "success" | "info" | "warning" | "error";
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  onClose?: () => void;
  children?: React.ReactNode;
  level?: Alertlevel;
}
