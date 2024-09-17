import styled from "@emotion/styled";
import 
  ownerDocument
from "../utils/ownerDocument";

export interface ManagedModalProps {
  disableScrollLock?: boolean;
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



interface Modal {
  mount: Element;
  modalRef: Element;
}

interface Container {
  container: Element;
  modals: Modal[];
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

  add(modal: Modal, container: Element): number {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal);

    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
    });

    return modalIndex;
  }

  remove(modal: Modal): number {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];

    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);

  
    if (containerInfo.modals.length === 0) {
      this.containers.splice(containerIndex, 1);
    } 
    return modalIndex;
  }

  isTopModal(modal: Modal): boolean {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}

import extractEventHandlers from "@mui/utils/extractEventHandlers";
import { EventHandlers } from "../utils/types";


function getContainer(container: UseModalParameters["container"]) {
  return typeof container === "function" ? container() : container;
}

// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.

const manager = new ModalManager();

const useModal = (parameters: UseModalParameters): UseModalReturnValue => {
  const {
    container,
    children,
    onClose,
    open,
    rootRef,
  } = parameters;

  const modal = React.useRef<{ modalRef: HTMLDivElement; mount: HTMLElement }>({});
  const mountNodeRef = React.useRef<HTMLElement | null>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(modalRef, rootRef);

  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current!;
    modal.current.mount = mountNodeRef.current!;
    return modal.current;
  };

  const handleMounted = () => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };

  const handleOpen = () => {
    const resolvedContainer = getContainer(container) || getDoc().body;

    manager.add(getModal(), resolvedContainer);

    // The element was already mounted.
    if (modalRef.current) {
      handleMounted();
    }
  };

  const isTopModal = React.useCallback(() => manager.isTopModal(getModal()), [manager]);

  const handlePortalRef = (node: HTMLElement) => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    if (open && isTopModal()) {
      handleMounted();
    } 
  };

  const handleClose = React.useCallback(() => {
    manager.remove(getModal());
  }, [manager]);

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open, handleClose, handleOpen]);


  const createHandleBackdropClick = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    otherHandlers.onClick?.(event);

    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClose) {
      onClose();
    }
  };

  const getRootProps = (): UseModalRootSlotOwnProps => {
   
    return {

      ref: handleRef,
    };
  };

  const getBackdropProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther
  ): UseModalBackdropSlotOwnProps => {
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
  };
}


export interface UseModalRootSlotOwnProps {
  ref: React.RefCallback<Element> | null;
}

export interface UseModalBackdropSlotOwnProps {
  "aria-hidden": React.AriaAttributes["aria-hidden"];
  onClick: React.MouseEventHandler;
  open?: boolean;
}


export type UseModalParameters = {
  /**
   * A single child content element.
   */
  children: React.ReactElement<any> | undefined | null;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  rootRef: React.Ref<Element>;
  container?: Element | (() => Element | null) | null;
};

export interface UseModalReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: () => UseModalRootSlotOwnProps;
  /**
   * Resolver for the backdrop slot's props.
   * @param externalProps props for the backdrop slot
   * @returns props that should be spread on the backdrop slot
   */
  getBackdropProps: <TOther extends EventHandlers = {}>(
    externalProps?: TOther
  ) => UseModalBackdropSlotOwnProps;
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

import Portal from "../Internal/Portal";
import Backdrop from "./Backdrop";

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

const Modal = (props: ModalProps) => {
  const {
    children,
    hideBackdrop = false,
    onClose,
    open,
    container,
    ...other
  } = props;

  const propsWithDefaults = {
    ...props,
    hideBackdrop,

  };

  const {
    getRootProps,
    getBackdropProps,
  } = useModal({
    ...propsWithDefaults,
    rootRef: ref,
    onClose

  });


  if (!open) {
    return null;
  }

  return (
    <Portal container={container}>
      <ModalRoot {...getRootProps()} {...other}>
        {!hideBackdrop ? (
          <ModalBackdrop open={true} {...getBackdropProps()}/>
        ) : null}

        {children}
      </ModalRoot>
    </Portal>
  );
};

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
   */
  onBackdropClick?: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;

  /**
   * If `true`, the component is shown.
   */
  open: boolean;
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
    container?: Element | (() => Element | null) | null;
}
