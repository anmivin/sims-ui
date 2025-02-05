import { Variant, ComponentSize } from "../../shared/types";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  variant?: Variant;
  size?: ComponentSize;
}
