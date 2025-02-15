import * as React from "react";
import * as Styles from "./Checkbox.styles";
import * as Types from "./Checkbox.types";

import clsx from "clsx";
import OldUnchecked from "./OldUnchecked";
import OldChecked from "./OldChecked";
import ModernChecked from "./ModernChecked";
import ModernUnchecked from "./ModernUnchecked";
import DefaultButton from "../../Internal/DefaultButton";
import DefaultInput from "../../Internal/DefaultInput";

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

  const checkedComponent = variant === "modern" ? <ModernChecked /> : <OldChecked />;
  const uncheckedComponent = variant === "modern" ? <ModernUnchecked /> : <OldUnchecked />;
  return (
    <DefaultButton disabled={disabled} className={clsx(disabled && "disabled")} {...other}>
      <DefaultInput
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleInputChange}
        required={required}
        type='checkbox'
      />
      {checked ? checkedComponent : uncheckedComponent}
      {label && <Styles.StyledLabel>{label}</Styles.StyledLabel>}
    </DefaultButton>
  );
});

export default Checkbox;
