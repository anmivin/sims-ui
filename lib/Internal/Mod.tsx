import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "@emotion/styled";
import { useModal } from "../Providers/Modal/useModal";

export interface ModalProps {
  children: React.ReactElement<unknown>;
  hideBackdrop?: boolean;
  onBackdropClick?: () => void;
  onClose?: () => void;
  open: boolean;
}

const ModalRoot = styled("div")({
  position: "fixed",
  zIndex: "1000",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
});

const ModalBackdrop = styled("div")({
  zIndex: -1,
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
});

const Modal: React.FC<ModalProps> = React.forwardRef((props: ModalProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { children, hideBackdrop = false, onBackdropClick, onClose, open } = props;
 
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setMountNode(document.body);
  }, []);

  useModal({
    onClose,
    open,
  });

  if (!open) {
    return null;
  }

  return (
    <React.Fragment>
      {mountNode
        ? ReactDOM.createPortal(
            <ModalRoot ref={ref}>
              {!hideBackdrop ? <ModalBackdrop onClick={() => onBackdropClick?.()} /> : null}

              {children}
            </ModalRoot>,
            mountNode
          )
        : mountNode}
    </React.Fragment>
  );
});

export default Modal;


import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '../utils/types';
import { PortalProps } from '../Portal';
import { Theme } from '../styles';
import Backdrop, { BackdropProps } from '../Backdrop';
import { OverridableComponent } from '../OverridableComponent';
import { ModalClasses } from './modalClasses';

export interface ModalComponentsPropsOverrides {}

export interface ModalOwnerState extends ModalProps {
  exited: boolean;
}

export interface ModalSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the backdrop.
   */
  backdrop?: React.ElementType;
}

export interface ModalOwnProps {
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent?: React.ElementType<BackdropProps>;
  /**
   * Props applied to the [`Backdrop`](https://mui.com/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps?: Partial<BackdropProps>;
  /**
   * A single child content element.
   */
  children: React.ReactElement<unknown>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ModalClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition?: boolean;
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Backdrop?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<'div', ModalComponentsPropsOverrides, ModalOwnerState>;
    backdrop?: SlotComponentProps<typeof Backdrop, ModalComponentsPropsOverrides, ModalOwnerState>;
  };
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
  container?: PortalProps['container'];
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus?: boolean;
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus?: boolean;
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown?: boolean;
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: PortalProps['disablePortal'];
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus?: boolean;
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock?: boolean;
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop?: boolean;
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick?: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];
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
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: ModalSlots;
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', ModalComponentsPropsOverrides, ModalOwnerState>;
    backdrop?: SlotComponentProps<typeof Backdrop, ModalComponentsPropsOverrides, ModalOwnerState>;
  };
}

export interface ModalTypeMap<
  RootComponent extends React.ElementType = 'div',
  AdditionalProps = {},
> {
  props: AdditionalProps & ModalOwnProps;
  defaultComponent: RootComponent;
}

type ModalRootProps = NonNullable<ModalTypeMap['props']['slotProps']>['root'];

export declare const ModalRoot: React.FC<ModalRootProps>;



export type ModalProps<
  RootComponent extends React.ElementType = ModalTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ModalTypeMap<RootComponent, AdditionalProps>, RootComponent> & {
  component?: React.ElementType;
};


import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import HTMLElementType from '@mui/utils/HTMLElementType';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import composeClasses from '@mui/utils/composeClasses';
import FocusTrap from '../Unstable_TrapFocus';
import Portal from '../Portal';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Backdrop from '../Backdrop';
import useModal from './useModal';
import { getModalUtilityClass } from './modalClasses';
import useSlot from '../utils/useSlot';
import { useForkRef } from '../utils';

const useUtilityClasses = (ownerState) => {
  const { open, exited, classes } = ownerState;

  const slots = {
    root: ['root', !open && exited && 'hidden'],
    backdrop: ['backdrop'],
  };

  return composeClasses(slots, getModalUtilityClass, classes);
};

const ModalRoot = styled('div', {
  name: 'MuiModal',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.open && ownerState.exited && styles.hidden];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'fixed',
    zIndex: (theme.vars || theme).zIndex.modal,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    variants: [
      {
        props: ({ ownerState }) => !ownerState.open && ownerState.exited,
        style: {
          visibility: 'hidden',
        },
      },
    ],
  })),
);

const ModalBackdrop = styled(Backdrop, {
  name: 'MuiModal',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => {
    return styles.backdrop;
  },
})({
  zIndex: -1,
});

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/material-ui/api/dialog/)
 * - [Drawer](/material-ui/api/drawer/)
 * - [Menu](/material-ui/api/menu/)
 * - [Popover](/material-ui/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */
const Modal = React.forwardRef(function Modal(inProps, ref) {
  const props = useDefaultProps({ name: 'MuiModal', props: inProps });
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
    // eslint-disable-next-line react/prop-types
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
    childProps.tabIndex = '-1';
  }

  // It's a Transition like component
  if (hasTransition) {
    const { onEnter, onExited } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }

  const externalForwardedProps = {
    ...other,
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

  const [RootSlot, rootProps] = useSlot('root', {
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
      !ownerState.open && ownerState.exited && classes?.hidden,
    ),
  });

  const [BackdropSlot, backdropProps] = useSlot('backdrop', {
    elementType: BackdropComponent,
    externalForwardedProps,
    additionalProps: BackdropProps,
    getSlotProps: (otherHandlers) => {
      return getBackdropProps({
        ...otherHandlers,
        onClick: (event) => {
          if (onBackdropClick) {
            onBackdropClick(event);
          }
          if (otherHandlers?.onClick) {
            otherHandlers.onClick(event);
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
    <Portal ref={portalRef} container={container} disablePortal={disablePortal}>
      <RootSlot {...rootProps}>
        {!hideBackdrop && BackdropComponent ? (
          <BackdropSlot {...backdropProps} ref={backdropRef} />
        ) : null}
        <FocusTrap
          disableEnforceFocus={disableEnforceFocus}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          isEnabled={isTopModal}
          open={open}
        >
          {React.cloneElement(children, childProps)}
        </FocusTrap>
      </RootSlot>
    </Portal>
  );
});


export default Modal;