import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const ChevronHorizontalIcon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M9 7L4 12L9 17M15 7L20 12L15 17" />
    </IconWrapper>
  );
};

export default ChevronHorizontalIcon;
