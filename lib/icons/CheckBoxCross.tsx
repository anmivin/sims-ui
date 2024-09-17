import IconWrapper, {IconProps} from "./IconWrapper";
const CheckBoxCross = (props: IconProps) => {
  return (
    <IconWrapper {...props} isLineIcon>
      <path strokeWidth='3px' d="M 4 8 C 4 5 5 4 8 4 L 16 4 C 19 4 20 5 20 8 L 20 16 C 20 19 19 20 16 20 L 8 20 C 5 20 4 19 4 16 L 4 8 M 8 8 L 16 16 M 16 8 L 8 16" />
    </IconWrapper>
  );
};

export default CheckBoxCross;
