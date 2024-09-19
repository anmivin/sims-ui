import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const ChevronDownIcon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M6 9L12 15L18 9" />
    </IconWrapper>
  );
};

export default ChevronDownIcon;
