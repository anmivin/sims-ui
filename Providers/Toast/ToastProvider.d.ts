import * as React from "react";
import * as AlertTypes from "../../Surfaces/Alert/Alert.types";
export interface ToastProps extends AlertTypes.AlertProps {
    closeTime?: number | "none";
}
export interface ToastType extends ToastProps {
    toastId: number;
}
interface ToastsContextProps {
    addToast: (toast: ToastProps) => void;
}
export declare const ToastContext: React.Context<ToastsContextProps>;
export declare const useToast: () => ToastsContextProps;
declare const ToastProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export default ToastProvider;
