import styled from '@emotion/styled';
import React from 'react'

const StyledWrapper = styled.div`
border: 4px solid #121B61;
width: 300px;
height: 300px;
background-color: rgba(81, 115, 189, 0.9);
border-radius: 40px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px;
box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
`

const Content = styled.div`
border: 2px solid #121B61;
width: 260px;
height: 260px;
background-color: #95A6DE;
border-radius: 30px;
display: flex;
justify-content: center;
align-items: center;
padding: 20px;
`
export const Modal2 = () => {
    return (<StyledWrapper><Content></Content></StyledWrapper>)
}