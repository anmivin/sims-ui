import * as React from "react";
import * as Styles from "./LinearProgress.styles";
import * as Types from "./LinearProgress.types";
const LinearProgress = (props: Types.LinearProgressProps) => {
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
    <Styles.LinearProgressRoot role='progressbar' {...rootProps} {...other}>
      <Styles.LinearProgressBar1 style={inlineStyles.bar1} />
      {variant === "determinate" ? null : <Styles.LinearProgressBar2 style={inlineStyles.bar2} />}
    </Styles.LinearProgressRoot>
  );
};

export default LinearProgress;
