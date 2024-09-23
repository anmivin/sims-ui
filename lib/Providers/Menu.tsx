import * as React from "react";

import MenuList from "./MenuList";
import Popover, { PopoverPaper } from "./Popover";
import styled from "@emotion/styled";

import { PopoverProps } from "./Popover";

export interface MenuProps extends PopoverProps {
  children?: React.ReactNode;
  open: boolean;
}

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
  const { children, onClose, open, ...other } = props;

  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return;
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
      {...other}
    >
      <MenuMenuList>{children}</MenuMenuList>
    </MenuRoot>
  );
};

export default Menu;
