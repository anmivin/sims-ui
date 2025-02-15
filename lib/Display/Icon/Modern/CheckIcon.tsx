import IconWrapper from "../Icon";
import { IconProps } from "../Icon.types";

const CheckIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path strokeWidth={4} d='M 2 12 L 9 22 L 22 2' />
    </IconWrapper>
  );
};

export default CheckIcon;
