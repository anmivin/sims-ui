import * as React from "react";

import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import createSimplePaletteValueFilter from "../utils/createSimplePaletteValueFilter";

const TRANSITION_DURATION = 4; // seconds
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

const indeterminate1Animation =
  typeof indeterminate1Keyframe !== "string"
    ? css`
        animation: ${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `
    : null;

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
const indeterminate2Animation =
  typeof indeterminate2Keyframe !== "string"
    ? css`
        animation: ${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `
    : null;

const bufferKeyframe = keyframes`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`;
const bufferAnimation =
  typeof bufferKeyframe !== "string"
    ? css`
        animation: ${bufferKeyframe} 3s infinite linear;
      `
    : null;


const LinearProgressRoot = styled("span")({
    position: "relative",
    overflow: "hidden",
    display: "block",
    height: 4,
    // Fix Safari's bug during composition of different paint.
    zIndex: 0,
    "@media print": {
      colorAdjust: "exact",
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            backgroundColor: getColorShade(theme, color),
          },
        })),
      {
        props: ({ ownerState }) =>
          ownerState.color === "inherit" && ownerState.variant !== "buffer",
        style: {
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
        },
      },
      {
        props: { variant: "buffer" },
        style: { backgroundColor: "transparent" },
      },
      {
        props: { variant: "query" },
        style: { transform: "rotate(180deg)" },
      },
    ],
  });

const LinearProgressDashed = styled("span")({
    position: "absolute",
    marginTop: 0,
    height: "100%",
    width: "100%",
    backgroundSize: "10px 10px",
    backgroundPosition: "0 -23px",
    variants: [
      {
        props: { color: "inherit" },
        style: {
          opacity: 0.3,
          backgroundImage: `radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)`,
        },
      },
      
    ],
  }),
  ...bufferAnimation || {
    // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
    animation: `${bufferKeyframe} 3s infinite linear`,
  }
;

const LinearProgressBar1 = styled("span")({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left",
  variants: [
    {
      props: {
        color: "inherit",
      },
      style: {
        backgroundColor: "currentColor",
      },
    },
    ...Object.entries(theme.palette)
      .filter(createSimplePaletteValueFilter())
      .map(([color]) => ({
        props: { color },
        style: {
          backgroundColor: (theme.vars || theme).palette[color].main,
        },
      })),
    {
      props: {
        variant: "determinate",
      },
      style: {
        transition: `transform .${TRANSITION_DURATION}s linear`,
      },
    },
    {
      props: {
        variant: "buffer",
      },
      style: {
        zIndex: 1,
        transition: `transform .${TRANSITION_DURATION}s linear`,
      },
    },
    {
      props: ({ ownerState }) =>
        ownerState.variant === "indeterminate" || ownerState.variant === "query",
      style: {
        width: "auto",
      },
    },
    {
      props: ({ ownerState }) =>
        ownerState.variant === "indeterminate" || ownerState.variant === "query",
      style: indeterminate1Animation || {
        animation: `${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
      },
    },
  ],
});

const LinearProgressBar2 = styled("span")({
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 0,
    transition: "transform 0.2s linear",
    transformOrigin: "left",
    variants: [
      {
        props: ({ ownerState }) =>
          ownerState.variant !== "buffer" && ownerState.color !== "inherit",
        style: {
          backgroundColor: "var(--LinearProgressBar2-barColor, currentColor)",
        },
      },
      {
        props: {
          color: "inherit",
        },
        style: {
          opacity: 0.3,
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.variant === "indeterminate" || ownerState.variant === "query",
        style: {
          width: "auto",
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.variant === "indeterminate" || ownerState.variant === "query",
        style: indeterminate2Animation || {
          animation: `${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`,
        },
      },
    ],
  });


const LinearProgress = (props: LinearProgressProps) =>  {
  const {
    value,
    valueBuffer,
    variant = "indeterminate",
    ...other
  } = props;


  const rootProps = {};
  const inlineStyles = { bar1: {}, bar2: {} };

  if (variant === "determinate" || variant === "buffer") {
    if (value !== undefined) {
      rootProps["aria-valuenow"] = Math.round(value);
      rootProps["aria-valuemin"] = 0;
      rootProps["aria-valuemax"] = 100;
      let transform = value - 100;
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    }
  }
  if (variant === "buffer") {
    if (valueBuffer !== undefined) {
      let transform = (valueBuffer || 0) - 100;
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    }
  }

  return (
    <LinearProgressRoot
      role='progressbar'
      {...rootProps}
      {...other}
    >
      {variant === "buffer" ? (
        <LinearProgressDashed />
      ) : null}
      <LinearProgressBar1
        style={inlineStyles.bar1}
      />
      {variant === "determinate" ? null : (
        <LinearProgressBar2

          style={inlineStyles.bar2}
        />
      )}
    </LinearProgressRoot>
  );
};

export default LinearProgress;

export interface LinearProgressProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value?: number;
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer?: number;
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant?: "determinate" | "indeterminate" | "buffer" | "query";
}
