import styled from "@emotion/styled";
import {
  unstable_ownerWindow as ownerWindow,
  unstable_ownerDocument as ownerDocument,
  unstable_getScrollbarSize as getScrollbarSize,
} from "@mui/utils";

export interface ManagedModalProps {
  disableScrollLock?: boolean;
}

// Is a vertical scrollbar displayed?
function isOverflowing(container: Element): boolean {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

function getPaddingRight(element: Element): number {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}

function ariaHiddenSiblings(
  container: Element,
  mountElement: Element,
  currentElement: Element,
  elementsToExclude: readonly Element[],
  show: boolean
): void {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];

  [].forEach.call(container.children, (element: Element) => {
    const isNotExcludedElement = !blacklist.includes(element);
    if (isNotExcludedElement) {
      ariaHidden(element, show);
    }
  });
}

function findIndexOf<T>(items: readonly T[], callback: (item: T) => boolean): number {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}

function handleContainer(containerInfo: Container, props: ManagedModalProps) {
  const restoreStyle: Array<{
    /**
     * CSS property name (HYPHEN CASE) to be modified.
     */
    property: string;
    el: HTMLElement | SVGElement;
    value: string;
  }> = [];
  const container = containerInfo.container;

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize(ownerDocument(container));

      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container,
      });
      // Use computed style, here to get the real padding to add our scrollbar width.
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;

      // .mui-fixed is a global helper.
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element: HTMLElement | SVGElement) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element,
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }

    let scrollContainer: HTMLElement;

    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      // Support html overflow-y: auto for scroll stability between pages
      // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer =
        parent?.nodeName === "HTML" &&
        containerWindow.getComputedStyle(parent).overflowY === "scroll"
          ? parent
          : container;
    }

    // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.
    restoreStyle.push(
      {
        value: scrollContainer.style.overflow,
        property: "overflow",
        el: scrollContainer,
      },
      {
        value: scrollContainer.style.overflowX,
        property: "overflow-x",
        el: scrollContainer,
      },
      {
        value: scrollContainer.style.overflowY,
        property: "overflow-y",
        el: scrollContainer,
      }
    );

    scrollContainer.style.overflow = "hidden";
  }

  const restore = () => {
    restoreStyle.forEach(({ value, el, property }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container: Element) {
  const hiddenSiblings: Element[] = [];
  [].forEach.call(container.children, (element: Element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}

interface Modal {
  mount: Element;
  modalRef: Element;
}

interface Container {
  container: HTMLElement;
  hiddenSiblings: Element[];
  modals: Modal[];
  restore: null | (() => void);
}

/**
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
export class ModalManager {
  private containers: Container[];

  private modals: Modal[];

  constructor() {
    this.modals = [];
    this.containers = [];
  }

  add(modal: Modal, container: HTMLElement): number {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal);

    // If the modal we are adding is already in the DOM.
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);

    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings,
    });

    return modalIndex;
  }

  mount(modal: Modal, props: ManagedModalProps): void {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }

  remove(modal: Modal, ariaHiddenState = true): number {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];

    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);

    // If that was the last modal in a container, clean up the container.
    if (containerInfo.modals.length === 0) {
      // The modal might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, ariaHiddenState);
      }

      ariaHiddenSiblings(
        containerInfo.container,
        modal.mount,
        modal.modalRef,
        containerInfo.hiddenSiblings,
        false
      );
      this.containers.splice(containerIndex, 1);
    } else {
      // Otherwise make sure the next top modal is visible to a screen reader.
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      // as soon as a modal is adding its modalRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when modal was unmounted before modalRef gets null
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }

    return modalIndex;
  }

  isTopModal(modal: Modal): boolean {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}

import {
  unstable_ownerDocument as ownerDocument,
  unstable_useForkRef as useForkRef,
  unstable_useEventCallback as useEventCallback,
  unstable_createChainedFunction as createChainedFunction,
} from "@mui/utils";
import extractEventHandlers from "@mui/utils/extractEventHandlers";
import { EventHandlers } from "../utils/types";
import { ModalManager, ariaHidden } from "./ModalManager";
import {
  UseModalParameters,
  UseModalReturnValue,
  UseModalRootSlotProps,
  UseModalBackdropSlotProps,
} from "./useModal.types";

function getContainer(container: UseModalParameters["container"]) {
  return typeof container === "function" ? container() : container;
}

function getHasTransition(children: UseModalParameters["children"]) {
  return children ? children.props.hasOwnProperty("in") : false;
}

// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.
const defaultManager = new ModalManager();
/**
 *
 * Demos:
 *
 * - [Modal](https://mui.com/base-ui/react-modal/#hook)
 *
 * API:
 *
 * - [useModal API](https://mui.com/base-ui/react-modal/hooks-api/#use-modal)
 */
function useModal(parameters: UseModalParameters): UseModalReturnValue {
  const {
    container,
    disableEscapeKeyDown = false,
    disableScrollLock = false,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager = defaultManager,
    closeAfterTransition = false,
    onTransitionEnter,
    onTransitionExited,
    children,
    onClose,
    open,
    rootRef,
  } = parameters;

  // @ts-ignore internal logic
  const modal = React.useRef<{ modalRef: HTMLDivElement; mount: HTMLElement }>({});
  const mountNodeRef = React.useRef<HTMLElement | null>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(modalRef, rootRef);
  const [exited, setExited] = React.useState(!open);
  const hasTransition = getHasTransition(children);

  let ariaHiddenProp = true;
  if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) {
    ariaHiddenProp = false;
  }

  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current!;
    modal.current.mount = mountNodeRef.current!;
    return modal.current;
  };

  const handleMounted = () => {
    manager.mount(getModal(), { disableScrollLock });

    // Fix a bug on Chrome where the scroll isn't initially 0.
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };

  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;

    manager.add(getModal(), resolvedContainer);

    // The element was already mounted.
    if (modalRef.current) {
      handleMounted();
    }
  });

  const isTopModal = React.useCallback(() => manager.isTopModal(getModal()), [manager]);

  const handlePortalRef = useEventCallback((node: HTMLElement) => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });

  const handleClose = React.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp, manager]);

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);

  const createHandleKeyDown = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent) => {
    otherHandlers.onKeyDown?.(event);

    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (
      event.key !== "Escape" ||
      event.which === 229 || // Wait until IME is settled.
      !isTopModal()
    ) {
      return;
    }

    if (!disableEscapeKeyDown) {
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();

      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };

  const createHandleBackdropClick = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    otherHandlers.onClick?.(event);

    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClose) {
      onClose(event, "backdropClick");
    }
  };

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther
  ): UseModalRootSlotProps<TOther> => {
    const propsEventHandlers = extractEventHandlers(parameters) as Partial<UseModalParameters>;

    // The custom event handlers shouldn't be spread on the root element
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;

    const externalEventHandlers = {
      ...propsEventHandlers,
      ...otherHandlers,
    };

    return {
      role: "presentation",
      ...externalEventHandlers,
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef,
    };
  };

  const getBackdropProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther
  ): UseModalBackdropSlotProps<TOther> => {
    const externalEventHandlers = otherHandlers;

    return {
      "aria-hidden": true,
      ...externalEventHandlers,
      onClick: createHandleBackdropClick(externalEventHandlers),
      open,
    };
  };

  return {
    getRootProps,
    getBackdropProps,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal,
    exited,
    hasTransition,
  };
}

