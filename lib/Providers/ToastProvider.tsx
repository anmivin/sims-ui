import React, { createContext, ReactNode, useContext, useState } from "react";

import Toast from "./Toast";
export interface ToastProps {
  title?: string;
  text: string;
  variant: "info" | "error" | "success";
}

export interface ToastType extends ToastProps {
  id: number;
}

interface ToastsContextProps {
  addToast: (toast: ToastProps) => void;
}

export const ToastContext = createContext({} as ToastsContextProps);

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const handleClose = (toastId: number) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== toastId));
  };

  const addToast = (toast: ToastProps) => {
    const timestamp = Date.now();
    setToasts((prevState) => [...prevState, { ...toast, id: timestamp }]);
    setTimeout(() => handleClose(timestamp), 5000);
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
          <Toast key={toast.id} title={toast.title} variant={toast.variant} text={toast.text} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
