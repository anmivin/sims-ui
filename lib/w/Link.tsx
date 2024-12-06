import * as React from "react";

import isFocusVisible from "../utils/isFocusVisible";
import styled from "@emotion/styled";
import Typography from "./Typography";
import getTextDecoration from "./getTextDecoration";

const LinkRoot = styled(Typography)({
  "-button": {
    position: "relative",
    WebkitTapHighlightColor: "transparent",
    backgroundColor: "transparent", // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    MozAppearance: "none", // Reset
    WebkitAppearance: "none", // Reset
  },
  "-underline-none": {
    textDecoration: "none",
  },
  "-underline-hover": {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const Link = React.forwardRef(function Link(props: LinkOwnProps, ref) {
  const { color = "primary", component = "a", underline = "always", ...other } = props;

  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleBlur = (event) => {
    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = (event) => {
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  const ownerState = {
    ...props,
    color,
    component,
    focusVisible,
    underline,
    variant,
  };

  return (
    <LinkRoot
      color={color}
      component={component}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={ref}
      ownerState={ownerState}
      variant={variant}
      {...other}
    />
  );
});

export default Link;

import { getPath } from "@mui/system/style";
import { alpha } from "@mui/system/colorManipulator";
import type { Theme } from "../mui/mui-material/src/styles";

const getTextDecoration = <T extends Theme>({
  theme,
  ownerState,
}: {
  theme: T;
  ownerState: { color: string };
}) => {
  const transformedColor = ownerState.color;
  const color = (getPath(theme, `palette.${transformedColor}`, false) ||
    ownerState.color) as string;
  const channelColor = getPath(theme, `palette.${transformedColor}Channel`) as string | null;
  if ("vars" in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return alpha(color, 0.4);
};

export default getTextDecoration;

import { DistributiveOmit } from "@mui/types";

import { TypographyOwnProps } from "../Typography";

export interface LinkOwnProps extends DistributiveOmit<LinkBaseProps, "classes"> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The color of the link.
   * @default 'primary'
   */
  color?: TypographyOwnProps["color"];
  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline?: "none" | "hover" | "always";
}
