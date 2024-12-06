import styled from "@emotion/styled";
import Button from "../Button/Button";
import React from 'react'

import {ContextMenu} from './ContextMenu'




const StyledMenu = styled('div')({
'.contextMenuButton': {
    fontFamily: "Comic Sans Ms",
    fontSize: "16px",
    borderRadius: "50px",
    color: "#a8b4fd",
    backgroundColor: '#36378f',
boxShadow: "inset 0 -2px 18px 2px #b1c0fc, 0 0 1px 2px #222a55",

padding: '10px 30px',
    height: "40px",
    width: 'fit-content',
    transition: "color 0.1s ease-in-out",
    "&:hover": {
      color: "#00ff00",
    },
}
})


export const ContextMenuOld = () => {
    const [open, setOpen] = React.useState(false)
    return (<StyledMenu><ContextMenu open={open} options={[{item: 'one long name', action: () => {}}, {item: 'two long name',
         action: () => {}}, {item: 'three long name ', action: () => {}},{item: 'four long namelong name', 
            action: () => {}},{item: 'five long name', action: () => {}},]} 
            component={<Button className="menuComponent" onClick={() => setOpen(prev => !prev)}>asdasd</Button>}/></StyledMenu>)
}

