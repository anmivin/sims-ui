import { Variant } from '../../shared/types';
export interface ContextMenuProps {
    options: {
        item: string;
        action: () => void;
    }[];
    component: React.ReactElement;
    defaultOpen: boolean;
    variant?: Variant;
}
