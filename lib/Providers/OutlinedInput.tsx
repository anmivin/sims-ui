"use client";
import * as React from "react";
import PropTypes from "prop-types";
import refType from "@mui/utils/refType";
import composeClasses from "@mui/utils/composeClasses";
import NotchedOutline from "./NotchedOutline";
import useFormControl from "../mui/mui-material/src/FormControl/useFormControl";
import formControlState from "../mui/mui-material/src/FormControl/formControlState";
import rootShouldForwardProp from "../mui/mui-material/src/styles/rootShouldForwardProp";
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";
import createSimplePaletteValueFilter from "../utils/createSimplePaletteValueFilter";
import { useDefaultProps } from "../DefaultPropsProvider";
import outlinedInputClasses, { getOutlinedInputUtilityClass } from "./outlinedInputClasses";
import InputBase, {
  rootOverridesResolver as inputBaseRootOverridesResolver,
  inputOverridesResolver as inputBaseInputOverridesResolver,
  InputBaseRoot,
  InputBaseInput,
} from "../InputBase/InputBase";

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"],
  };

  const composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);

  return {
    ...classes, // forward classes to the InputBase
    ...composedClasses,
  };
};

const OutlinedInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: inputBaseRootOverridesResolver,
})(
  memoTheme(({ theme }) => {
    const borderColor =
      theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
    return {
      position: "relative",
      borderRadius: (theme.vars || theme).shape.borderRadius,
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: (theme.vars || theme).palette.text.primary,
      },
      [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderWidth: 2,
      },
      variants: [
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color },
            style: {
              [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: (theme.vars || theme).palette[color].main,
              },
            },
          })),
        {
          props: {}, // to overide the above style
          style: {
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: theme.vars
                  ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
                  : borderColor,
              },
            },
            [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: (theme.vars || theme).palette.error.main,
            },
            [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: (theme.vars || theme).palette.action.disabled,
            },
          },
        },
        {
          props: ({ ownerState }) => ownerState.startAdornment,
          style: {
            paddingLeft: 14,
          },
        },
        {
          props: ({ ownerState }) => ownerState.endAdornment,
          style: {
            paddingRight: 14,
          },
        },
        {
          props: ({ ownerState }) => ownerState.multiline,
          style: {
            padding: "16.5px 14px",
          },
        },
        {
          props: ({ ownerState, size }) => ownerState.multiline && size === "small",
          style: {
            padding: "8.5px 14px",
          },
        },
      ],
    };
  })
);

const NotchedOutlineRoot = styled(NotchedOutline, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline",
  overridesResolver: (props, styles) => styles.notchedOutline,
})(
  memoTheme(({ theme }) => {
    const borderColor =
      theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
    return {
      borderColor: theme.vars
        ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
        : borderColor,
    };
  })
);

const OutlinedInputInput = styled(InputBaseInput, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: inputBaseInputOverridesResolver,
})(
  memoTheme(({ theme }) => ({
    padding: "16.5px 14px",
    ...(!theme.vars && {
      "&:-webkit-autofill": {
        WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
        WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
        caretColor: theme.palette.mode === "light" ? null : "#fff",
        borderRadius: "inherit",
      },
    }),
    ...(theme.vars && {
      "&:-webkit-autofill": {
        borderRadius: "inherit",
      },
      [theme.getColorSchemeSelector("dark")]: {
        "&:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 100px #266798 inset",
          WebkitTextFillColor: "#fff",
          caretColor: "#fff",
        },
      },
    }),
    variants: [
      {
        props: {
          size: "small",
        },
        style: {
          padding: "8.5px 14px",
        },
      },
      {
        props: ({ ownerState }) => ownerState.multiline,
        style: {
          padding: 0,
        },
      },
      {
        props: ({ ownerState }) => ownerState.startAdornment,
        style: {
          paddingLeft: 0,
        },
      },
      {
        props: ({ ownerState }) => ownerState.endAdornment,
        style: {
          paddingRight: 0,
        },
      },
    ],
  }))
);

