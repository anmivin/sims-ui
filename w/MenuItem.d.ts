import * as React from "react";
export interface MenuItemOwnProps {
    disabled?: boolean;
    selected?: boolean;
}
export declare const MenuItemRoot: import('@emotion/styled').StyledComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement> & {
    theme?: import('@emotion/react').Theme;
}, {}, {}>;
declare const MenuItem: React.ForwardRefExoticComponent<MenuItemOwnProps & React.RefAttributes<HTMLLIElement>>;
export default MenuItem;
