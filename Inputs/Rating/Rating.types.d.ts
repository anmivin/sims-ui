import { Variant, ComponentSize } from '../../shared/types';
import * as React from "react";
export interface RatingOwnProps {
    variant?: Variant;
    defaultValue?: number;
    disabled?: boolean;
    getLabelText?: (value: number) => string;
    max?: number;
    onChange?: (event: React.SyntheticEvent, value: number | null) => void;
    size?: ComponentSize;
}
