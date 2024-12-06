import * as React from "react";
import {
  chainPropTypes,
  HTMLElementType,
  refType,
  unstable_ownerDocument as ownerDocument,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from "@mui/utils";
import { createPopper, Instance, Modifier, Placement, State, VirtualElement } from "@popperjs/core";

import useSlotProps from "@mui/utils/useSlotProps";
import Portal from "../Internal/Portal";

import { WithOptionalOwnerState } from "../utils/types";
import { PolymorphicComponent } from "../utils/PolymorphicComponent";
import {
  PopperPlacementType,
  PopperTooltipProps,
  PopperTooltipTypeMap,
  PopperChildrenProps,
  PopperProps,
  PopperRootSlotProps,
  PopperTransitionProps,
  PopperTypeMap,
} from "./Popper/BasePopper.types";

function resolveAnchorEl(
  anchorEl:
    | VirtualElement
    | (() => VirtualElement)
    | HTMLElement
    | (() => HTMLElement)
    | null
    | undefined
): HTMLElement | VirtualElement | null | undefined {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}

function isHTMLElement(element: HTMLElement | VirtualElement): element is HTMLElement {
  return (element as HTMLElement).nodeType !== undefined;
}

function isVirtualElement(element: HTMLElement | VirtualElement): element is VirtualElement {
  return !isHTMLElement(element);
}

const defaultPopperOptions = {};

const PopperTooltip = React.forwardRef(function PopperTooltip<
  RootComponentType extends React.ElementType
>(props: PopperTooltipProps<RootComponentType>, forwardedRef: React.ForwardedRef<HTMLDivElement>) {
  const {
    anchorEl,
    children,
    direction,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    slotProps = {},
    slots = {},
    TransitionProps,
    // @ts-ignore internal logic
    ownerState: ownerStateProp, // prevent from spreading to DOM, it can come from the parent component e.g. Select.
    ...other
  } = props;

  const tooltipRef = React.useRef<HTMLElement>(null);
  const ownRef = useForkRef(tooltipRef, forwardedRef);

  const popperRef = React.useRef<Instance | null>(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React.useRef(handlePopperRef);
  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, () => popperRef.current!, []);

  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */
  const [placement, setPlacement] = React.useState<Placement | undefined>(initialPlacement);
  const [resolvedAnchorElement, setResolvedAnchorElement] = React.useState<
    HTMLElement | VirtualElement | null | undefined
  >(resolveAnchorEl(anchorEl));

  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });

  React.useEffect(() => {
    if (anchorEl) {
      setResolvedAnchorElement(resolveAnchorEl(anchorEl));
    }
  }, [anchorEl]);

  useEnhancedEffect(() => {
    if (!resolvedAnchorElement || !open) {
      return undefined;
    }

    const handlePopperUpdate = (data: State) => {
      setPlacement(data.placement);
    };

    let popperModifiers: Partial<Modifier<any, any>>[] = [
      {
        name: "preventOverflow",
        options: {
          altBoundary: disablePortal,
        },
      },
      {
        name: "flip",
        options: {
          altBoundary: disablePortal,
        },
      },
      {
        name: "onUpdate",
        enabled: true,
        phase: "afterWrite",
        fn: ({ state }) => {
          handlePopperUpdate(state);
        },
      },
    ];

    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }

    const popper = createPopper(resolvedAnchorElement, tooltipRef.current!, {
      placement: initialPlacement,
      ...popperOptions,
      modifiers: popperModifiers,
    });

    handlePopperRefRef.current!(popper);

    return () => {
      popper.destroy();
      handlePopperRefRef.current!(null);
    };
  }, [resolvedAnchorElement, disablePortal, modifiers, open, popperOptions, rtlPlacement]);

  const childProps: PopperChildrenProps = { placement: placement! };

  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }

  const Root = "div";

  return <Root>{typeof children === "function" ? children(childProps) : children}</Root>;
}) as PolymorphicComponent<PopperTooltipTypeMap>;

/**
 * @ignore - internal component.
 */
const Popper = React.forwardRef(function Popper<RootComponentType extends React.ElementType>(
  props: PopperProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const {
    anchorEl,
    children,
    container: containerProp,
    direction = "ltr",
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = "bottom",
    popperOptions = defaultPopperOptions,
    popperRef,
    style,
    transition = false,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const [exited, setExited] = React.useState(true);

  const handleEnter = () => {
    setExited(false);
  };

  const handleExited = () => {
    setExited(true);
  };

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  let container;
  if (containerProp) {
    container = containerProp;
  } else if (anchorEl) {
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    container =
      resolvedAnchorEl && isHTMLElement(resolvedAnchorEl)
        ? ownerDocument(resolvedAnchorEl).body
        : ownerDocument(null).body;
  }
  const display = !open && keepMounted && (!transition || exited) ? "none" : undefined;
  const transitionProps: PopperTransitionProps | undefined = transition
    ? {
        in: open,
        onEnter: handleEnter,
        onExited: handleExited,
      }
    : undefined;

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <PopperTooltip
        anchorEl={anchorEl}
        direction={direction}
        disablePortal={disablePortal}
        modifiers={modifiers}
        ref={forwardedRef}
        open={transition ? !exited : open}
        placement={placement}
        popperOptions={popperOptions}
        popperRef={popperRef}
        slotProps={slotProps}
        slots={slots}
        {...other}
        style={{
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: "fixed",
          // Fix Popper.js display issue
          top: 0,
          left: 0,
          display,
          ...style,
        }}
        TransitionProps={transitionProps}
      >
        {children}
      </PopperTooltip>
    </Portal>
  );
}) as PolymorphicComponent<PopperTypeMap>;

export default Popper;

const PopperRoot = styled(BasePopper)({});

const Popper = React.forwardRef(function Popper(
  inProps: PopperProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    anchorEl,
    component,
    components,
    componentsProps,
    container,
    disablePortal,
    keepMounted,
    modifiers,
    open,
    placement,
    popperOptions,
    popperRef,
    transition,
    slots,
    slotProps,
    ...other
  } = props;

  const RootComponent = "div";
  const otherProps = {
    anchorEl,
    container,
    disablePortal,
    keepMounted,
    modifiers,
    open,
    placement,
    popperOptions,
    popperRef,
    transition,
    ...other,
  };
  return (
    <PopperRoot
      as={component}
      direction={"ltr"}
      slots={{ root: RootComponent }}
      slotProps={slotProps ?? componentsProps}
      {...otherProps}
      ref={ref}
    />
  );
}) as React.ForwardRefExoticComponent<PopperProps & React.RefAttributes<HTMLDivElement>>;

export default Popper;

import { Instance, VirtualElement } from "@popperjs/core";
import { PortalProps } from "./Portal";

export interface PopperOwnProps {
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl?: null | VirtualElement | HTMLElement | (() => HTMLElement) | (() => VirtualElement);
  /**
   * Popper render function or node.
   */
  children?: React.ReactNode | ((props: PopperChildrenProps) => React.ReactNode);
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps["container"];
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: PortalProps["disablePortal"];

  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement?: PopperPlacementType;
  /**
   * A ref that points to the used popper instance.
   */
  popperRef?: React.Ref<Instance>;
}
