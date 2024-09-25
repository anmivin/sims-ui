import * as React from "react";

import styled from "@emotion/styled";

const stylesMap = {
  "1": {
    fontSize: "",
    fontStyle: "",
    fontWeight: "",
    letterSpacing: "",
    textTransform: "",
    lineHeight: "",
    textAlign: "",
  },
};

export const TypographyRoot = styled("span")({
  margin: 0,
  fontFamily: "",
  "-nowrap": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ...stylesMap,
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

const Typography = (props: TypographyOwnProps) => {
  const { noWrap = false, variant = "body1", ...other } = props;

  const Component = defaultVariantMapping[variant] || "span";

  return <TypographyRoot as={Component} className={noWrap ? "noWrap" : undefined} {...other} />;
};

export default Typography;

import { Variant } from "../../mui/mui-material/src/styles/createTypography";

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
  variant?: Variant;
}
