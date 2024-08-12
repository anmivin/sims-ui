import styled from "@emotion/styled";
import React from "react";
const SwitchBaseRoot = styled.button({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent", // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0, // Remove the margin in Safari
  padding: 0, // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none", // Reset
  WebkitAppearance: "none", // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none", // Remove Firefox dotted outline.
  },
  [`&.${buttonBaseClasses.disabled}`]: {
    pointerEvents: "none", // Disable link interactions
    cursor: "default",
  },
  borderRadius: "50%",
  variants: [
    {
      props: {
        edge: "start",
        size: "small",
      },
      style: {
        marginLeft: -3,
      },
    },
    {
      props: ({ edge, ownerState }) => edge === "start" && ownerState.size !== "small",
      style: {
        marginLeft: -12,
      },
    },
    {
      props: {
        edge: "end",
        size: "small",
      },
      style: {
        marginRight: -3,
      },
    },
    {
      props: ({ edge, ownerState }) => edge === "end" && ownerState.size !== "small",
      style: {
        marginRight: -12,
      },
    },
  ],
});

const SwitchBaseInput = styled("input")({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1,
});

const SwitchBase = React.forwardRef(function SwitchBase(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required = false,
    tabIndex,
    type,
    value,
    ...other
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "SwitchBase",
    state: "checked",
  });

  const muiFormControl = useFormControl();

  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  const handleInputChange = (event) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    const newChecked = event.target.checked;

    setCheckedState(newChecked);

    if (onChange) {
      // TODO v6: remove the second argument.
      onChange(event, newChecked);
    }
  };

  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }

  const hasLabelFor = type === "checkbox" || type === "radio";

  const ownerState = {
    ...props,
    checked,
    disabled,
    disableFocusRipple,
    edge,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SwitchBaseRoot
      component='span'
      className={clsx(classes.root, className)}
      centerRipple
      focusRipple={!disableFocusRipple}
      disabled={disabled}
      tabIndex={null}
      role={undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      <SwitchBaseInput
        autoFocus={autoFocus}
        checked={checkedProp}
        defaultChecked={defaultChecked}
        className={classes.input}
        disabled={disabled}
        id={hasLabelFor ? id : undefined}
        name={name}
        onChange={handleInputChange}
        readOnly={readOnly}
        ref={inputRef}
        required={required}
        ownerState={ownerState}
        tabIndex={tabIndex}
        type={type}
        {...(type === "checkbox" && value === undefined ? {} : { value })}
        {...inputProps}
      />
      {checked ? checkedIcon : icon}
    </SwitchBaseRoot>
  );
});

const CheckboxRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.indeterminate && styles.indeterminate,
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.color !== "default" && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: { color: "default", disableRipple: false },
      style: {
        "&:hover": {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
            : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
        },
      },
    },
    ...Object.entries(theme.palette)
      .filter(([, palette]) => palette && palette.main)
      .map(([color]) => ({
        props: { color, disableRipple: false },
        style: {
          "&:hover": {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
          },
        },
      })),
    ...Object.entries(theme.palette)
      .filter(([, palette]) => palette && palette.main)
      .map(([color]) => ({
        props: { color },
        style: {
          [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
            color: (theme.vars || theme).palette[color].main,
          },
          [`&.${checkboxClasses.disabled}`]: {
            color: (theme.vars || theme).palette.action.disabled,
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
}));
