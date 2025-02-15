import * as React from "react";
import * as AlertTypes from "../../Surfaces/Alert/Alert.types";
import Alert from "../../Surfaces/Alert/Alert";

export interface ToastProps extends AlertTypes.AlertProps {
  closeTime?: number | "none";
}

export interface ToastType extends ToastProps {
  toastId: number;
}

interface ToastsContextProps {
  addToast: (toast: ToastProps) => void;
}

export const ToastContext = React.createContext({} as ToastsContextProps);

export const useToast = () => React.useContext(ToastContext);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  const handleClose = (toastId: number) => {
    setToasts((prevState) => prevState.filter((toast) => toast.toastId !== toastId));
  };

  const addToast = (toast: ToastProps) => {
    const timestamp = Date.now();
    setToasts((prevState) => [...prevState, { ...toast, toastId: timestamp }]);
    toast.closeTime !== "none" && setTimeout(() => handleClose(timestamp), toast.closeTime ?? 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "8px",
          zIndex: 200,
        }}
      >
        {toasts.map((toast) => (
          <Alert {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
