import * as React from "react";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export interface LinearProgressProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  value?: number;
  variant?: "determinate" | "indeterminate";
}

const indeterminate1Keyframe = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`;

const indeterminate2Keyframe = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`;

const LinearProgressRoot = styled("span")({
  position: "relative",
  overflow: "hidden",
  display: "block",
  height: 4,
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "currentColor",
    opacity: 0.3,
  },
});

const LinearProgressBar1 = styled("span")({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left",
  ".determinate": {
    transition: `transform .4s linear`,
  },
  ".indeterninate": {
    width: "auto",
    animation: `${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
  },
});

const LinearProgressBar2 = styled("span")({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left",
  ".indeterninate": {
    width: "auto",
    animation: `${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`,
  },
});

const LinearProgress = (props: LinearProgressProps) => {
  const { value, variant = "indeterminate", ...other } = props;

  const rootProps = {};
  const inlineStyles = { bar1: {}, bar2: {} };

  if (variant === "determinate") {
    if (value !== undefined) {
      rootProps["aria-valuenow"] = Math.round(value);
      rootProps["aria-valuemin"] = 0;
      rootProps["aria-valuemax"] = 100;
      let transform = value - 100;
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    }
  }

  return (
    <LinearProgressRoot role='progressbar' {...rootProps} {...other}>
      <LinearProgressBar1 style={inlineStyles.bar1} />
      {variant === "determinate" ? null : <LinearProgressBar2 style={inlineStyles.bar2} />}
    </LinearProgressRoot>
  );
};

export default LinearProgress;
