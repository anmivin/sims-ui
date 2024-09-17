import * as ReactDOM from "react-dom";
import React, { useState, useEffect, useRef, useCallback } from "react";
import CloseIcon from "../icons/xmark";
import "./Modal.css";
import styled from "@emotion/styled";

const styledDiv = styled.div`
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.363);
    cursor: pointer;
  }

  .modal-body {
    position: relative;
    bottom: 0;
    left: 0;
    min-width: 400px;
    min-height: 400px;
    border-radius: 10px;
    background-color: rgb(104, 89, 245);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
    visibility: visible;
    cursor: default;
  }

  .modal-button {
    border-radius: 6px;
    background-color: rgb(111, 0, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

interface ModalProps {
  children: React.ReactNode;
  id: number;
  onClose: () => void;
}

const Modal = ({ children, id, onClose }: ModalProps) => {
  const [isCreatedPortal, setCreatedPortal] = useState<boolean>(false);

  useEffect(() => {
    const existportal = document.querySelector(`.portal-${id}`);
    if (existportal) return;
    const portal = document.createElement("div");
    portal.classList.add(`portal-${id}`);
    document.body.appendChild(portal);
    setCreatedPortal(true);
  }, [id]);

  const modalRef = useRef<HTMLDivElement>(null);

  const modalCloseHandler = useCallback(
    (target?: EventTarget) => {
      if (target && modalRef.current?.contains(target as Node)) return;
      const portal = document.querySelector(`.portal-${id}`);
      portal && document.body.removeChild(portal);
      onClose();
    },
    [id]
  );

  if (!isCreatedPortal) return null;

  return ReactDOM.createPortal(
    <div onClick={(e) => modalCloseHandler(e.target)} className='backdrop'>
      <div ref={modalRef} className='modal-body'>
        <div>
          <div className='modal-button' onClick={() => modalCloseHandler()}>
            <CloseIcon />
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.querySelector(`.portal-${id}`) as HTMLElement
  );
};

export default Modal;
