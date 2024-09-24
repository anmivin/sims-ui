import styled from "@emotion/styled";
import React, { ReactNode, useState } from "react";
import  IconButton from '../../Inputs/IconButton/IconButton';
import CloseIcon from "../../icons/Modern/CloseIcon";
import { ModernButton } from "../../Inputs/Button/Modern";
import Dialog from './Dialog'
import Popover from '../Popover/Popover'
const StyledWrapper = styled('div')({
  fontFamily: 'The Sims Sans',
  width: '600px',
  backgroundColor: 'rgba(251, 251, 251, 0.7)',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 0px 9px 1px rgba(0, 0, 0, 0.3)',

})


const Content = styled('div')({
    width: '100%',
  height: '400px',
  borderRadius: '10px 10px 0px 0px',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#1e81e0',
  flexDirection: 'column',
  gap: '20px',
    padding: '20px'
})

;

const Footer = styled.div`
  border-radius: 3% 3% 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
`;

interface DialogProps {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void
}
export const DialogModern = ({ title, children,open, onClose }: DialogProps) => {
  const [anchorEl, setAnchorEl] = useState(null)
  return (
    <Dialog open={open} onBackdropClick={onClose}> 
    <StyledWrapper>
      <Content>
        <Header>
          <h1 style={{ color: "#0949ab" }}>{title}</h1>
          <IconButton>
            <CloseIcon onClick={() => onClose()}/>
          </IconButton>
        </Header>
        {children}
      </Content>
      <Footer>
        <ModernButton fullWidth onClick={(e) => setAnchorEl(e.currentTarget)}>sdfsdfsfd</ModernButton>
        <ModernButton fullWidth>sdfsdfsfd</ModernButton>
      </Footer></StyledWrapper>
      
      <Popover open={!!anchorEl} anchorEl={anchorEl} onBackdropClick={() => setAnchorEl(null)}>sadsadsadawe</Popover>
    </Dialog>
  );
};
