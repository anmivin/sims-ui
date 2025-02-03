import * as React from "react";
import { AlertModern } from "../../Surfaces/Alert/Modern";
import Toast from "./Toast";

export enum ToastVariants {
  info = "info",
  error = "error",
  success = "success",
}
export interface ToastProps {
  title?: string;
  children: React.ReactNode;
  variant: ToastVariants;
  closeTime?: number | "none";
}

export interface ToastType extends ToastProps {
  id: number;
}

interface ToastsContextProps {
  addToast: (toast: ToastProps) => void;
}

export const ToastContext = React.createContext({} as ToastsContextProps);

export const useToast = () => React.useContext(ToastContext);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  const handleClose = (toastId: number) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== toastId));
  };

  const addToast = (toast: ToastProps) => {
    const timestamp = Date.now();
    setToasts((prevState) => [...prevState, { ...toast, id: timestamp }]);
    toast.closeTime !== "none" && setTimeout(() => handleClose(timestamp), toast.closeTime ?? 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "8px",
          zIndex: 200,
        }}
      >
        {toasts.map((toast) => (
          <AlertModern {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
