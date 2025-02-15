import * as React from "react";
import * as Types from "./Tooltip.types";
import * as Styles from "./Tooltip.styles";
import clsx from "clsx";
const Tooltip = (props: Types.TooltipProps) => {
  const { children, placement = "bottom", variant = "old", text } = props;
  const [openState, setOpenState] = React.useState(false);
  const childRef = React.useRef<HTMLElement | null>(null);

  const handleMouseOver = () => {
    setTimeout(() => setOpenState(true), 300);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setOpenState(false), 300);
  };

  if (!text && text !== 0) {
    setOpenState(false);
  }

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        ref: childRef,
        onMouseOver: handleMouseOver,
        onMouseLeave: handleMouseLeave,
      })}
      <Styles.TooltipPopper
        anchorEl={childRef.current}
        open={children ? openState : false}
        placement={placement}
        className={clsx(variant)}
      >
        <Styles.TooltipPaper className={clsx(variant, placement)}> {text}</Styles.TooltipPaper>
        <Styles.TooltipArrow className={clsx(placement, variant)} />
      </Styles.TooltipPopper>
    </React.Fragment>
  );
};

export default Tooltip;
