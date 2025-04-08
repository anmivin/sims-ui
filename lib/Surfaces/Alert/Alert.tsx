import AlertOld from "./Old";
import AlertModern from "./Modern";

import * as Types from "./Alert.types";

const Alert = (props: Types.AlertProps) => {
  const { children, className, onClose, level = "success", variant = "modern", ...other } = props;

  const Component = variant === "modern" ? AlertModern : AlertOld;
  return (
    <Component {...other} level={level}>
      {children}
    </Component>
  );
};

export default Alert;
