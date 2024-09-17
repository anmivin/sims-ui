import * as React from "react";

import styled from "@emotion/styled";

const IconRoot = styled("span")({
  userSelect: "none",
  width: "1em",
  height: "1em",
  overflow: "hidden",
  display: "inline-block", // allow overflow hidden to take action
  textAlign: "center", // support non-square icon
  flexShrink: 0,

  "-disabled": {
    color: "gray",
  },
});

const Icon = React.forwardRef(function Icon(props: IconOwnProps, ref) {
  const { fontSize = "medium", ...other } = props;

  const ownerState = {
    ...props,
    fontSize,
  };

  return <IconRoot as={Component} ownerState={ownerState} aria-hidden ref={ref} {...other} />;
});

export default Icon;

export interface IconOwnProps {
  /**
   * The name of the icon font ligature.
   */
  children?: React.ReactNode;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize?: OverridableStringUnion<
    "inherit" | "large" | "medium" | "small",
    IconPropsSizeOverrides
  >;
}
