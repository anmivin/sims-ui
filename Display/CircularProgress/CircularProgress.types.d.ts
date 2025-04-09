import { Variant } from '../../shared/types';
export interface CircularProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    size?: number;
    variant?: Variant;
}
