import IconWrapper from "../Icon";
import { IconProps } from "../Icon.types";

const ChevronDownIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} isFilledIcon>
      <path d='M 5 9 L 9 13 C 12 16 12 16 15 13 L 18 10 C 20 8 20 8 18 8 L 6 8 C 4 8 4 8 6 10' />
    </IconWrapper>
  );
};

export default ChevronDownIcon;
