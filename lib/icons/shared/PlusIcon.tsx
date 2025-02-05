import IconWrapper, { IconProps } from '../IconWrapper';

const PlusIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M 12 4 L 12 20 M 4 12 L 20 12" />
    </IconWrapper>
  );
};

export default PlusIcon;
