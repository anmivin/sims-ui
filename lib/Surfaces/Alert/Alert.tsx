import * as React from "react";
import AlertOld from "./Old";
import AlertModern from "./Modern";

import * as Types from "./Alert.types";

const Alert = (props: Types.AlertProps) => {
  const { children, className, onClose, level = "success", variant = "modern", ...other } = props;

  const Component = variant === "modern" ? AlertModern : AlertOld;
  return (
    <Component {...other} level={level}>
      {children}
      {/*  <AlertMessage>{children}</AlertMessage>
      {onClose ? (
        <AlertAction>
          <IconButton size='small' color='inherit' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </AlertAction>
      ) : null} */}
    </Component>
  );
};

export default Alert;
