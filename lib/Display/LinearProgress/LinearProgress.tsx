import * as Styles from "./LinearProgress.styles";
import * as Types from "./LinearProgress.types";
import clsx from "clsx";
const LinearProgress = (props: Types.LinearProgressProps) => {
  const { value, variant, ...other } = props;

  return (
    <Styles.LinearProgress role='progressbar' {...other} className={clsx(variant)}>
      <Styles.ProgressBar
        className={clsx(variant)}
        style={{ transform: value ? `translateX(${value - 100}%)` : undefined }}
      />
    </Styles.LinearProgress>
  );
};

export default LinearProgress;
