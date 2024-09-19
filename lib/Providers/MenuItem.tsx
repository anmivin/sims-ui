import * as React from "react";

import styled from "@emotion/styled";

import ButtonBase from "../Internal/ButtonBase";

const MenuItemRoot = styled(ButtonBase)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  "&:hover": {
    textDecoration: "none",
    backgroundColor: "",
  },
  "-selected": {
    backgroundColor: "",
  },
  "-selectted:hover": {
    backgroundColor: "",
  },

  "-diabled": {
    opacity: 0.5,
  },
});

const MenuItem = (props: MenuItemOwnProps) => {
  const { divider = false, children } = props;

  const menuItemRef = React.useRef(null);

  let tabIndex = -1;

  return <MenuItemRoot tabIndex={tabIndex}>{children}</MenuItemRoot>;
};

export default MenuItem;

export interface MenuItemOwnProps {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider?: boolean;
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected?: boolean;
  children?: React.ReactNode;
}
