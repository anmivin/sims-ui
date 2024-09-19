import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const CloseIcon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M18 6L6 18M6 6L18 18" />
    </IconWrapper>
  );
};

export default CloseIcon;