const OutlinedInput = React.forwardRef(function OutlinedInput(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiOutlinedInput" });
  const {
    components = {},
    fullWidth = false,
    inputComponent = "input",
    label,
    multiline = false,
    notched,
    slots = {},
    type = "text",
    ...other
  } = props;

  const classes = useUtilityClasses(props);

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"],
  });

  const ownerState = {
    ...props,
    color: fcs.color || "primary",
    disabled: fcs.disabled,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    type,
  };

  const RootSlot = slots.root ?? components.Root ?? OutlinedInputRoot;
  const InputSlot = slots.input ?? components.Input ?? OutlinedInputInput;

  return (
    <InputBase
      slots={{ root: RootSlot, input: InputSlot }}
      renderSuffix={(state) => (
        <NotchedOutlineRoot
          ownerState={ownerState}
          className={classes.notchedOutline}
          label={
            label != null && label !== "" && fcs.required ? (
              <React.Fragment>
                {label}
                &thinsp;{"*"}
              </React.Fragment>
            ) : (
              label
            )
          }
          notched={
            typeof notched !== "undefined"
              ? notched
              : Boolean(state.startAdornment || state.filled || state.focused)
          }
        />
      )}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
      classes={{
        ...classes,
        notchedOutline: null,
      }}
    />
  );
});

export default OutlinedInput;

import * as React from "react";
import { SxProps } from "@mui/system";
import { InternalStandardProps as StandardProps, Theme } from "..";
import { InputBaseProps } from "../InputBase";
import { OutlinedInputClasses } from "./outlinedInputClasses";

export interface OutlinedInputProps extends StandardProps<InputBaseProps> {
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label?: React.ReactNode;
}

("use client");
import * as React from "react";
import PropTypes from "prop-types";
import rootShouldForwardProp from "../mui/mui-material/src/styles/rootShouldForwardProp";
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";

const NotchedOutlineRoot = styled("fieldset", { shouldForwardProp: rootShouldForwardProp })({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%",
});

const NotchedOutlineLegend = styled("legend", { shouldForwardProp: rootShouldForwardProp })(
  memoTheme(({ theme }) => ({
    float: "unset", // Fix conflict with bootstrap
    width: "auto", // Fix conflict with bootstrap
    overflow: "hidden", // Fix Horizontal scroll when label too long
    variants: [
      {
        props: ({ ownerState }) => !ownerState.withLabel,
        style: {
          padding: 0,
          lineHeight: "11px", // sync with `height` in `legend` styles
          transition: theme.transitions.create("width", {
            duration: 150,
            easing: theme.transitions.easing.easeOut,
          }),
        },
      },
      {
        props: ({ ownerState }) => ownerState.withLabel,
        style: {
          display: "block", // Fix conflict with normalize.css and sanitize.css
          padding: 0,
          height: 11, // sync with `lineHeight` in `legend` styles
          fontSize: "0.75em",
          visibility: "hidden",
          maxWidth: 0.01,
          transition: theme.transitions.create("max-width", {
            duration: 50,
            easing: theme.transitions.easing.easeOut,
          }),
          whiteSpace: "nowrap",
          "& > span": {
            paddingLeft: 5,
            paddingRight: 5,
            display: "inline-block",
            opacity: 0,
            visibility: "visible",
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.withLabel && ownerState.notched,
        style: {
          maxWidth: "100%",
          transition: theme.transitions.create("max-width", {
            duration: 100,
            easing: theme.transitions.easing.easeOut,
            delay: 50,
          }),
        },
      },
    ],
  }))
);

/**
 * @ignore - internal component.
 */
export default function NotchedOutline(props) {
  const { children, classes, className, label, notched, ...other } = props;
  const withLabel = label != null && label !== "";
  const ownerState = {
    ...props,
    notched,
    withLabel,
  };
  return (
    <NotchedOutlineRoot aria-hidden className={className} ownerState={ownerState} {...other}>
      <NotchedOutlineLegend ownerState={ownerState}>
        {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
        {withLabel ? (
          <span>{label}</span>
        ) : (
          // notranslate needed while Google Translate will not fix zero-width space issue
          <span className='notranslate'>&#8203;</span>
        )}
      </NotchedOutlineLegend>
    </NotchedOutlineRoot>
  );
}

NotchedOutline.propTypes /* remove-proptypes */ = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.node,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

import * as React from "react";
import { InternalStandardProps as StandardProps } from "..";

export interface NotchedOutlineProps
  extends StandardProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>> {
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  label?: React.ReactNode;
  notched: boolean;
}

export type NotchedOutlineClassKey = keyof NonNullable<NotchedOutlineProps["classes"]>;

declare const NotchedOutline: React.JSXElementConstructor<NotchedOutlineProps>;

export default NotchedOutline;
