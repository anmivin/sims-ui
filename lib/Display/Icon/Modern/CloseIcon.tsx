import IconWrapper from "../Icon";
import { IconProps } from "../Icon.types";

const CloseIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path strokeWidth={4} d='M 20 4 L 4 20 M 4 4 L 20 20' />
    </IconWrapper>
  );
};

export default CloseIcon;
