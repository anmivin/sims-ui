"use client";
import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import refType from "@mui/utils/refType";
import composeClasses from "@mui/utils/composeClasses";
import { alpha } from "@mui/system/colorManipulator";
import SwitchBase from "../internal/SwitchBase";
import RadioButtonIcon from "./RadioButtonIcon";
import capitalize from "../utils/capitalize";
import createChainedFunction from "../utils/createChainedFunction";
import useFormControl from "../FormControl/useFormControl";
import useRadioGroup from "../RadioGroup/useRadioGroup";
import radioClasses, { getRadioUtilityClass } from "./radioClasses";
import rootShouldForwardProp from "../styles/rootShouldForwardProp";
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";
import createSimplePaletteValueFilter from "../utils/createSimplePaletteValueFilter";

import { useDefaultProps } from "../DefaultPropsProvider";

const useUtilityClasses = (ownerState) => {
  const { classes, color, size } = ownerState;

  const slots = {
    root: ["root", `color${capitalize(color)}`, size !== "medium" && `size${capitalize(size)}`],
  };

  return {
    ...classes,
    ...composeClasses(slots, getRadioUtilityClass, classes),
  };
};

const RadioRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiRadio",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.size !== "medium" && styles[`size${capitalize(ownerState.size)}`],
      styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    [`&.${radioClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
    },
    variants: [
      {
        props: { color: "default", disabled: false, disableRipple: false },
        style: {
          "&:hover": {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color, disabled: false, disableRipple: false },
          style: {
            "&:hover": {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
            },
          },
        })),
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color, disabled: false },
          style: {
            [`&.${radioClasses.checked}`]: {
              color: (theme.vars || theme).palette[color].main,
            },
          },
        })),
      {
        // Should be last to override other colors
        props: { disableRipple: false },
        style: {
          // Reset on touch devices, it doesn't add specificity
          "&:hover": {
            "@media (hover: none)": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    ],
  }))
);

function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

const defaultCheckedIcon = <RadioButtonIcon checked />;
const defaultIcon = <RadioButtonIcon />;

const Radio = React.forwardRef(function Radio(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiRadio" });
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = "primary",
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = "medium",
    className,
    disabled: disabledProp,
    disableRipple = false,
    ...other
  } = props;

  const muiFormControl = useFormControl();

  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }

  disabled ??= false;

  const ownerState = {
    ...props,
    disabled,
    disableRipple,
    color,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const radioGroup = useRadioGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === "undefined") {
      checked = areEqualValues(radioGroup.value, props.value);
    }
    if (typeof name === "undefined") {
      name = radioGroup.name;
    }
  }

  return (
    <RadioRoot
      type='radio'
      icon={React.cloneElement(icon, { fontSize: defaultIcon.props.fontSize ?? size })}
      checkedIcon={React.cloneElement(checkedIcon, {
        fontSize: defaultCheckedIcon.props.fontSize ?? size,
      })}
      disabled={disabled}
      ownerState={ownerState}
      classes={classes}
      name={name}
      checked={checked}
      onChange={onChange}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
});

Radio.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["medium", "small"]),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
};

export default Radio;

("use client");
import * as React from "react";
import PropTypes from "prop-types";
import RadioButtonUncheckedIcon from "../internal/svg-icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "../internal/svg-icons/RadioButtonChecked";
import rootShouldForwardProp from "../styles/rootShouldForwardProp";
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";

const RadioButtonIconRoot = styled("span", { shouldForwardProp: rootShouldForwardProp })({
  position: "relative",
  display: "flex",
});

const RadioButtonIconBackground = styled(RadioButtonUncheckedIcon)({
  // Scale applied to prevent dot misalignment in Safari
  transform: "scale(1)",
});

const RadioButtonIconDot = styled(RadioButtonCheckedIcon)(
  memoTheme(({ theme }) => ({
    left: 0,
    position: "absolute",
    transform: "scale(0)",
    transition: theme.transitions.create("transform", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: { checked: true },
        style: {
          transform: "scale(1)",
          transition: theme.transitions.create("transform", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shortest,
          }),
        },
      },
    ],
  }))
);

/**
 * @ignore - internal component.
 */
function RadioButtonIcon(props) {
  const { checked = false, classes = {}, fontSize } = props;

  const ownerState = { ...props, checked };

  return (
    <RadioButtonIconRoot className={classes.root} ownerState={ownerState}>
      <RadioButtonIconBackground
        fontSize={fontSize}
        className={classes.background}
        ownerState={ownerState}
      />
      <RadioButtonIconDot fontSize={fontSize} className={classes.dot} ownerState={ownerState} />
    </RadioButtonIconRoot>
  );
}

RadioButtonIcon.propTypes /* remove-proptypes */ = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: PropTypes.oneOf(["small", "medium"]),
};

export default RadioButtonIcon;

import * as React from "react";
import { SxProps } from "@mui/system";
import { OverridableStringUnion } from "@mui/types";
import { InternalStandardProps as StandardProps, Theme } from "..";
import { SwitchBaseProps } from "../internal/SwitchBase";
import { RadioClasses } from "./radioClasses";

export interface RadioPropsSizeOverrides {}

export interface RadioPropsColorOverrides {}

export interface RadioProps
  extends StandardProps<SwitchBaseProps, "checkedIcon" | "color" | "icon" | "type"> {
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<RadioClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default",
    RadioPropsColorOverrides
  >;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon?: React.ReactNode;
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<"small" | "medium", RadioPropsSizeOverrides>;
}

/**
 *
 * Demos:
 *
 * - [Radio Group](https://mui.com/material-ui/react-radio-button/)
 *
 * API:
 *
 * - [Radio API](https://mui.com/material-ui/api/radio/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
export default function Radio(props: RadioProps): React.JSX.Element;
