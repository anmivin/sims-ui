import * as React from "react";
import {
  unstable_ownerDocument as ownerDocument,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from "@mui/utils";

import useSlotProps from "@mui/utils/useSlotProps";
import Portal from "../Portal";
import { WithOptionalOwnerState } from "../utils/types";
import { PolymorphicComponent } from "../utils/PolymorphicComponent";

import styled from "@emotion/styled";
import { useDefaultProps } from "../DefaultPropsProvider";

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

const PopperTooltip = React.forwardRef<HTMLDivElement, PopperTooltipProps>(function PopperTooltip<
  RootComponentType extends React.ElementType
>(props: PopperTooltipProps<RootComponentType>, forwardedRef: React.ForwardedRef<HTMLDivElement>) {
  const {
    anchorEl,
    children,
    disablePortal,
    open,
    placement: initialPlacement,
    popperRef: popperRefProp,
    ...other
  } = props;

  const tooltipRef = React.useRef<HTMLElement>(null);
  const ownRef = useForkRef(tooltipRef, forwardedRef);

  const popperRef = React.useRef<Instance>(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React.useRef(handlePopperRef);
  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, () => popperRef.current!, []);

  const [placement, setPlacement] = React.useState<Placement | undefined>(initialPlacement);
  const [resolvedAnchorElement, setResolvedAnchorElement] = React.useState<
    HTMLElement | null | undefined
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

    const popper = createPopper(resolvedAnchorElement, tooltipRef.current!, {
      placement: rtlPlacement,
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

  const rootProps: WithOptionalOwnerState<PopperRootSlotProps> = useSlotProps({
    elementType: "div",
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: "tooltip",
      ref: ownRef,
    },
    ownerState: props,
    className: classes.root,
  });

  return (
    <div {...rootProps}>{typeof children === "function" ? children(childProps) : children}</div>
  );
}) as PolymorphicComponent<PopperTooltipTypeMap>;

const Popper = React.forwardRef<HTMLDivElement, PopperProps>(function Popper<
  RootComponentType extends React.ElementType
>(props: PopperProps<RootComponentType>, forwardedRef: React.ForwardedRef<HTMLDivElement>) {
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

import { PortalProps } from "../Portal";
import { PolymorphicProps } from "../utils/PolymorphicComponent";

export interface PopperChildrenProps {
  placement: PopperPlacementType;
  TransitionProps?: PopperTransitionProps;
}

export interface PopperOwnProps {
  anchorEl?: null | VirtualElement | HTMLElement | (() => HTMLElement) | (() => VirtualElement);
  /**
   * Popper render function or node.
   */
  children?: React.ReactNode | ((props: PopperChildrenProps) => React.ReactNode);
  disablePortal?: PortalProps["disablePortal"];
  open: boolean;
  placement?: PopperPlacementType;
}

export interface PopperSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type PopperOwnerState = PopperOwnProps;

export interface PopperTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = "div"
> {
  props: PopperOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type PopperProps<
  RootComponentType extends React.ElementType = PopperTypeMap["defaultComponent"]
> = PolymorphicProps<PopperTypeMap<{}, RootComponentType>, RootComponentType>;

export type PopperTooltipOwnProps = Omit<
  PopperOwnProps,
  "container" | "keepMounted" | "transition"
> & {
  TransitionProps?: PopperTransitionProps;
};

export interface PopperTooltipTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = "div"
> {
  props: PopperTooltipOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type PopperTooltipProps<
  RootComponentType extends React.ElementType = PopperTooltipTypeMap["defaultComponent"]
> = PolymorphicProps<PopperTooltipTypeMap<{}, RootComponentType>, RootComponentType>;

export interface PopperRootSlotProps {
  className?: string;
  ref: React.Ref<any>;
  ownerState: PopperOwnerState;
}

export interface PopperProps extends Omit<BasePopperProps, "direction"> {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
}

const PopperRoot = styled(BasePopper, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root,
})({});

const Popper = React.forwardRef(function Popper(
  inProps: PopperProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const isRtl = useRtl();
  const props = useDefaultProps({
    props: inProps,
    name: "MuiPopper",
  });

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

  const RootComponent = slots?.root ?? components?.Root;
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
      direction={isRtl ? "rtl" : "ltr"}
      slots={{ root: RootComponent }}
      slotProps={slotProps ?? componentsProps}
      {...otherProps}
      ref={ref}
    />
  );
}) as React.ForwardRefExoticComponent<PopperProps & React.RefAttributes<HTMLDivElement>>;
