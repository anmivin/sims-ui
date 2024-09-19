import { StyledModernSpinner } from "./CircularProgress.styled";
import React from "react";
const CircularProgressModern = ({ width = 100 }: { width?: number }) => {
  return (
    <StyledModernSpinner width={width} height={width * 2} viewBox='0 0 24 24'>
      <path className='contour' d='M 0 0 L 30 0 L 17 21 L 30 42 L 0 42 L 13 21 L 0 0' />

      <path className='hourglass_1' d='M 14 21 L 2 1 L 28 1 L 16 21 L 14 21' />

      <path
        className='hourglass_2'
        d='M 4 4 L 26 4 L 16 21 L 16 36 L 25 36 L 28 41 L 2 41 L 5 36 L 14 36 L 14 21 L 4 4 '
      />

      <path
        className='hourglass_3'
        d='M 8 11 L 22 11 L 16 21 L 16 28 L 20 28 L 28 41 L 2 41 L 10 28 L 14 28 L 14 21 L 8 11'
      />

      <path className='hourglass_4' d='M 16 21 L 28 41 L 2 41 L 14 21 L 16 21' />
    </StyledModernSpinner>
  );
};

export default CircularProgressModern;
