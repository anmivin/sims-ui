import * as React from 'react';
export interface UseSliderParameters {
    defaultValue?: number;
    disabled?: boolean;
    marks?: boolean;
    max?: number;
    min?: number;
    onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
    onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
    orientation?: 'horizontal' | 'vertical';
    /**
     * The ref attached to the root of the Slider.
     */
    rootRef?: React.Ref<Element>;
    step?: number | null;
    value?: number;
}
export interface Mark {
    value: number;
    label?: React.ReactNode;
}
export type UseSliderRootSlotOwnProps = {
    onMouseDown: React.MouseEventHandler;
    ref: React.RefCallback<Element> | null;
};
export type UseSliderRootSlotProps<ExternalProps = {}> = Omit<ExternalProps, keyof UseSliderRootSlotOwnProps> & UseSliderRootSlotOwnProps;
export type UseSliderThumbSlotOwnProps = {
    onMouseLeave: React.MouseEventHandler;
    onMouseOver: React.MouseEventHandler;
};
export type UseSliderThumbSlotProps<ExternalProps = {}> = Omit<ExternalProps, keyof UseSliderThumbSlotOwnProps> & UseSliderThumbSlotOwnProps;
export type UseSliderHiddenInputOwnProps = {
    disabled: boolean;
    name?: string;
    onBlur: React.FocusEventHandler;
    onChange: React.ChangeEventHandler;
    onFocus: React.FocusEventHandler;
    step?: number | 'any';
    style: React.CSSProperties;
    tabIndex?: number;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
};
export type UseSliderHiddenInputProps<ExternalProps = {}> = Omit<ExternalProps, keyof UseSliderHiddenInputOwnProps> & UseSliderHiddenInputOwnProps;
export type Axis = 'horizontal' | 'vertical';
export interface AxisProps<T extends Axis> {
    offset: (percent: number) => T extends 'horizontal' ? {
        left: string;
    } : T extends 'vertical' ? {
        bottom: string;
    } : T extends 'horizontal-reverse' ? {
        right: string;
    } : never;
    leap: (percent: number) => T extends 'horizontal' | 'horizontal-reverse' ? {
        width: string;
    } : T extends 'vertical' ? {
        height: string;
    } : never;
}
export interface UseSliderReturnValue {
    /**
     * The active index of the slider.
     */
    active: number;
    /**
     * The orientation of the slider.
     */
    axis: Axis;
    /**
     * Returns the `offset` and `leap` methods to calculate the positioning styles based on the slider axis.
     */
    axisProps: {
        [key in Axis]: AxisProps<key>;
    };
    /**
     * Resolver for the hidden input slot's props.
     * @param externalProps props for the hidden input slot
     * @returns props that should be spread on the hidden input slot
     */
    getHiddenInputProps: <ExternalProps extends Record<string, unknown> = {}>(externalProps?: ExternalProps) => UseSliderHiddenInputProps<ExternalProps>;
    /**
     * Resolver for the root slot's props.
     * @param externalProps props for the root slot
     * @returns props that should be spread on the root slot
     */
    getRootProps: <ExternalProps extends Record<string, unknown> = {}>(externalProps?: ExternalProps) => UseSliderRootSlotProps<ExternalProps>;
    /**
     * Resolver for the thumb slot's props.
     * @param externalProps props for the thumb slot
     * @returns props that should be spread on the thumb slot
     */
    getThumbProps: <ExternalProps extends Record<string, unknown> = {}>(externalProps?: ExternalProps) => UseSliderThumbSlotProps<ExternalProps>;
    /**
     * Resolver for the thumb slot's style prop.
     * @param index of the currently moved thumb
     * @returns props that should be spread on the style prop of thumb slot
     */
    getThumbStyle: (index: number) => object;
    /**
     * The marks of the slider. Marks indicate predetermined values to which the user can move the slider.
     */
    marks: Mark[];
    /**
     * The thumb index for the current value when in hover state.
     */
    open: number;
    /**
     * Ref to the root slot's DOM node.
     */
    rootRef: React.RefCallback<Element> | null;
    /**
     * The track leap for the current value of the slider.
     */
    trackLeap: number;
    /**
     * The track offset for the current value of the slider.
     */
    trackOffset: number;
    /**
     * The possible values of the slider.
     */
    values: number[];
}
export declare function valueToPercent(value: number, min: number, max: number): number;
export declare function useSlider(parameters: UseSliderParameters): UseSliderReturnValue;
