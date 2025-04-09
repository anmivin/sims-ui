import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { ModalProps } from '../Modal';
import { SlideProps } from '../Slide';
import { PaperProps } from '../Paper';
import { TransitionProps } from '../transitions/transition';
import { DrawerClasses } from './drawerClasses';
import { default as PropTypes } from 'prop-types';
import * as React from "react";
export interface DrawerProps extends StandardProps<ModalProps, "open" | "children"> {
    /**
     * Side from which the drawer will appear.
     * @default 'left'
     */
    anchor?: "left" | "top" | "right" | "bottom";
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DrawerClasses>;
    /**
     * The elevation of the drawer.
     * @default 16
     */
    elevation?: number;
    /**
     * Props applied to the [`Modal`](https://mui.com/material-ui/api/modal/) element.
     * @default {}
     */
    ModalProps?: Partial<ModalProps>;
    /**
     * Callback fired when the component requests to be closed.
     * The `reason` parameter can optionally be used to control the response to `onClose`.
     *
     * @param {object} event The event source of the callback.
     * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
     */
    onClose?: ModalProps["onClose"];
    /**
     * If `true`, the component is shown.
     * @default false
     */
    open?: boolean;
    /**
     * Props applied to the [`Paper`](https://mui.com/material-ui/api/paper/) element.
     * @default {}
     */
    PaperProps?: Partial<PaperProps<React.ElementType>>;
    /**
     * Props applied to the [`Slide`](https://mui.com/material-ui/api/slide/) element.
     */
    SlideProps?: Partial<SlideProps>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     * @default {
     *   enter: theme.transitions.duration.enteringScreen,
     *   exit: theme.transitions.duration.leavingScreen,
     * }
     */
    transitionDuration?: TransitionProps["timeout"];
    /**
     * The variant to use.
     * @default 'temporary'
     */
    variant?: "permanent" | "persistent" | "temporary";
}
/**
 * The props of the [Modal](https://next.mui.com/material-ui/api/modal/) component are available
 * when `variant="temporary"` is set.
 *
 * Demos:
 *
 * - [Drawer](https://next.mui.com/material-ui/react-drawer/)
 *
 * API:
 *
 * - [Drawer API](https://next.mui.com/material-ui/api/drawer/)
 */
declare function Drawer(props: DrawerProps): React.JSX.Element;
declare namespace Drawer {
    var propTypes: {
        /**
         * Side from which the drawer will appear.
         * @default 'left'
         */
        anchor: PropTypes.Requireable<string>;
        /**
         * @ignore
         */
        BackdropProps: PropTypes.Requireable<object>;
        /**
         * The content of the component.
         */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Override or extend the styles applied to the component.
         */
        classes: PropTypes.Requireable<object>;
        /**
         * @ignore
         */
        className: PropTypes.Requireable<string>;
        /**
         * The elevation of the drawer.
         * @default 16
         */
        elevation: any;
        /**
         * If `true`, the backdrop is not rendered.
         * @default false
         */
        hideBackdrop: PropTypes.Requireable<boolean>;
        /**
         * Props applied to the [`Modal`](https://mui.com/material-ui/api/modal/) element.
         * @default {}
         */
        ModalProps: PropTypes.Requireable<object>;
        /**
         * Callback fired when the component requests to be closed.
         * The `reason` parameter can optionally be used to control the response to `onClose`.
         *
         * @param {object} event The event source of the callback.
         * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
         */
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * If `true`, the component is shown.
         * @default false
         */
        open: PropTypes.Requireable<boolean>;
        /**
         * Props applied to the [`Paper`](https://mui.com/material-ui/api/paper/) element.
         * @default {}
         */
        PaperProps: PropTypes.Requireable<object>;
        /**
         * Props applied to the [`Slide`](https://mui.com/material-ui/api/slide/) element.
         */
        SlideProps: PropTypes.Requireable<object>;
        /**
         * The system prop that allows defining system overrides as well as additional CSS styles.
         */
        sx: PropTypes.Requireable<object>;
        /**
         * The duration for the transition, in milliseconds.
         * You may specify a single timeout for all transitions, or individually with an object.
         * @default {
         *   enter: theme.transitions.duration.enteringScreen,
         *   exit: theme.transitions.duration.leavingScreen,
         * }
         */
        transitionDuration: PropTypes.Requireable<NonNullable<number | PropTypes.InferProps<{
            appear: PropTypes.Requireable<number>;
            enter: PropTypes.Requireable<number>;
            exit: PropTypes.Requireable<number>;
        }> | null | undefined>>;
        /**
         * The variant to use.
         * @default 'temporary'
         */
        variant: PropTypes.Requireable<string>;
    };
}
export default Drawer;
export declare function isHorizontal(anchor: any): boolean;
export declare function getAnchor({ direction }: {
    direction: any;
}, anchor: any): any;
/**
 * The props of the [Modal](/material-ui/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
declare const Drawer: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
export default Drawer;
