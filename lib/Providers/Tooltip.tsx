import * as React from "react";

import useTimeout, { Timeout } from "../utils/useTimeout";
import styled from "@emotion/styled";

import Grow from "./Grow";
import Popper from "./Popper";
import useEventCallback from "../utils/useEventCallback";
import useForkRef from "../utils/useForkRef";
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children: React.ReactElement<unknown, any>;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  title: React.ReactNode;
}


const TooltipPopper = styled(Popper)({
  zIndex: 10,
  pointerEvents: "none",
  '-disableInteractive': {
    pointerEvents: "auto",
  },
'-closed': {
  pointerEvents: "none",
},
'-arrow': {
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
    
  }


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

let hystersisOpen = false;
const hystersisTimer = new Timeout();

function composeEventHandler(handler, eventHandler) {
  return (event, ...params) => {
    if (eventHandler) {
      eventHandler(event, ...params);
    }
    handler(event, ...params);
  };
}

const Tooltip = (props: TooltipProps) => {
  const {
    children: childrenProp,
    placement = "bottom",
    title,
    ...other
  } = props;

  const children = React.isValidElement(childrenProp) ? childrenProp : <span>{childrenProp}</span>;

  const [childNode, setChildNode] = React.useState();
  const ignoreNonTouchEvents = React.useRef(false);

  const closeTimer = useTimeout();
  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();
  const touchTimer = useTimeout();

  const [openState, setOpenState] = React.useState(false);

  let open = openState;

  const prevUserSelect = React.useRef();

  const handleOpen = () => {
    hystersisTimer.clear();
    hystersisOpen = true;
    setOpenState(true);
  };

  const handleClose = useEventCallback(() => {
      hystersisTimer.start(800, () => {
        hystersisOpen = false;
      });
      setOpenState(false);


      closeTimer.start(800, () => {
        ignoreNonTouchEvents.current = false;
      });
    }
  );

  const handleMouseOver = (event) => {
    if (ignoreNonTouchEvents.current && event.type !== "touchstart") {
      return;
    }

    enterTimer.clear();
    leaveTimer.clear();
    if (enterDelay || hystersisOpen) {
      enterTimer.start(enterDelay, () => {
        handleOpen(event);
      });
    } else {
      handleOpen(event);
    }
  };

  const handleMouseLeave = (event) => {
    enterTimer.clear();
    leaveTimer.start(leaveDelay, () => {
      handleClose(event);
    });
  };

  const [, setChildIsFocusVisible] = React.useState(false);
  const handleBlur = (event) => {
    if (!isFocusVisible(event.target)) {
      setChildIsFocusVisible(false);
      handleMouseLeave(event);
    }
  };

  const handleFocus = (event) => {
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    if (isFocusVisible(event.target)) {
      setChildIsFocusVisible(true);
      handleMouseOver(event);
    }
  };

  const detectTouchStart = (event) => {
    ignoreNonTouchEvents.current = true;

    const childrenProps = children.props;
    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleTouchStart = (event) => {
    detectTouchStart(event);
    leaveTimer.clear();
    closeTimer.clear();
    stopTouchInteraction();

    prevUserSelect.current = document.body.style.WebkitUserSelect;
    // Prevent iOS text selection on long-tap.
    document.body.style.WebkitUserSelect = "none";

    touchTimer.start(enterTouchDelay, () => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleMouseOver(event);
    });
  };

  const handleTouchEnd = (event) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    stopTouchInteraction();
    leaveTimer.start(leaveTouchDelay, () => {
      handleClose(event);
    });
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent) {
      if (nativeEvent.key === "Escape") {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, open]);

  const handleRef = useForkRef(getReactNodeRef(children), setChildNode, ref);

  if (!title && title !== 0) {
    open = false;
  }

  const popperRef = React.useRef();

  const nameOrDescProps = {};
  const titleIsString = typeof title === "string";

    nameOrDescProps["aria-label"] = titleIsString ? title : null;
    nameOrDescProps["aria-labelledby"] = open && !titleIsString ? id : null;
  
  const childrenProps = {
    ...nameOrDescProps,
    ...other,
    ...children.props,
    onTouchStart: detectTouchStart,
    ref: handleRef,
  };

  const interactiveWrapperListeners = {};


    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;



    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);

    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);

  return (
    <React.Fragment>
      {React.cloneElement(children, childrenProps)}
      <TooltipPopper
        as={Popper}
        placement={placement}
        anchorEl={childNode}
        popperRef={popperRef}
        open={childNode ? open : false}
        transition
        {...interactiveWrapperListeners}
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

