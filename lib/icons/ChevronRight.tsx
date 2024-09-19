import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const ChevronRight = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M9 18L15 12L9 6" />
    </IconWrapper>
  );
};

export default ChevronRight;
