import { PortalProps } from '../Portal';
import { PolymorphicProps } from '../utils/PolymorphicComponent';
import * as React from "react";
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
export interface PopperTypeMap<AdditionalProps = {}, RootComponentType extends React.ElementType = "div"> {
    props: PopperOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}
export type PopperProps<RootComponentType extends React.ElementType = PopperTypeMap["defaultComponent"]> = PolymorphicProps<PopperTypeMap<{}, RootComponentType>, RootComponentType>;
export type PopperTooltipOwnProps = Omit<PopperOwnProps, "container" | "keepMounted" | "transition"> & {
    TransitionProps?: PopperTransitionProps;
};
export interface PopperTooltipTypeMap<AdditionalProps = {}, RootComponentType extends React.ElementType = "div"> {
    props: PopperTooltipOwnProps & AdditionalProps;
    defaultComponent: RootComponentType;
}
export type PopperTooltipProps<RootComponentType extends React.ElementType = PopperTooltipTypeMap["defaultComponent"]> = PolymorphicProps<PopperTooltipTypeMap<{}, RootComponentType>, RootComponentType>;
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
