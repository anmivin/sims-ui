import IconWrapper, { IconProps } from "../IconWrapper";
import React from "react";
const CloseIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} isLineIcon>
      <path strokeWidth={4} d='M 20 4 L 4 20 M 4 4 L 20 20' />

    </IconWrapper>
  );
};

export default CloseIcon;
