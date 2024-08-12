import IconWrapper, {IconProps} from "./IconWrapper";
import React from'react'
const CloseIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} isLineIcon>
      <path d="M18 6L6 18M6 6L18 18" />
    </IconWrapper>
  );
};

export default CloseIcon;
