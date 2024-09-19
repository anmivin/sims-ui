import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const DoneIcon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M20 6L9 17L4 12" />
    </IconWrapper>
  );
};

export default DoneIcon;
