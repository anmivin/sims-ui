import IconWrapper, { IconProps } from '../IconWrapper';

const ChevronVerticalIcon = (props: IconProps) => {
  return (
    <IconWrapper {...props} >
      <path d="M7 15L12 20L17 15M7 9L12 4L17 9" />
    </IconWrapper>
  );
};

export default ChevronVerticalIcon;
