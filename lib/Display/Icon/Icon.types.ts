import { FC, HTMLAttributes, ReactNode } from "react";

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  viewBox?: string;
  color?: string;
  isFilledIcon?: boolean;
  responsive?: boolean;
  children?: ReactNode;
}
export type IconComponent = FC<IconProps>;