export default useModal;

export interface UseModalRootSlotOwnProps {
  role: React.AriaRole;
  onKeyDown: React.KeyboardEventHandler;
  ref: React.RefCallback<Element> | null;
}

export interface UseModalBackdropSlotOwnProps {
  "aria-hidden": React.AriaAttributes["aria-hidden"];
  onClick: React.MouseEventHandler;
  open?: boolean;
}

export type UseModalBackdropSlotProps<TOther = {}> = TOther & UseModalBackdropSlotOwnProps;

export type UseModalRootSlotProps<TOther = {}> = TOther & UseModalRootSlotOwnProps;

export type UseModalParameters = {
  /**
   * A single child content element.
   */
  children: React.ReactElement<any> | undefined | null;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;
  onKeyDown?: React.KeyboardEventHandler;
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter?: () => void;
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited?: () => void;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  rootRef: React.Ref<Element>;
};

export interface UseModalReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends EventHandlers = {}>(
    externalProps?: TOther
  ) => UseModalRootSlotProps<TOther>;
  /**
   * Resolver for the backdrop slot's props.
   * @param externalProps props for the backdrop slot
   * @returns props that should be spread on the backdrop slot
   */
  getBackdropProps: <TOther extends EventHandlers = {}>(
    externalProps?: TOther
  ) => UseModalBackdropSlotProps<TOther>;
  /**
  /**
   * A ref to the component's root DOM element.
   */
  rootRef: React.RefCallback<Element> | null;
  /**
   * A ref to the component's portal DOM element.
   */
  portalRef: React.RefCallback<Element> | null;
  /**
   * If `true`, the modal is the top most one.
   */
  isTopModal: () => boolean;
}

