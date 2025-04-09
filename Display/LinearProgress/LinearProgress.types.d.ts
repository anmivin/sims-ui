import { Variant } from '../../shared/types';
export interface LinearProgressProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    value?: number;
    variant?: Variant;
}
