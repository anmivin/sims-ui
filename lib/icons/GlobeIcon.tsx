import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const GlobeIcon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22M2.50002 9H21.5M2.5 15H21.5" />
    </IconWrapper>
  );
};

export default GlobeIcon;
