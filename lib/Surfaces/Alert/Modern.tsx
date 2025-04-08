import IconButton from "../../Inputs/IconButton/IconButton";
import CloseIcon from "../../Display/Icon/Modern/CloseIcon";

import * as Styles from "./Alert.styles";
import * as Types from "./Alert.types";

import clsx from "clsx";
const AlertModern = (props: Types.AlertProps) => {
  const { children, level, ...other } = props;
  return (
    <Styles.ModernAlert className={clsx(level)} {...other}>
      <Styles.ModernAlertHeader>
        <IconButton variant='modern' size='small'>
          <CloseIcon color='#9f1a1f' width={18} />
        </IconButton>
      </Styles.ModernAlertHeader>
      <Styles.ModernAlertContent>{children}</Styles.ModernAlertContent>
    </Styles.ModernAlert>
  );
};

export default AlertModern;
