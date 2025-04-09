import { DialogProps } from './Dialog';
interface ModernDialogProps extends DialogProps {
    title?: string;
    actions?: {
        title: string;
        action: () => void;
    }[];
}
export declare const DialogModern: ({ title, children, open, onClose, actions }: ModernDialogProps) => import("react/jsx-runtime").JSX.Element;
export {};
