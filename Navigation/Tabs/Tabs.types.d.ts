import { Variant } from '../../shared/types';
export type Orientation = "horizontal" | "vertical";
export interface TabsProps {
    onChange?: (value: any) => void;
    orientation?: Orientation;
    value?: any;
    options: {
        label: string;
        disabled?: boolean;
        value: any;
        icon?: React.ReactNode;
    }[];
    variant?: Variant;
    iconPosition?: "start" | "end";
}
export interface TabOwnProps {
    disabled?: boolean;
    icon?: string | React.ReactElement<unknown>;
    iconPosition?: "start" | "end";
    label?: React.ReactNode;
    value?: any;
    onClick?: (val: any) => void;
    selected?: boolean;
    onChange?: () => void;
}
