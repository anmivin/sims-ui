import styled from "@emotion/styled";

export const LinearProgress = styled("span")(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  display: "block",

  height: "20px",
  borderRadius: "12px",
  "&.old": {
    backgroundColor: "#747ed5",
  },
  "&.modern": {
    backgroundColor: theme.color.scrollBarTrack,
  },

  /*  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "blue",
    opacity: 0.3,
  }, */
}));

export const ProgressBar = styled("span")(({ theme }) => ({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transformOrigin: "left",
  transition: `transform .4s linear`,
  "&.old": {
    background: "linear-gradient(0deg, #4affff, #28c4d3)",
  },
  "&.modern": {
    background: theme.color.scrollBarThumbHover,
  },
}));
