import { Variant, ComponentSize } from "../../shared/types";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: Variant;
  size?: ComponentSize;
}
