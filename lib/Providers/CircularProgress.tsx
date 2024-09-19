import * as React from "react";

import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const SIZE = 44;

const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const rotateAnimation =
  typeof circularRotateKeyframe !== "string"
    ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      `
    : null;

const dashAnimation =
  typeof circularDashKeyframe !== "string"
    ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      `
    : null;

const CircularProgressRoot = styled("span")({
  display: "inline-block",
  variants: [
    {
      props: {
        variant: "determinate",
      },
      style: {
        transition: theme.transitions.create("transform"),
      },
    },
    {
      props: {
        variant: "indeterminate",
      },
      style: rotateAnimation || {
        animation: `${circularRotateKeyframe} 1.4s linear infinite`,
      },
    },
  ],
});

const CircularProgressSVG = styled("svg")({
  display: "block", // Keeps the progress centered
});

const CircularProgressCircle = styled("circle")({
  stroke: "currentColor",
  variants: [
    {
      props: {
        variant: "determinate",
      },
      style: {
        transition: theme.transitions.create("stroke-dashoffset"),
      },
    },
    {
      props: {
        variant: "indeterminate",
      },
      style: {
        // Some default value that looks fine waiting for the animation to kicks in.
        strokeDasharray: "80px, 200px",
        strokeDashoffset: 0, // Add the unit to fix a Edge 16 and below bug.
      },
    },
    {
      props: ({ ownerState }) =>
        ownerState.variant === "indeterminate" && !ownerState.disableShrink,
      style: dashAnimation || {
        // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
        animation: `${circularDashKeyframe} 1.4s ease-in-out infinite`,
      },
    },
  ],
});

const CircularProgress = (props: CircularProgressProps) => {
  const { ...other } = props;

  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

  return (
    <CircularProgressRoot role='progressbar' {...rootProps} {...other}>
      <CircularProgressSVG viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
        <CircularProgressCircle style={circleStyle} cx={SIZE} cy={SIZE} r={SIZE / 2} fill='none' />
      </CircularProgressSVG>
    </CircularProgressRoot>
  );
};

export default CircularProgress;

export interface CircularProgressProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {}
