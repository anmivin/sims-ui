import * as React from "react";

import styled from "@emotion/styled";
import ButtonBase from "../../Internal/ButtonBase";

const IconButtonRoot = styled(ButtonBase)({
  textAlign: "center",
  flex: "0 0 auto",
  padding: 8,
  borderRadius: "50%",
  transition: "",

  "-disabled": {
    backgroundColor: "transparent",
    color: "gray",
  },
});

const IconButton = (props: IconButtonOwnProps) => {
  const { children, disabled = false } = props;

  return <IconButtonRoot disabled={disabled}>{children}</IconButtonRoot>;
};

export default IconButton;

export interface IconButtonOwnProps {
  /**
   * The icon to display.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
}
