import clsx from "clsx";
import * as Styles from "./Text.styles";
import * as Types from "./Text.types";
import * as React from "react";

const Text = React.forwardRef<HTMLSpanElement, Types.TextProps>((props) => {
  const { children, variant, noWrap, ...other } = props;

  return (
    <Styles.TextRoot
      {...other}
      as={
        Object.keys(Types.TitleVariant).includes(variant)
          ? Types.TitleVariant[variant as Types.TitleVariant]
          : "p"
      }
      className={clsx(variant, noWrap && "noWrap")}
    >
      {children}
    </Styles.TextRoot>
  );
});

export default Text;
