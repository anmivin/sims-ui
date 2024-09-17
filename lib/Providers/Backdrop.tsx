import * as React from "react";

import styled from "@emotion/styled/";

const BackdropRoot = styled("div")({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
});

const Backdrop = (props: BackdropOwnProps) => {
  const { children } = props;

  return (
    <BackdropRoot {...props} >
      {children}
    </BackdropRoot>
  );
};

export default Backdrop;

export interface BackdropOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible?: boolean;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
}
