import styled from "@emotion/styled";
import Button from "../Button/Button";
import React, {  ReactNode } from 'react'
import { css } from "@emotion/react";
import clsx from "clsx";
import Modal, { ModalProps } from "../../Internal/Modal";
const createStyles = (numberItems: number) => {
 
        const pathStyles = {};
        const diff = 360/numberItems;
        for (let i = 0; i < numberItems; i += 1) {
          pathStyles[`.menuItem_${i}`] = css`
                  position: absolute;

        transform: translate(-50%, -50%);
                   left: calc(50% + 120px * cos(${i*diff - 90 }deg));
        top: calc(50% + 120px * sin(${i*diff - 90}deg));
          `;
        }
        return pathStyles;

  };



const MenuContent = styled('div')<{numberItems: number}>(({numberItems}) => ({
    
        position: 'relative',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
 backgroundColor: '#f0f0f0',
 ...createStyles(numberItems),
      
      '.menuComponent': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40px',
        height: '20px',
      },
      


}))


export interface ContextMenuProps { 
    options: {item: string, action: () => void}[];
    component: ReactNode;
    open: boolean
}
export const ContextMenu = (   {open, options,component}: ContextMenuProps) => {

    return (<>
    <MenuContent numberItems={options.length}>    
    { component},
    {/* <Modal open={open} hideBackdrop> */}{open && <>{options.map((item, index) => (
        <Button key={index} className={clsx(`menuItem_${index}`, 'contextMenuButton')}>{item.item}</Button>
    ))}</>}{/* </Modal> */}

  
    </MenuContent>

    
    </>)
}

