import * as React from "react";
import * as Types from "./Tooltip.types";
import * as Styles from "./Tooltip.styles";


const Tooltip = (props: Types.TooltipProps) => {
  const { children, placement = "right", title } = props;
  const [openState, setOpenState] = React.useState(false);
  
  const handleMouseOver = () => {
    setTimeout(() => setOpenState(true), 300);
  };

  const handleMouseLeave = () => {
  setTimeout(() => setOpenState(false), 300); 
  };

  if (!title && title !== 0) {
    setOpenState(false);
  }

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
        arrow
      >
        <Styles.TooltipTooltip>{title}</Styles.TooltipTooltip>
      </Styles.TooltipPoper>
    </React.Fragment>
  );
};

export default Tooltip;
