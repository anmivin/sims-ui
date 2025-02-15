import IconWrapper from "../Icon";
import { IconProps } from "../Icon.types";

const UploadIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d='M21 21H3M18 11L12 17M12 17L6 11M12 17V3' />
    </IconWrapper>
  );
};

export default UploadIcon;
