import * as React from "react";
import styled from "@emotion/styled";

export interface RadioProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> {
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
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

const defaultCheckedIcon = <></>;
const defaultIcon = <></>;

const Radio = (props: RadioProps) => {
  const {
    checked,
    checkedIcon = defaultCheckedIcon,
    icon = defaultIcon,
    onChange,
    disabled,
    defaultChecked,
    ...other
  } = props;

  const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    if (onChange) {
      onChange(event, newChecked);
    }
  }, []);

  return (
    <SwitchBaseRoot disabled={disabled} {...other}>
      <SwitchBaseInput
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleInputChange}
        type='radio'
      />
      {checked ? checkedIcon : icon}
    </SwitchBaseRoot>
  );
};

export default Radio;
