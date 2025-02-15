import IconWrapper from "../Icon";
import { IconProps } from "../Icon.types";

const DoneIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d='M20 6L9 17L4 12' />
    </IconWrapper>
  );
};

export default DoneIcon;
