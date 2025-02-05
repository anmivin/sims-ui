import * as React from "react";
import * as Styles from "./Checkbox.styles";
import * as Types from "./Checkbox.types";

import clsx from "clsx";
import CheckBox from "../../icons/Old/CheckBoxUnchecked";
import CheckBoxCross from "../../icons/Old/CheckBoxCross";

const Checkbox = React.forwardRef<HTMLButtonElement, Types.CheckboxProps>((props) => {
  const {
    checkedIcon,
    icon,
    onChange,
    disabled,
    defaultChecked,
    required,
    variant = "modern",
    label,
    size,
    ...other
  } = props;
  const [checked, setCheckedState] = React.useState(defaultChecked);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      onChange(event, newChecked);
    }
  };

  const checkedComponent =
    variant === "modern" ? <Styles.CheckedIcon /> : <CheckBoxCross color='#121B61' />;
  const uncheckedComponent =
    variant === "modern" ? <Styles.UncheckedIcon /> : <CheckBox color='#121B61' />;
  return (
    <Styles.CheckboxRoot
      disabled={disabled}
      className={clsx(disabled && "disabled", variant)}
      {...other}
    >
      <Styles.CheckboxInput
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleInputChange}
        required={required}
        type='checkbox'
      />
      {checked ? checkedComponent : uncheckedComponent}
      {label && <span>{label}</span>}
    </Styles.CheckboxRoot>
  );
});

export default Checkbox;
