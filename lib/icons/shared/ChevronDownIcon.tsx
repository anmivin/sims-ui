import IconWrapper, { IconProps } from "./IconWrapper";

const ChevronDownIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d='M6 9L12 15L18 9' />
    </IconWrapper>
  );
};

export default ChevronDownIcon;
