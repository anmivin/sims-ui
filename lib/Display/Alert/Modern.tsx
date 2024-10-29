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
    '&.success': {
background: 'linear-gradient(180deg, #64b52c 60%,  90%, #0d983f)'
    },
    '&.warning': {
        background: 'linear-gradient(180deg, #f67c0f 60%,  90%, #ee5d1a)'
            },
            '&.info': {
                background: 'linear-gradient(180deg, #2885ca 60%,  90%, #3259a6)'
                    },
                    '&.error': {
                        background: 'linear-gradient(180deg, #603785 60%,  90%, #4c2985)'
                            }

});


const Header = styled('div')({
width: '100%',
height: '20px',
backgroundColor: 'rgba(255,255,255,0.3)'
})
const Content = styled('div')({
    padding: '16px',
    })
export const AlertModern = ({children, action}: {children: React.ReactNode, action?: () => void}) => {
return (
    <StyledContainer className="error"><Header></Header><Content><IconButtonModern><CloseIcon color="#9f1a1f"/></IconButtonModern>{children}{action && <ModernButton/>}</Content></StyledContainer>
)
}