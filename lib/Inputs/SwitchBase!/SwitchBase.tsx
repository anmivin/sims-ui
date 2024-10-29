import styled from "@emotion/styled";
import React, { ReactNode, useState } from "react";
const SwitchBaseRoot = styled.button({
  display: "flex",
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
  '& disabled': {
    pointerEvents: "none", // Disable link interactions
    cursor: "default",
  },
  borderRadius: "50%",
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

interface SwitchBaseProps{
  autoFocus: boolean,
  checked: boolean,
  checkedIcon: ReactNode,
  defaultChecked: boolean,
  disabled: boolean,
   icon: ReactNode,
  id: string,
  inputProps: object,
  name: string,
  onBlur: () => void,
  onChange: () => void,
   onFocus: () => void,
  required: boolean,
  sx: object,
   type: string,
  value: string | number | readonly string[] | undefined,
};

const SwitchBase = React.forwardRef(function SwitchBase(props:SwitchBaseProps, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    defaultChecked,
    disabled: disabledProp,
    icon,
    id,
    inputProps,
    name,
    onBlur,
    onChange,
    onFocus,
    required = false,
      type,
    value,
    ...other
  } = props;
  const [checked, setCheckedState] = useState({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "SwitchBase",
    state: "checked",
  });

 
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(/* event */);
    }

  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(/* event */);
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
      onChange(/* event */);
    }
  };

  const disabled = disabledProp;

 

  const hasLabelFor = type === "checkbox" || type === "radio";


  return (
    <SwitchBaseRoot
         disabled={disabled}
      role={undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
       {...other}
    >
      <SwitchBaseInput
        autoFocus={autoFocus}
        checked={checkedProp}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={hasLabelFor ? id : undefined}
        name={name}
        onChange={handleInputChange}
        required={required}
        type={type}
        {...(type === "checkbox" && value === undefined ? {} : { value })}
        {...inputProps}
      />
      {checked ? checkedIcon : icon}
    </SwitchBaseRoot>
  );
});


export default SwitchBase
