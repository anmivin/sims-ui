import IconWrapper, { IconProps } from '../IconWrapper';

const ChevronLeftIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} >
      <path d="M15 18L9 12L15 6" />
    </IconWrapper>
  );
};

export default ChevronLeftIcon;
