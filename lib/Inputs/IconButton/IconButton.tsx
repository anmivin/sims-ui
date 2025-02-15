import * as React from "react";
import * as Styles from "./IconButton.styles";
import * as Types from "./IconButton.types";
import clsx from "clsx";

const IconButton = React.forwardRef<HTMLButtonElement, Types.IconButtonProps>((props) => {
  const { children, disabled = false, size = "medium", variant, ...other } = props;

  return (
    <Styles.IconButton disabled={disabled} className={clsx(variant, size)} {...other}>
      {children}
    </Styles.IconButton>
  );
});

export default IconButton;
