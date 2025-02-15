import * as Types from "./Icon.types";
import * as Styles from "./Icon.styles";

const Icon = (props: Types.IconProps) => {
  const {
    width = 24,
    height,
    viewBox = "0 0 24 24",
    color,
    children,
    isFilledIcon,
    ...other
  } = props;
  return (
    <Styles.Svg
      {...other}
      width={width}
      height={height ?? width}
      viewBox={viewBox}
      color={color}
      isFilledIcon={isFilledIcon}
    >
      {children}
    </Styles.Svg>
  );
};

export default Icon;
