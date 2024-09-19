import * as React from "react";

import MenuList from "./MenuList";
import Popover, { PopoverPaper } from "./Popover";
import styled from "@emotion/styled";

const LTR_ORIGIN = {
  vertical: "top",
  horizontal: "left",
};

const MenuRoot = styled(Popover)({});

export const MenuPaper = styled(PopoverPaper)({
  maxHeight: "calc(100% - 96px)",
});

const MenuMenuList = styled(MenuList)({
  outline: 0,
});

const Menu = (props: MenuProps, ref) => {
  const {
    children,
    onClose,
    open,
    transitionDuration = "auto",
    variant = "selectedMenu",
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const menuListActionsRef = React.useRef(null);
  let activeItemIndex = -1;
  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return;
    }

    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });

  return (
    <MenuRoot
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={LTR_ORIGIN}
      open={open}
      ref={ref}
      transitionDuration={transitionDuration}
      {...other}
    >
      <MenuMenuList actions={menuListActionsRef} variant={variant}>
        {children}
      </MenuMenuList>
    </MenuRoot>
  );
};

export default Menu;

import { PopoverProps } from "./Popover";

export interface MenuProps extends Omit<PopoverProps, "anchorEl"> {
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl?: PopoverProps["anchorEl"];
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant?: "menu" | "selectedMenu";
}
