import * as React from "react";

import styled from "@emotion/styled";

import { Variant } from "../../mui/mui-material/src/styles/createTypography";

export interface TypographyOwnProps {
  align?: "inherit" | "left" | "center" | "right" | "justify";
  children?: React.ReactNode;
  noWrap?: boolean;
  variant?: Variant;
}

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
