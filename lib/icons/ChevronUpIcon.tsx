import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const ChevronUpIcon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M18 15L12 9L6 15" />
    </IconWrapper>
  );
};

export default ChevronUpIcon;
