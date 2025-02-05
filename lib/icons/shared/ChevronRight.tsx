import IconWrapper, { IconProps } from '../IconWrapper';

const ChevronRight = (props: IconProps) => {
  return (
    <IconWrapper {...props} >
      <path d="M9 18L15 12L9 6" />
    </IconWrapper>
  );
};

export default ChevronRight;
