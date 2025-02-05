import IconWrapper, { IconProps } from '../IconWrapper';

const ChevronHorizontalIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} >
      <path d="M9 7L4 12L9 17M15 7L20 12L15 17" />
    </IconWrapper>
  );
};

export default ChevronHorizontalIcon;
