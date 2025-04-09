import { InternalStandardProps as StandardProps } from '..';
import { PopoverProps } from '../Surfaces/Popover/Popover.types';
import * as React from "react";
export interface MenuProps extends StandardProps<PopoverProps> {
    anchorEl?: PopoverProps["anchorEl"];
    children?: React.ReactNode;
    onClose?: PopoverProps["onClose"];
    open: boolean;
    variant?: "menu" | "selectedMenu";
}
export declare const MenuPaper: import('@emotion/styled').StyledComponent<{
    theme?: import('@emotion/react').Theme;
    as?: React.ElementType;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
declare const Menu: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
export default Menu;
