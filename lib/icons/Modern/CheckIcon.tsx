import IconWrapper, { IconProps } from "../IconWrapper";

const CheckIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path strokeWidth='3px' d='M 2 12 L 9 22 L 22 2' />
    </IconWrapper>
  );
};

export default CheckIcon;
