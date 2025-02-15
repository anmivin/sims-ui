import styled from "@emotion/styled";

export const TextRoot = styled("span")({
  margin: 0,
  "&.h1": {
    fontSize: 40,
    lineHeight: "48px",
    fontWeight: 500,
    letterSpacing: 0.2,
  },
  "&.h2": {
    fontSize: 32,
    lineHeight: "40px",
    fontWeight: 500,
    letterSpacing: 0.1,
  },
  "&.h3": {
    fontSize: 28,
    lineHeight: "36px",
    fontWeight: 500,
    letterSpacing: 0,
  },
  "&.h4": {
    fontSize: 24,
    lineHeight: "28px",
    fontWeight: 500,
    letterSpacing: 0.15,
  },
  "&.h5": {
    fontSize: 20,
    lineHeight: "24px",
    fontWeight: 500,
    letterSpacing: 0.2,
  },
  "&.h6": {
    fontSize: 18,
    lineHeight: "24px",
    fontWeight: 500,
    letterSpacing: 0.15,
  },
  "&.subtitle1": {
    fontSize: 20,
    lineHeight: "20px",
    fontWeight: 600,
    letterSpacing: 0.15,
  },
  "&.subtitle2": {
    fontSize: 18,
    lineHeight: "20px",
    fontWeight: 600,
    letterSpacing: 0.1,
  },
  "&.body1": {
    fontSize: 18,
    lineHeight: "28px",
    fontWeight: 400,
    letterSpacing: 0.5,
  },
  "&.body2": {
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 400,
    letterSpacing: 0.5,
  },
  "&.body3": {
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 400,
    letterSpacing: 0.25,
  },
  "&.button": {
    fontSize: 16,
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: 1.2,
    textTransform: "none",
  },
  "&.caption": {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 400,
    letterSpacing: 0.4,
  },
  "&.mini": {
    fontSize: 9,
    lineHeight: "12px",
    fontWeight: 500,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  "&.noWrap": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});
