import React, { ReactNode, createContext, useContext, useState } from "react";
import Modal from "./Modal";

interface ModalProps {
  content: ReactNode;
}

export interface ModalType extends ModalProps {
  id: number;
}

interface ModalContextProps {
  modalsMap: ModalProps[];
  onOpenModal: (pro: ModalProps) => void;
  onCloseModal: (id: number) => void;
}

export const ModalContext = createContext({} as ModalContextProps);

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [modalsMap, setModalsMap] = useState<ModalType[]>([]);

  const onOpenModal = (props: ModalProps) => {
    setModalsMap((prev) => [...prev, { ...props, id: Date.now() }]);
  };

  const onCloseModal = (modalId: number) => {
    setModalsMap((prev) => [...prev.filter((item) => item.id !== modalId)]);
  };

  return (
    <ModalContext.Provider value={{ modalsMap, onOpenModal, onCloseModal }}>
      {modalsMap.map((item) => {
        return (
          <Modal key={item.id} id={item.id} onClose={() => onCloseModal(item.id)}>
            {item.content}
          </Modal>
        );
      })}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
