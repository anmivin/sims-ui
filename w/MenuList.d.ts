import * as React from "react";
export interface MenuListOwnProps {
    children?: React.ReactNode;
    disableListWrap?: boolean;
    variant?: "menu" | "selectedMenu";
    subheader?: React.ReactNode;
}
declare const MenuList: React.ForwardRefExoticComponent<MenuListOwnProps & React.RefAttributes<HTMLUListElement>>;
export default MenuList;
