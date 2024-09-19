import { StyledModernSpinner } from "./CircularProgress.styled";
import React from "react";
const CircularProgressModern = ({ width = 100 }: { width?: number }) => {
  return (
    <StyledModernSpinner width={width} height={width * 2} viewBox='0 0 24 24'>
      <path className='path_01' d='M 12 16 L 14 20 L 12 24 L 10 20 Z' />
      <path
        className='path_02'
        d='M 9.1716 14.8284 L 7.7574 19.0711 L 3.5147 20.4853 L 4.9289 16.2426 Z'
      />
      <path className='path_03' d='M 8 12 L 4 14 L 0 12 L 4 10 Z' />
      <path
        className='path_04'
        d='M 9.1716 9.1716 L 4.9289 7.7574 L 3.5147 3.5147 L 7.7574 4.9289 Z'
      />
      <path className='path_05' d='M 12 8 L 10 4 L 12 0 L 14 4 Z' />
      <path
        className='path_06'
        d='M 14.8284 9.1716 L 16.2426 4.9289 L 20.4853 3.5147 L 19.0711 7.7574 Z'
      />
      <path className='path_07' d='M 16 12 L 20 10 L 24 12 L 20 14 Z' />
      <path
        className='path_08'
        d='M 14.8284 14.8284 L 19.0711 16.2426 L 20.4853 20.4853 L 16.2426 19.0711 Z'
      />
    </StyledModernSpinner>
  );
};

export default CircularProgressModern;
