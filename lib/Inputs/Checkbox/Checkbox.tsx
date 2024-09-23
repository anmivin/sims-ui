import * as React from "react";

import styled from "@emotion/styled";

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> {
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  required?: boolean;
  checked?: boolean;
  checkedIcon?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const SwitchBaseRoot = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "-disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
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

const Checkbox = (props: CheckboxProps) => {
  const { checkedIcon, icon, onChange, disabled, defaultChecked, required, ...other } = props;
  const [checked, setCheckedState] = React.useState(defaultChecked);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      onChange(event, newChecked);
    }
  };

  return (
    <SwitchBaseRoot disabled={disabled} {...other}>
      <SwitchBaseInput
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleInputChange}
        required={required}
        type='checkbox'
      />
      {checked ? checkedIcon : icon}
    </SwitchBaseRoot>
  );
};

export default Checkbox;
