import * as React from "react";
import * as Types from "./Scrollable.types";
import * as Styles from "./Scrollable.styles";
import clsx from "clsx";

const Scrollable = React.forwardRef<HTMLDivElement, Types.ScrollableProps>((props) => {
  const { children, width, height, variant = "modern" } = props;
  return (
    <Styles.Scrollable containerHeight={height} containerWidth={width} className={clsx(variant)}>
      {children}
    </Styles.Scrollable>
  );
});

export default Scrollable;
