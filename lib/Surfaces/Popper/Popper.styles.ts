import styled from "@emotion/styled";
import { css, Interpolation, CSSObject } from "@emotion/react";
import { BasePlacement, BetweenPlacement } from "./Popper.types";
export const PopoverPaper = styled("div")({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  outline: 0,
  backgroundColor: "red",
});

export const arrowStyles = (placement: BasePlacement | BetweenPlacement) => {
  let rotation = 0;

  switch (placement) {
    case "left":
      rotation = 90;
      break;
    case "right":
      rotation = -90;
      break;
    case "top":
      rotation = 180;
  }
  return css`
    transform: rotate(${rotation}deg);
  `;
};
export const PopoverArrow = styled("span")<{ css: Interpolation<CSSObject> }>({
  width: "0px",
  height: "0px",
  borderStyle: "solid",
  borderWidth: "0 100px 150px 100px",
  borderColor: "transparent transparent #FF4532 transparent",
  "&.bottom": {
    transform: "rotate(90deg)",
  },
  ".top": {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0",
    },
  },
  ".right": {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "100% 100%",
    },
  },
  ".left": {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "0 0",
    },
  },
});
