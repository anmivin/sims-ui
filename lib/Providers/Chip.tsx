import * as React from "react";

import CancelIcon from "../internal/svg-icons/Cancel";
import useForkRef from "../utils/useForkRef";

import ButtonBase from "./ButtonBase";
import styled from "@emotion/styled/macro";

const ChipRoot = styled("div")({
  maxWidth: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 32,
  borderRadius: 32 / 2,
  whiteSpace: "nowrap",
  cursor: "unset",
  outline: 0,
  textDecoration: "none",
  border: 0, // Remove `button` border
  padding: 0, // Remove `button` padding
  verticalAlign: "middle",
  boxSizing: "border-box",

  "-disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },
  "-icon": {
    marginLeft: 5,
    marginRight: -6,
  },
  "-deleteIcon": {
    cursor: "pointer",
    margin: "0 5px 0 -6px",
    "&:hover": {},
  },

  "-clickable": {
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "",
    },
    "&:active": {
      boxShadow: "",
    },
  },
});

const ChipLabel = styled("span")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: "nowrap",
});

const Chip = React.forwardRef(function Chip(props: ChipOwnProps, ref) {
  const {
    clickable: clickableProp,
    disabled = false,
    icon: iconProp,
    label,
    onDelete,
    ...other
  } = props;

  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);

  const handleDeleteIconClick = (event) => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };

  const clickable = clickableProp !== false && onClick ? true : clickableProp;

  const component = clickable || onDelete ? ButtonBase : "div";

  const ownerState = {
    ...props,
    component,
    disabled,
    onDelete: !!onDelete,
    clickable,
  };

  return (
    <ChipRoot
      as={component}
      disabled={clickable && disabled ? true : undefined}
      onClick={onClick}
      ref={handleRef}
      tabIndex={skipFocusWhenDisabled && disabled ? -1 : tabIndex}
      ownerState={ownerState}
      {...other}
    >
      {iconProp}
      <ChipLabel>{label}</ChipLabel>
      <CancelIcon onClick={handleDeleteIconClick} />
    </ChipRoot>
  );
});

export default Chip;

export interface ChipOwnProps {
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children?: null;
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable?: boolean;

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon element.
   */
  icon?: React.ReactElement<unknown>;
  /**
   * The content of the component.
   */
  label?: React.ReactNode;
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete?: React.EventHandler<any>;
}
