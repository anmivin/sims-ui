import clsx from "clsx";
import * as Styles from "./Text.styles";
import * as Types from "./Text.types";
import * as React from "react";

const Text = React.forwardRef<HTMLSpanElement, Types.TextProps>((props) => {
  const { children, type, variant = "modern", noWrap, ...other } = props;

  return (
    <Styles.TextRoot
      {...other}
      as={
        Object.keys(Types.TitleVariant).includes(type)
          ? Types.TitleVariant[type as Types.TitleVariant]
          : "p"
      }
      className={clsx(type, variant, noWrap && "noWrap")}
    >
      {children}
    </Styles.TextRoot>
  );
});

export default Text;
