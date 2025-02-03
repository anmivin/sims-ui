import * as React from "react";

interface Modal {
  mount: Element;
  modalRef: Element;
}

interface ModalContextProps {
  add: (modal: Modal) => number;
  remove: (modal: Modal) => number;
}

export const ModalContext = React.createContext({} as ModalContextProps);

const ModalProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [modals, setModals] = React.useState<Modal[]>([]);

  const add = React.useCallback(
    (modal: Modal) => {
      let modalIndex = modals.indexOf(modal);
      if (modalIndex !== -1) {
        return modalIndex;
      }

      modalIndex = modals.length;
      setModals((prev) => [...prev, modal]);

      return modalIndex;
    },
    [modals]
  );

  const remove = React.useCallback(
    (modal: Modal) => {
      const modalIndex = modals.indexOf(modal);

      if (modalIndex === -1) {
        return modalIndex;
      }

      setModals((prev) => prev.splice(modalIndex, 1));

      return modalIndex;
    },
    [modals]
  );

  return <ModalContext.Provider value={{ add, remove }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
