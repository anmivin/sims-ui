import IconWrapper, { IconProps } from "../IconWrapper";
const InfoIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d='M 12 4 C 11 4 10 5 10 6 C 10 7 11 8 12 8 C 13 8 14 7 14 6 C 14 5 13 4 12 4 M 12 9 C 11 9 10 10 10 11 L 10 18 C 10 19 11 20 12 20 C 13 20 14 19 14 18 M 14 18 L 14 11 C 14 10 13 9 12 9' />
    </IconWrapper>
  );
};

export default InfoIcon;
