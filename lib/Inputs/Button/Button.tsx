import * as React from "react";
import * as Styles from "./Button.styles";
import * as Types from "./Button.types";

import clsx from "clsx";

const Button = React.forwardRef<HTMLButtonElement, Types.ButtonProps>((props, ref) => {
  const {
    children,
    disabled = false,
    endIcon,
    fullWidth = false,
    startIcon,
    variant = "modern",
    size = "medium",
    ...other
  } = props;

  return (
    <Styles.ButtonRoot
      ref={ref}
      disabled={disabled}
      className={clsx(fullWidth && "fullwidth", disabled && "disabled", variant, size)}
      {...other}
    >
      {startIcon && <Styles.ButtonStartIcon>{startIcon}</Styles.ButtonStartIcon>}
      {children}
      {endIcon && <Styles.ButtonEndIcon>{endIcon}</Styles.ButtonEndIcon>}
    </Styles.ButtonRoot>
  );
});

export default Button;
