import IconWrapper, { IconWrapperProps } from '@ui/IconWrapper';

const EraserIcon = (props: IconWrapperProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M 8.5355 8.6777 L 15.6066 15.7487 L 19.8492 11.5061 C 21.2635 10.0919 21.2635 8.6777 19.8492 7.2635 L 17.0208 4.435 C 15.6066 3.0208 14.1924 3.0208 12.7782 4.435 L 4.2929 12.9203 C 2.8787 14.3345 2.8787 15.7487 4.2929 17.163 L 7.1213 19.9914 C 8.5355 21.4056 9.9497 21.4056 11.364 19.9914 L 15.6066 15.7487 M 10 20.92 L 19 20.92" />
    </IconWrapper>
  );
};

export default EraserIcon;
