import * as React from "react";

import styled from "@emotion/styled";

export const fontFamily = style({
  prop: "fontFamily",
  themeKey: "typography",
});

export const fontSize = style({
  prop: "fontSize",
  themeKey: "typography",
});

export const fontStyle = style({
  prop: "fontStyle",
  themeKey: "typography",
});

export const fontWeight = style({
  prop: "fontWeight",
  themeKey: "typography",
});

export const letterSpacing = style({
  prop: "letterSpacing",
});

export const textTransform = style({
  prop: "textTransform",
});

export const lineHeight = style({
  prop: "lineHeight",
});

export const textAlign = style({
  prop: "textAlign",
});

export const typographyVariant = style({
  prop: "typography",
  cssProperty: false,
  themeKey: "typography",
});

export const TypographyRoot = styled("span")({
  margin: 0,
  "-nowrap": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ...Object.entries(theme.typography).map(([variant, value]) => ({ [variant]: value })),
});

const defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
};

const Typography = React.forwardRef(function Typography(props: TypographyOwnProps, ref) {
  const { align = "inherit", noWrap = false, variant = "body1", ...other } = props;

  const Component = defaultVariantMapping[variant] || "span";

  return <TypographyRoot as={Component} ref={ref} {...other} />;
});

export default Typography;

import { OverridableStringUnion } from "@mui/types";
import { Variant } from "../mui/mui-material/src/styles/createTypography";

export interface TypographyOwnProps {
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align?: "inherit" | "left" | "center" | "right" | "justify";
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap?: boolean;

  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant?: OverridableStringUnion<Variant | "inherit", TypographyPropsVariantOverrides>;
}
