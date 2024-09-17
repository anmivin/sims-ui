import * as React from "react";

import { useRtl } from "@mui/system/RtlProvider";
import useSlotProps from "@mui/utils/useSlotProps";
import MenuList from "./MenuList";
import Popover, { PopoverPaper } from "./Popover";
import rootShouldForwardProp from "../mui/mui-material/src/styles/rootShouldForwardProp";
import styled from "@emotion/styled";
import { useDefaultProps } from "../DefaultPropsProvider";
import { getMenuUtilityClass } from "./menuClasses";

const LTR_ORIGIN = {
  vertical: "top",
  horizontal: "left",
};

const MenuRoot = styled(Popover)({});

export const MenuPaper = styled(PopoverPaper)({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch",
});

const MenuMenuList = styled(MenuList)({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiMenu" });

  const {
    autoFocus = true,
    children,
    className,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open,
    PaperProps = {},
    PopoverClasses,
    transitionDuration = "auto",
    TransitionProps: { onEntering, ...TransitionProps } = {},
    variant = "selectedMenu",
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const isRtl = useRtl();

  const ownerState = {
    ...props,
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant,
  };

  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;

  const menuListActionsRef = React.useRef(null);

  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, {
        direction: isRtl ? "rtl" : "ltr",
      });
    }

    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();

      if (onClose) {
        onClose(event, "tabKeyDown");
      }
    }
  };

  /**
   * the index of the item should receive focus
   * in a `variant="selectedMenu"` it's the first `selected` item
   * otherwise it's the very first item.
   */
  let activeItemIndex = -1;
  // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback
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

  const PaperSlot = slots.paper ?? MenuPaper;
  const paperExternalSlotProps = slotProps.paper ?? PaperProps;

  const rootSlotProps = useSlotProps({
    elementType: slots.root,
    externalSlotProps: slotProps.root,
    ownerState,
    className: [classes.root, className],
  });

  const paperSlotProps = useSlotProps({
    elementType: PaperSlot,
    externalSlotProps: paperExternalSlotProps,
    ownerState,
    className: classes.paper,
  });

  return (
    <MenuRoot
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: isRtl ? "right" : "left",
      }}
      transformOrigin={isRtl ? RTL_ORIGIN : LTR_ORIGIN}
      slots={{
        paper: PaperSlot,
        root: slots.root,
      }}
      slotProps={{
        root: rootSlotProps,
        paper: paperSlotProps,
      }}
      open={open}
      ref={ref}
      transitionDuration={transitionDuration}
      TransitionProps={{ onEntering: handleEntering, ...TransitionProps }}
      ownerState={ownerState}
      {...other}
      classes={PopoverClasses}
    >
      <MenuMenuList
        onKeyDown={handleListKeyDown}
        actions={menuListActionsRef}
        autoFocus={autoFocus && (activeItemIndex === -1 || disableAutoFocusItem)}
        autoFocusItem={autoFocusItem}
        variant={variant}
        {...MenuListProps}
        className={clsx(classes.list, MenuListProps.className)}
      >
        {children}
      </MenuMenuList>
    </MenuRoot>
  );
});

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
