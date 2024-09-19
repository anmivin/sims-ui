import * as React from "react";

import isMuiElement from "../utils/isMuiElement";
import styled from "@emotion/styled";

const FormControlRoot = styled("div")({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top", // Fix alignment issue on Safari.
  variants: [
    {
      props: { margin: "normal" },
      style: {
        marginTop: 16,
        marginBottom: 8,
      },
    },
    {
      props: { margin: "dense" },
      style: {
        marginTop: 8,
        marginBottom: 4,
      },
    },
    {
      props: { fullWidth: true },
      style: {
        width: "100%",
      },
    },
  ],
});

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * You can find one composition example below and more going to [the demos](/material-ui/react-text-field/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it creates visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 */
const FormControl = (props) => {
  const {
    children,
    disabled = false,
    error = false,
    fullWidth = false,
    hiddenLabel = false,
    margin = "none",
    required = false,
    ...other
  } = props;



  const [adornedStart, setAdornedStart] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }

        const input = isMuiElement(child, ["Select"]) ? child.props.input : child;

        if (input) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });

  const [filled, setFilled] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialFilled = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }

        if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  });

  const [focusedState, setFocused] = React.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }

  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;

  let registerEffect;


  const childContext = React.useMemo(() => {
    return {
      adornedStart,
      setAdornedStart,
      color,
      disabled,
      error,
      filled,
      focused,
      fullWidth,
      hiddenLabel,
      size,
      onBlur: () => {
        setFocused(false);
      },
      onEmpty: () => {
        setFilled(false);
      },
      onFilled: () => {
        setFilled(true);
      },
      onFocus: () => {
        setFocused(true);
      },
      registerEffect,
      required,
      variant,
    };
  }, [
    adornedStart,
    color,
    disabled,
    error,
    filled,
    focused,
    fullWidth,
    hiddenLabel,
    registerEffect,
    required,
    size,
    variant,
  ]);

  return (
    <FormControlContext.Provider value={childContext}>
      <FormControlRoot
        as={component}
        ownerState={ownerState}
        ref={ref}
        {...other}
      >
        {children}
      </FormControlRoot>
    </FormControlContext.Provider>
  );
};

export default FormControl;

export interface FormControlProps {
  /**
   * The content of the component.
   */
  children?: React.HTMLAttributes<HTMLDivElement>["children"];
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required?: boolean;
}

type ContextFromPropsKey =
  | "color"
  | "disabled"
  | "error"
  | "fullWidth"
  | "hiddenLabel"
  | "margin"
  | "onBlur"
  | "onFocus"
  | "required"
  | "size"
  | "variant";

export interface FormControlState extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  filled: boolean;
  focused: boolean;
  onEmpty: () => void;
  onFilled: () => void;
  registerEffect: () => void;
  setAdornedStart: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @ignore - internal component.
 */
export const FormControlContext = React.createContext<FormControlState | undefined>(undefined);

export function formControlState({ props, states, muiFormControl }) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];

    if (muiFormControl) {
      if (typeof props[state] === "undefined") {
        acc[state] = muiFormControl[state];
      }
    }

    return acc;
  }, {});
}

export function useFormControl(): FormControlState | undefined {
  return React.useContext(FormControlContext);
}
