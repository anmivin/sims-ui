import IconWrapper from "../Icon";
import { IconProps } from "../Icon.types";

const ChevronUpIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d='M18 15L12 9L6 15' />
    </IconWrapper>
  );
};

export default ChevronUpIcon;
