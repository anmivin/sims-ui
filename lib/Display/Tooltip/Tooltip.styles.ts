import styled from "@emotion/styled";
import Popper from "../../Internal/Popper";
export const TooltipPopper = styled(Popper)({
  pointerEvents: "none",
  "&.modern": {
    color: "white",
  },
  "&.old": {
    color: "#ccc78f",
  },
});

export const TooltipPaper = styled("div")(({ theme }) => ({
  padding: "8px",

  maxWidth: 300,
  wordWrap: "break-word",
  "&.modern": {
    color: "blue",
    backgroundColor: theme.color.tooltipGradient,
    border: `1px solid ${theme.color.tooltipBorder}`,
    borderRadius: "8px",
  },
  "&.old": {
    color: "black",
    backgroundColor: "#ccc78f",
    border: "1px solid black",
  },

  "&.left": {
    marginRight: "0.71em",
  },
  "&.right": {
    marginLeft: "0.71em",
  },
  "&.top": {
    marginBottom: "0.71em",
  },
  "&.bottom": {
    marginTop: "0.71em",
  },
}));

export const TooltipArrow = styled("span")(({ theme }) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  color: "inherit",
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)",
  },
  "&.modern": {
    "&::before": {
      border: `1px solid ${theme.color.tooltipBorder}`,
    },
  },
  "&.old": {
    "&::before": {
      border: "1px solid black",
    },
  },
  "&.bottom": {
    top: 1,
    right: "calc(50% - 1em / 2)",
    "&::before": {
      transformOrigin: "0 100%",
    },
  },

  "&.top": {
    bottom: 1,
    right: "calc(50% - 1em / 2)",
    "&::before": {
      transformOrigin: "100% 0",
    },
  },

  "&.right": {
    height: "1em",
    width: "0.71em",
    left: 1,
    top: "calc(50% - 1em / 2)",
    "&::before": {
      transformOrigin: "100% 100%",
    },
  },
  "&.left": {
    height: "1em",
    width: "0.71em",
    right: 1,
    top: "calc(50% - 1em / 2)",
    "&::before": {
      transformOrigin: "0 0",
    },
  },
}));
