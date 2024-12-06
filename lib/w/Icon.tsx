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
  const { ...other } = props;

  return <IconRoot {...other} />;
});

export default Icon;

export interface IconOwnProps {
  /**
   * The name of the icon font ligature.
   */
  children?: React.ReactNode;
}
