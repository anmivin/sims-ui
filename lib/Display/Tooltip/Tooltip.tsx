import * as React from "react";
import * as Types from "./Tooltip.types";
import * as Styles from "./Tooltip.styles";
export class Timeout {
  static create() {
    return new Timeout();
  }

  currentId: ReturnType<typeof setTimeout> | null = null;

  start(delay: number, fn: Function) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = null;
      fn();
    }, delay);
  }

  clear = () => {
    if (this.currentId !== null) {
      clearTimeout(this.currentId);
      this.currentId = null;
    }
  };

  disposeEffect = () => {
    return this.clear;
  };
}

const Tooltip = (props: Types.TooltipProps) => {
  const { children, placement = "bottom", title } = props;
  const [openState, setOpenState] = React.useState(true);
  React.useEffect(() => console.log("children", children), [children]);
  const handleMouseOver = () => {
    setOpenState(true);
    //settimeout
  };

  const handleMouseLeave = () => {
    //settimeout
    setOpenState(false);
  };

  if (!title && title !== 0) {
    setOpenState(false);
  }

  React.useEffect(() => console.log("openState", openState), [openState]);

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onMouseOver: handleMouseOver,
        onMouseLeave: handleMouseLeave,
      })}
      <Styles.TooltipPoper
        placement={placement}
        anchorEl={(children as any).ref.current}
        open={children ? openState : false}
      >
        <Styles.TooltipTooltip>
          {title}
          <Styles.TooltipArrow />
        </Styles.TooltipTooltip>
      </Styles.TooltipPoper>
    </React.Fragment>
  );
};

export default Tooltip;
