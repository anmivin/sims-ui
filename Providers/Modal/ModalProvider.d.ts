import * as React from "react";
interface Modal {
    mount: Element;
    modalRef: Element;
}
interface ModalContextProps {
    add: (modal: Modal) => number;
    remove: (modal: Modal) => number;
}
export declare const ModalContext: React.Context<ModalContextProps>;
declare const ModalProvider: ({ children }: {
    children: React.ReactNode;
}) => JSX.Element;
export default ModalProvider;
