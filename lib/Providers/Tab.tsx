import * as React from "react";

import ButtonBase from "./ButtonBase";

import styled from "@emotion/styled";

const TabRoot = styled(ButtonBase)({
  maxWidth: 360,
  minWidth: 90,
  position: "relative",
  minHeight: 48,
  flexShrink: 0,
  padding: "12px 16px",
  overflow: "hidden",
  whiteSpace: "normal",
  textAlign: "center",
  lineHeight: 1.25,
  "-icon-top": {
    flexDirection: "column",
  },
  "-icon-bottom": {
    flexDirection: "column",
  },
  "-icon-left": {
    flexDirection: "row",
  },
  "-icon-right": {
    flexDirection: "row",
  },
  "-label": {
    minHeight: 72,
    paddingTop: 9,
    paddingBottom: 9,
  },
});

const Tab = React.forwardRef(function Tab(props: TabOwnProps, ref) {
  const {
    disabled = false,
    icon: iconProp,
    iconPosition = "top",
    label,
    onChange,
    onClick,
    onFocus,
    selected,
    value,
    ...other
  } = props;

  const ownerState = {
    ...props,
    disabled,
    disableFocusRipple,
    selected,
    icon: !!iconProp,
    iconPosition,
    label: !!label,
    fullWidth,
    textColor,
    wrapped,
  };

  const icon =
    iconProp && label && React.isValidElement(iconProp) ? React.cloneElement(iconProp) : iconProp;
  const handleClick = (event) => {
    if (!selected && onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleFocus = (event) => {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  return (
    <TabRoot
      ref={ref}
      role='tab'
      aria-selected={selected}
      disabled={disabled}
      onClick={handleClick}
      onFocus={handleFocus}
      tabIndex={selected ? 0 : -1}
      {...other}
    >
      {iconPosition === "top" || iconPosition === "start" ? (
        <React.Fragment>
          {icon}
          {label}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {label}
          {icon}
        </React.Fragment>
      )}

      {indicator}
    </TabRoot>
  );
});

export default Tab;

export interface TabOwnProps {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The icon to display.
   */
  icon?: string | React.ReactElement<unknown>;
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition?: "top" | "bottom" | "start" | "end";
  /**
   * The label element.
   */
  label?: React.ReactNode;
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value?: any;
}
