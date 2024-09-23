import React, { ReactNode, createContext, useCallback, useContext, useState } from "react";
import Modal from "./Modal";

interface Modal {
  mount: Element;
  modalRef: Element;
}

interface Container {
  modals: Modal[];
}

interface ModalContextProps {
  add: (modal: Modal) => number;
  remove: (modal: Modal) => number;
}

export const ModalContext = createContext({} as ModalContextProps);

export const useModal = () => useContext(ModalContext);

const findIndexOf = <T,>(items: readonly T[], callback: (item: T) => boolean): number => {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
};

const ModalProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [modals, setModals] = useState<Modal[]>([]);

  const add = useCallback(
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

  const remove = useCallback(
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
