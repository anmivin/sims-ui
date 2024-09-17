import * as React from "react";

import FormControlContext from "../FormControl/FormControlContext";
import useFormControl from "../FormControl/useFormControl";

import styled from "@emotion/styled";

const InputAdornmentRoot = styled("div")({
  display: "flex",
  maxHeight: "2em",
  alignItems: "center",
  whiteSpace: "nowrap",
  color: (theme.vars || theme).palette.action.active,
  "-start": {
    marginRight: 8,
  },
  "-end": {
    marginLeft: 8,
  },
  "-disablePointerEvents": {
    pointerEvents: "none",
  },
});

const InputAdornment = React.forwardRef(function InputAdornment(
  props: InputAdornmentOwnProps,
  ref
) {
  const {
    children,
    disablePointerEvents = false,
    position,
    variant: variantProp,
    ...other
  } = props;

  const muiFormControl = useFormControl() || {};

  let variant = variantProp;

  if (muiFormControl && !variant) {
    variant = muiFormControl.variant;
  }

  const ownerState = {
    ...props,
    hiddenLabel: muiFormControl.hiddenLabel,
    size: muiFormControl.size,
    disablePointerEvents,
    position,
    variant,
  };

  return (
    <FormControlContext.Provider value={null}>
      <InputAdornmentRoot as={"div"} ownerState={ownerState} ref={ref} {...other}>
        <React.Fragment>
          {/* To have the correct vertical alignment baseline */}
          {position === "start" ? <span className='notranslate'>&#8203;</span> : null}
          {children}
        </React.Fragment>
      </InputAdornmentRoot>
    </FormControlContext.Provider>
  );
});

export default InputAdornment;

export interface InputAdornmentOwnProps {
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children?: React.ReactNode;
  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the `input` on click.
   * @default false
   */
  disablePointerEvents?: boolean;

  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: "start" | "end";
  /**
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant?: "standard" | "outlined" | "filled";
}
