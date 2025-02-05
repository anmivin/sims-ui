import * as React from "react";
import * as Styles from "./Button.styles";
import * as Types from "./Button.types";

import clsx from "clsx";

const Button = React.forwardRef<HTMLButtonElement, Types.ButtonProps>((props, ref) => {
  const {
    children,
    disabled = false,
    endIcon: endIconProp,
    fullWidth = false,
    startIcon: startIconProp,
    variant = "modern",
    size = "m",
    ...other
  } = props;

  const startIcon = startIconProp && (
    <Styles.ButtonStartIcon>{startIconProp}</Styles.ButtonStartIcon>
  );

  const endIcon = endIconProp && <Styles.ButtonEndIcon>{endIconProp}</Styles.ButtonEndIcon>;

  return (
    <Styles.ButtonRoot
      ref={ref}
      disabled={disabled}
      className={clsx(fullWidth && "fullwidth", disabled && "disabled", variant, size)}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
    </Styles.ButtonRoot>
  );
});

export default Button;
