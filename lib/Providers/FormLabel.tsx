import * as React from "react";

import styled from "@emotion/styled";

export const FormLabelRoot = styled("label")({
  lineHeight: "1.5em",
  padding: 0,
  position: "relative",

  "-disabled": {
    color: "gray",
    "-error": {
      color: "red",
    },
  },
});

const AsteriskComponent = styled("span")({
  "-error": {
    color: "red",
  },
});

const FormLabel = (props: FormLabelOwnProps) => {
  const { children, disabled, error, focused, required, ...other } = props;

  return (
    <FormLabelRoot as='label' {...other}>
      {children}
      {required && <AsteriskComponent>&thinsp;{"*"}</AsteriskComponent>}
    </FormLabelRoot>
  );
};

export default FormLabel;

export interface FormLabelOwnProps {
  /**
   * The content of the component.
   */
  children?: React.LabelHTMLAttributes<HTMLLabelElement>["children"];
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused?: boolean;
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required?: boolean;
}
