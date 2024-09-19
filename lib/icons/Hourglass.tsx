import IconWrapper, { IconProps } from "./IconWrapper";
import React from "react";
const HourglassIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path id='hourglass_1_1' d='M 0 0 L 29 0 L 15 21 L 13 21 L 0 0' />
      <path id='hourglass_1_2' d='M 13 21 L 0 42 L 28 42 L 15 21 L 13 21' />
      <path id='hourglass_1_3' d='M 0 0 L 29 0 L 15 21 L 28 42 L 0 42 L 13 21 L 0 0' />
      <path id='hourglass_2_1' d='M 0 0 L 28 0 L 15 21 L 28 42 L 0 42 L 13 21 L 0 0' />

      <path
        id='hourglass_2_2'
        d='M 3 5 L 25 5 L 15 21 L 15 34 L 23 34 L 28 42 L 0 42 L 5 34 L 13 34 L 13 21 L 3 5'
      />
      <path id='hourglass_2_3' d='M 0 0 L 28 0 L 25 5 L 3 5 L 0 0' />
      <path id='hourglass_2_4' d='M 13 21 L 5 34 L 13 34 L 13 21' />
      <path id='hourglass_2_5' d='M 15 21 L 23 34 L 15 34 L 15 21' />

      <path id='hourglass_3_1' d='M 0 0 L 28 0 L 15 21 L 28 42 L 0 42 L 13 21 L 0 0' />
      <path
        id='hourglass_3_2'
        d='M 10 16 L 18 16 L 15 21 L 15 26 L 18 26 L 28 42 L 0 42 L 10 26 L 13 26 L 13 21 L 10 16'
      />
      <path id='hourglass_3_3' d='M 0 0 L 28 0 L 18 16 L 10 16 L 0 0' />
      <path id='hourglass_3_4' d='M 13 21 L 13 26 L 10 26 L 13 21 L 13 21' />
      <path id='hourglass_3_5' d='M 15 21 L 18 26 L 15 26 L 15 21' />
    </IconWrapper>
  );
};

export default HourglassIcon;
