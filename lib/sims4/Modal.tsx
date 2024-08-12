import styled from '@emotion/styled';
import React, { ReactNode } from 'react'
import { IconButton } from 'sims-ui';
import CloseIcon from '../icons/CloseIcon copy';
import { Button } from 'sims-ui';
const StyledWrapper = styled.div`
  font-family: The Sims Sans;
  width: 600px;
background-color: rgba(251, 251, 251, 0.7);
border-radius: 3%;
display: flex;
flex-direction: column;
box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);

`

const Content = styled.div`
width: 100%;
height: 400px;
border-radius: 3% 3% 0px 0px;
background-color: #fff;
display: flex;
justify-content: center;
align-items: center;
color: #1e81e0;
flex-direction: column;
gap: 20px;

`

const Footer = styled.div`
border-radius: 3% 3% 0px 0px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 20px;
gap: 20px;
`

const Header = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 20px;
gap: 20px;
`

interface ModalProps {
    title: string;
children: ReactNode
}
export const Modal = ({title, children}:ModalProps) => {
    return (<StyledWrapper><Content><Header><h1 style={{color: '#0949ab'}}>{title}</h1><IconButton><CloseIcon/></IconButton></Header>{children}</Content><Footer><Button fullWidth>sdfsdfsfd</Button><Button fullWidth>sdfsdfsfd</Button></Footer></StyledWrapper>)
}