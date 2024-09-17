import * as React from "react";

import useTimeout, { Timeout } from "../utils/useTimeout";

import { useRtl } from "@mui/system/RtlProvider";
import isFocusVisible from "@mui/utils/isFocusVisible";
import appendOwnerState from "@mui/utils/appendOwnerState";
import getReactNodeRef from "@mui/utils/getReactNodeRef";
import styled from "@emotion/styled";

import { useDefaultProps } from "../DefaultPropsProvider";

import Grow from "./Grow";
import Popper from "./Popper";
import useEventCallback from "../utils/useEventCallback";
import useForkRef from "../utils/useForkRef";
import useId from "../utils/useId";
import useControlled from "../utils/useControlled";

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const TooltipPopper = styled(Popper)({
  zIndex: (theme.vars || theme).zIndex.tooltip,
  pointerEvents: "none",
  variants: [
    {
      props: ({ ownerState }) => !ownerState.disableInteractive,
      style: {
        pointerEvents: "auto",
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        pointerEvents: "none",
      },
    },
    {
      props: ({ ownerState }) => ownerState.arrow,
      style: {
        [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
          top: 0,
          marginTop: "-0.71em",
          "&::before": {
            transformOrigin: "0 100%",
          },
        },
        [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
          bottom: 0,
          marginBottom: "-0.71em",
          "&::before": {
            transformOrigin: "100% 0",
          },
        },
        [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
          height: "1em",
          width: "0.71em",
          "&::before": {
            transformOrigin: "100% 100%",
          },
        },
        [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
          height: "1em",
          width: "0.71em",
          "&::before": {
            transformOrigin: "0 0",
          },
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.arrow && !ownerState.isRtl,
      style: {
        [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
          left: 0,
          marginLeft: "-0.71em",
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.arrow && !!ownerState.isRtl,
      style: {
        [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
          right: 0,
          marginRight: "-0.71em",
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.arrow && !ownerState.isRtl,
      style: {
        [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
          right: 0,
          marginRight: "-0.71em",
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.arrow && !!ownerState.isRtl,
      style: {
        [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
          left: 0,
          marginLeft: "-0.71em",
        },
      },
    },
  ],
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
let cursorPosition = { x: 0, y: 0 };

function composeEventHandler(handler, eventHandler) {
  return (event, ...params) => {
    if (eventHandler) {
      eventHandler(event, ...params);
    }
    handler(event, ...params);
  };
}

const Tooltip = React.forwardRef(function Tooltip(props: TooltipProps, ref) {
  const {
    arrow = false,
    children: childrenProp,
    describeChild = false,
    disableInteractive: disableInteractiveProp = false,
    enterDelay = 100,
    id: idProp,
    leaveDelay = 0,
    onClose,
    onOpen,
    open: openProp,
    placement = "bottom",
    title,
    ...other
  } = props;

  // to prevent runtime errors, developers will need to provide a child as a React element anyway.
  const children = React.isValidElement(childrenProp) ? childrenProp : <span>{childrenProp}</span>;

  const [childNode, setChildNode] = React.useState();
  const [arrowRef, setArrowRef] = React.useState(null);
  const ignoreNonTouchEvents = React.useRef(false);

  const disableInteractive = disableInteractiveProp;

  const closeTimer = useTimeout();
  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();
  const touchTimer = useTimeout();

  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: "Tooltip",
    state: "open",
  });

  let open = openState;

  const id = useId(idProp);

  const prevUserSelect = React.useRef();
  const stopTouchInteraction = useEventCallback(() => {
    if (prevUserSelect.current !== undefined) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }
    touchTimer.clear();
  });

  React.useEffect(() => stopTouchInteraction, [stopTouchInteraction]);

  const handleOpen = (event) => {
    hystersisTimer.clear();
    hystersisOpen = true;

    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  const handleClose = useEventCallback(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (event) => {
      hystersisTimer.start(800 + leaveDelay, () => {
        hystersisOpen = false;
      });
      setOpenState(false);

      if (onClose && open) {
        onClose(event);
      }

      closeTimer.start(theme.transitions.duration.shortest, () => {
        ignoreNonTouchEvents.current = false;
      });
    }
  );

  const handleMouseOver = (event) => {
    if (ignoreNonTouchEvents.current && event.type !== "touchstart") {
      return;
    }

    if (childNode) {
      childNode.removeAttribute("title");
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

  // There is no point in displaying an empty tooltip.
  // So we exclude all falsy values, except 0, which is valid.
  if (!title && title !== 0) {
    open = false;
  }

  const popperRef = React.useRef();

  const handleMouseMove = (event) => {
    const childrenProps = children.props;
    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    cursorPosition = { x: event.clientX, y: event.clientY };

    if (popperRef.current) {
      popperRef.current.update();
    }
  };

  const nameOrDescProps = {};
  const titleIsString = typeof title === "string";
  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps["aria-describedby"] = open ? id : null;
  } else {
    nameOrDescProps["aria-label"] = titleIsString ? title : null;
    nameOrDescProps["aria-labelledby"] = open && !titleIsString ? id : null;
  }

  const childrenProps = {
    ...nameOrDescProps,
    ...other,
    ...children.props,
    onTouchStart: detectTouchStart,
    ref: handleRef,
    ...(followCursor ? { onMouseMove: handleMouseMove } : {}),
  };

  if (process.env.NODE_ENV !== "production") {
    childrenProps["data-mui-internal-clone-element"] = true;

    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks -- process.env never changes
    React.useEffect(() => {
      if (childNode && !childNode.getAttribute("data-mui-internal-clone-element")) {
        console.error(
          [
            "MUI: The `children` component of the Tooltip is not forwarding its props correctly.",
            "Please make sure that props are spread on the same element that the ref is applied to.",
          ].join("\n")
        );
      }
    }, [childNode]);
  }

  const interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }

  const ownerState = {
    ...props,
    arrow,
    disableInteractive,
    placement,
    touch: ignoreNonTouchEvents.current,
  };

  const TransitionComponent = Grow;

  return (
    <React.Fragment>
      {React.cloneElement(children, childrenProps)}
      <TooltipPopper
        as={Popper}
        placement={placement}
        anchorEl={childNode}
        popperRef={popperRef}
        open={childNode ? open : false}
        id={id}
        transition
        {...interactiveWrapperListeners}
      >
        {({ TransitionProps: TransitionPropsInner }) => (
          <TransitionComponent
            timeout={theme.transitions.duration.shorter}
            {...TransitionPropsInner}
          >
            <TooltipTooltip>
              {title}
              {arrow ? <TooltipArrow ref={setArrowRef} /> : null}
            </TooltipTooltip>
          </TransitionComponent>
        )}
      </TooltipPopper>
    </React.Fragment>
  );
});

export default Tooltip;

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow?: boolean;
  /**
   * Tooltip reference element.
   */
  children: React.ReactElement<unknown, any>;

  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild?: boolean;

  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive?: boolean;

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay?: number;

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string;
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay?: number;

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent | Event) => void;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen?: (event: React.SyntheticEvent) => void;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
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

  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: React.ReactNode;
}
