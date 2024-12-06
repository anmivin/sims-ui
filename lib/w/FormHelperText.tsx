import * as React from "react";

import styled from "@emotion/styled";

const FormHelperTextRoot = styled("p")({
  color: "",
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  "-disabled": {
    color: "",
  },
  "-error": {
    color: "",
  },
});

const FormHelperText = (props: FormHelperTextOwnProps) => {
  const { children, disabled, error, required, ...other } = props;

  return (
    <FormHelperTextRoot {...other}>
      {children === " " ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        <span className='notranslate'>&#8203;</span>
      ) : (
        children
      )}
    </FormHelperTextRoot>
  );
};

export default FormHelperText;

export interface FormHelperTextOwnProps {
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error?: boolean;

  /**
   * If `true`, the helper text should use required classes key.
   */
  required?: boolean;
}
