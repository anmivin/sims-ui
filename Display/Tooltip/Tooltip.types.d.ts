import { PopperProps } from '../../Internal/Popper';
import { Variant } from '../../shared/types';
import * as React from "react";
export interface TooltipProps extends Omit<PopperProps, "children" | "anchorEl" | "open"> {
    children: React.ReactElement;
    placement?: "bottom" | "left" | "right" | "top";
    text?: React.ReactNode;
    variant?: Variant;
}
