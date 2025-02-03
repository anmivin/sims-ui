import styled from "@emotion/styled";

import Popper from "../../Surfaces/Popper/Popper";

export const TooltipPoper = styled(Popper)({
  backgroundColor: "blue",
  zIndex: 10,
  pointerEvents: "none",
  "-closed": {
    pointerEvents: "none",
  },
  "-arrow": {
    [`&[data-popper-placement*="bottom"] .arrow`]: {
      top: 0,
      marginTop: "-0.71em",
      "&::before": {
        transformOrigin: "0 100%",
      },
    },
    [`&[data-popper-placement*="top"] .arrow`]: {
      bottom: 0,
      marginBottom: "-0.71em",
      "&::before": {
        transformOrigin: "100% 0",
      },
    },
    [`&[data-popper-placement*="right"] .arrow`]: {
      height: "1em",
      width: "0.71em",
      "&::before": {
        transformOrigin: "100% 100%",
      },
    },
    [`&[data-popper-placement*="left"] .arrow`]: {
      height: "1em",
      width: "0.71em",
      "&::before": {
        transformOrigin: "0 0",
      },
    },
  },
});

export const TooltipTooltip = styled("div")({
  backgroundColor: "red",
  borderRadius: "8px",
  color: "white",
  padding: "4px 8px",
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: 100,
  "-popper-left": {
    transformOrigin: "right center",
  },
  "-popper-right": {
    transformOrigin: "left center",
  },
  "-popper-top": {
    transformOrigin: "center bottom",
    marginBottom: "14px",
  },
  "-popper-bottom": {
    transformOrigin: "center top",
    marginTop: "14px",
  },
  "-arrow": {
    position: "relative",
    margin: 0,
  },
});

export const TooltipArrow = styled("span")({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: "rgba(0,0,0,0.5)",
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)",
  },
});
