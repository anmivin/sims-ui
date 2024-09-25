import * as React from "react";

import useTimeout from "../../utils/useTimeout";
import styled from "@emotion/styled";

import Popper from "../../Providers/Popper";
import Popover from "../../Surfaces/Popover/Popover";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children: React.ReactNode;
  placement?: "bottom" | "left" | "right" | "top";
  title: React.ReactNode;
}

const TooltipPopper = styled(Popover)({
  zIndex: 10,
  pointerEvents: "none",
  "-disableInteractive": {
    pointerEvents: "auto",
  },
  "-closed": {
    pointerEvents: "none",
  },
  "-arrow": {
    [`&[data-popper-placement*="bottom"] .arrow`]: {
      top: 0,
      marginTop: "-0.71em",
      "&::before": {
        transformOrigin: "0 100%",
      },
    },
    [`&[data-popper-placement*="top"] .arrow`]: {
      bottom: 0,
      marginBottom: "-0.71em",
      "&::before": {
        transformOrigin: "100% 0",
      },
    },
    [`&[data-popper-placement*="right"] .arrow`]: {
      height: "1em",
      width: "0.71em",
      "&::before": {
        transformOrigin: "100% 100%",
      },
    },
    [`&[data-popper-placement*="left"] .arrow`]: {
      height: "1em",
      width: "0.71em",
      "&::before": {
        transformOrigin: "0 0",
      },
    },
  },
});

const TooltipTooltip = styled("div")({
  backgroundColor: "rgba(0,0,0,0.5)",
  borderRadius: "8px",
  color: "white",
  padding: "4px 8px",
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: 100,
  "-popper-left": {
    transformOrigin: "right center",
  },
  "-popper-right": {
    transformOrigin: "left center",
  },
  "-popper-top": {
    transformOrigin: "center bottom",
    marginBottom: "14px",
  },
  "-popper-bottom": {
    transformOrigin: "center top",
    marginTop: "14px",
  },
  "-arrow": {
    position: "relative",
    margin: 0,
  },
});

const TooltipArrow = styled("span")({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em" /* = width / sqrt(2) = (length of the hypotenuse) */,
  boxSizing: "border-box",
  color: "rgba(0,0,0,0.5)",
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)",
  },
});

const Tooltip = (props: TooltipProps) => {
  const { children: childrenProp, placement = "bottom", title } = props;

  const children = React.isValidElement(childrenProp) ? childrenProp : <span>{childrenProp}</span>;

  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();
  const [openState, setOpenState] = React.useState(false);

  let open = openState;

  const handleMouseOver = () => {
    enterTimer.clear();
    leaveTimer.clear();
    enterTimer.start(800, () => {
      setOpenState(true);
    });
  };

  const handleMouseLeave = () => {
    enterTimer.clear();
    leaveTimer.start(800, () => {
      setOpenState(false);
    });
  };

  if (!title && title !== 0) {
    open = false;
  }

  const popperRef = React.useRef();

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onMouseOver: handleMouseOver,
        onMouseLeave: handleMouseLeave,
      })}
      <TooltipPopper
        as={Popper}
        placement={placement}
        anchorEl={children}
        popperRef={popperRef}
        open={children ? open : false}
        transition
      >
        <TooltipTooltip>
          {title}
          <TooltipArrow />
        </TooltipTooltip>
      </TooltipPopper>
    </React.Fragment>
  );
};

export default Tooltip;