import * as React from "react";
import clsx from "clsx";
import composeClasses from "@mui/utils/composeClasses";
import Portal from "./Portal";
import { useDefaultProps } from "../DefaultPropsProvider";
import Backdrop from "./Backdrop";
import useModal from "./useModal";
import { getModalUtilityClass } from "./modalClasses";
import useSlot from "../utils/useSlot";
import { useForkRef } from "../utils";

const useUtilityClasses = (ownerState) => {
  const { open, exited, classes } = ownerState;

  const slots = {
    root: ["root", !open && exited && "hidden"],
    backdrop: ["backdrop"],
  };

  return composeClasses(slots, getModalUtilityClass, classes);
};

const ModalRoot = styled.div`
position: fixed;
    z-index: (theme.vars || theme).zIndex.modal;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    variants: [
      {
        props: ({ ownerState }) => !ownerState.open && ownerState.exited,
        style: {
          visibility: "hidden",
        },
      },
    ]`;

const ModalBackdrop = styled(Backdrop)`
  z-index: -1;
`;

const Modal = React.forwardRef(function Modal(inProps, ref) {
  const props = useDefaultProps({ name: "MuiModal", props: inProps });
  const {
    BackdropComponent = ModalBackdrop,
    BackdropProps,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    children,
    container,
    component,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onBackdropClick,
    onClose,
    onTransitionEnter,
    onTransitionExited,
    open,
    slotProps = {},
    slots = {},
    theme,
    ...other
  } = props;

  const propsWithDefaults = {
    ...props,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
  };

  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition,
  } = useModal({
    ...propsWithDefaults,
    rootRef: ref,
  });

  const ownerState = {
    ...propsWithDefaults,
    exited,
  };

  const classes = useUtilityClasses(ownerState);

  const childProps = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = "-1";
  }

  // It's a Transition like component
  if (hasTransition) {
    const { onEnter, onExited } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }

  const externalForwardedProps = {
    slots: {
      root: components.Root,
      backdrop: components.Backdrop,
      ...slots,
    },
    slotProps: {
      ...componentsProps,
      ...slotProps,
    },
  };

  const [RootSlot, rootProps] = useSlot("root", {
    elementType: ModalRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: clsx(
      className,
      classes?.root,
      !ownerState.open && ownerState.exited && classes?.hidden
    ),
  });

  const [BackdropSlot, backdropProps] = useSlot("backdrop", {
    elementType: BackdropComponent,
    externalForwardedProps,
    additionalProps: BackdropProps,
    getSlotProps: (otherHandlers) => {
      return getBackdropProps({
        ...otherHandlers,
        onClick: (e) => {
          if (onBackdropClick) {
            onBackdropClick(e);
          }
          if (otherHandlers?.onClick) {
            otherHandlers.onClick(e);
          }
        },
      });
    },
    className: clsx(BackdropProps?.className, classes?.backdrop),
    ownerState,
  });

  const backdropRef = useForkRef(BackdropProps?.ref, backdropProps.ref);

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  return (
    <Portal ref={portalRef} container={container}>
      <RootSlot {...rootProps} {...other}>
        {!hideBackdrop && BackdropComponent ? (
          <BackdropSlot {...backdropProps} ref={backdropRef} />
        ) : null}

        {children}
      </RootSlot>
    </Portal>
  );
});

export default Modal;

export interface ModalProps {
  /**
   * A single child content element.
   */
  children: React.ReactElement<unknown>;
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop?: boolean;
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick?: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: {
    bivarianceHack(event: {}, reason: "backdropClick" | "escapeKeyDown"): void;
  }["bivarianceHack"];

  /**
   * If `true`, the component is shown.
   */
  open: boolean;
}
