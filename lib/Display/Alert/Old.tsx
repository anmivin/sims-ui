import styled from "@emotion/styled";
import React from "react";
import { IconButtonModern } from "sims-ui";
import CloseIcon from "../../icons/Modern/CloseIcon";
import { ModernButton } from "sims-ui";
const StyledContainer = styled('div')({
    width: '300px',
    height: '80px',
    color: 'white',
borderRadius: '8px',
   
backgroundColor: '#C9B57F',
border: '1px solid #9B8752',
 boxShadow: '0px 2px 2px 1px rgba(0,0,0,0.5)'  

});


const Header = styled('div')({
width: '100%',
height: '20px',
backgroundColor: 'rgba(255,255,255,0.3)'
})
const Content = styled('div')({
    padding: '16px',
    })
export const AlertOld = ({children, action}: {children: React.ReactNode, action?: () => void}) => {
return (
    <StyledContainer className="error"><Header></Header><Content><IconButtonModern><CloseIcon color="#9f1a1f"/></IconButtonModern>{children}{action && <ModernButton/>}</Content></StyledContainer>
)
}