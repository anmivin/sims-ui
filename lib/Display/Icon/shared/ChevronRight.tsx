import IconWrapper from "../Icon";
import { IconProps } from "../Icon.types";

const ChevronRight = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d='M9 18L15 12L9 6' />
    </IconWrapper>
  );
};

export default ChevronRight;
