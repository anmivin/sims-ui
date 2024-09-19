import { StyledOldSpinner } from "./CircularProgress.styled";
import React from "react";
const CircularProgressOld = ({ width = 120 }: { width?: number }) => {
  return (
    <StyledOldSpinner width={width} height={width} viewBox='0 0 52 52'>
<radialGradient  id="background" x1="0%" x2="0%" y1="0%" y2="100%">
      <stop offset="0%" stopColor="#5166a9" />
      <stop offset="100%" stopColor="#222943" />
    </radialGradient >
    <radialGradient  id="fill" x1="0%" x2="0%" y1="0%" y2="100%">
      <stop offset="0%" stopColor="#6c9add" />
      <stop offset="100%" stopColor="#365fa0" />
    </radialGradient >
      <path 
strokeLinejoin='round' className='contour'     stroke="#cad4db"
    fill="url(#background)"
     d='M 11 8 L 41 8 L 28 26 L 41 44 L 11 44 L 24 26 L 11 8 Z' />

   <path
    fill="url(#fill)"
        className='hourglass_1'
        d='M 15 12 L 37 12 L 27 26 L 27 37 L 35 37 L 39 43 L 13 43 L 17 37 L 25 37 L 25 26 L 15 12 Z'
      />
 
      <path
       fill="url(#fill)"
        className='hourglass_2'
        d='M 20 19 L 32 19 L 27 26 L 27 33 L 32 33 L 39 43 L 13 43 L 20 33 L 25 33 L 25 26 L 20 19 Z'
      /> 

      <path  fill="url(#fill)" className='hourglass_3' d='M 25 26 L 27 26 L 39 43 L 13 43 L 25 26 Z' /> 
    </StyledOldSpinner>
  );
};

export default CircularProgressOld;
