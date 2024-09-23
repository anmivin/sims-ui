import IconWrapper, {IconProps} from "../IconWrapper";
import * as React from 'react';
const CheckBoxChecked = (props: IconProps) => {
  return (
    <IconWrapper {...props} >
        <defs>
    <linearGradient id="checkbox-checked" x1="0%" x2="0%" y1="0%" y2="100%">
      <stop offset="0%" stopColor="#5db823" />
      <stop offset="90%" stopColor="#269331" />
    </linearGradient>
  </defs>
      <path fill="url(#checkbox-checked)" d="M 2 6 C 2 4 4 2 6 2 L 18 2 C 20 2 22 4 22 6 L 22 18 C 22 20 20 22 18 22 L 6 22 C 4 22 2 20 2 17 L 2 6" />
      <path             strokeLinecap='round'
strokeLinejoin='round'  strokeWidth='2px' fill='none'stroke='white' d='M 5 13 L 9 18 L 18 6' />
   
    </IconWrapper>
  );
};

export default CheckBoxChecked;
