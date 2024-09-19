import IconWrapper, { IconProps } from "../IconWrapper";
import React from "react";

const RadioUncheckedIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
              <defs>
    <linearGradient id="radio-unchecked" x1="0%" x2="0%" y1="0%" y2="100%">
      <stop offset="0%" stopColor="#f9f9f9" />
      <stop offset="90%" stopColor="#dddddd" />
    </linearGradient>
  </defs>
      <path
      fill='url(#radio-unchecked)'
        d='M 12 23 C 18 23 23 18 23 12 C 23 6 18 1 12 1 C 6 1 1 6 1 12 C 1 18 6 23 12 23 Z'
      />
    </IconWrapper>
  );
};

export default RadioUncheckedIcon;
