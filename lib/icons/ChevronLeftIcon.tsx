import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const ChevronLeftIcon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M15 18L9 12L15 6" />
    </IconWrapper>
  );
};

export default ChevronLeftIcon;
