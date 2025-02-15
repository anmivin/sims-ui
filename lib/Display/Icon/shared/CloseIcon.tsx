import IconWrapper from "../Icon";
import { IconProps } from "../Icon.types";

const CloseIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d='M18 6L6 18M6 6L18 18' />
    </IconWrapper>
  );
};

export default CloseIcon;
