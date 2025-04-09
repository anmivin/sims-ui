import * as React from "react";
export declare function clamp(value: number, min?: number, max?: number): number;
export declare const findClosestNumber: (value: number, numbers: number[]) => number;
export interface UseMovePosition {
    x: number;
    y: number;
}
interface useMoveHandlers {
    onScrubStart?: () => void;
    onScrubEnd?: () => void;
}
export declare function useMove<T extends HTMLElement = any>(onChange: (value: number) => void, handlers?: useMoveHandlers): {
    ref: React.RefObject<T>;
    active: boolean;
};
interface GetChangeValue {
    value: number;
    min: number;
    max: number;
    step: number;
}
export declare const getChangeValue: ({ value, min, max, step }: GetChangeValue) => number;
interface GetPosition {
    value: number;
    min: number;
    max: number;
}
export declare const getPosition: ({ value, min, max }: GetPosition) => number;
export interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    onChangeEnd?: (value: number) => void;
    marks?: {
        value: number;
        label?: React.ReactNode;
    }[];
    label?: React.ReactNode;
    thumbLabel?: string;
    disabled?: boolean;
    restrictToMarks?: boolean;
}
export declare const Slider: (props: SliderProps, ref: any) => import("react/jsx-runtime").JSX.Element;
export {};
