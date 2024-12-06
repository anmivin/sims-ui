import * as React from "react";

import FormLabel from "./FormLabel";

import styled from "@emotion/styled/";
const InputLabelRoot = styled(FormLabel)({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  "-shrink": {
    transform: "translate(0, -1.5px) scale(0.75)",
    transformOrigin: "top left",
    maxWidth: "133%",
  },
});

const InputLabel = (props, ref) => {
  const {
    disableAnimation = false,
    margin,
    shrink: shrinkProp,
    variant,
    className,
    ...other
  } = props;

  let shrink = shrinkProp;

  return <InputLabelRoot data-shrink={shrink} ref={ref} {...other} />;
};

export default InputLabel;

import { FormLabelOwnProps } from "./FormLabel";

export interface InputLabelOwnProps extends Pick<FormLabelOwnProps, "children"> {
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean;
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean;
}
