import { DialogProps } from './Dialog';
interface OldDialogProps extends DialogProps {
    title?: string;
    actions?: {
        title: string;
        action: () => void;
    }[];
}
export declare const DialogOld: ({ title, children, open, onClose, actions }: OldDialogProps) => import("react/jsx-runtime").JSX.Element;
export {};
