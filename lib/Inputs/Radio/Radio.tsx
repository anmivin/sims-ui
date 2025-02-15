import * as React from "react";
import * as Styles from "./Radio.styles";
import * as Types from "./Radio.types";

import DefaultButton from "../../Internal/DefaultButton";
import DefaultInput from "../../Internal/DefaultInput";
import ModernRadioCheckIcon from "./ModernRadioCheck";
import ModernRadioUncheckedIcon from "./ModernRadioUnchecked";
import OldRadioCheck from "./OldRadioCheck";
import OldRadioUnchecked from "./OldRadioUnchecked";
import clsx from "clsx";

const Radio = <T,>(props: Types.RadioGroupProps<T>) => {
  const {
    defaultValue,
    row,
    options,
    onChange,
    variant = "modern",
    getOptionDisabled,
    ...other
  } = props;

  const [value, setValueState] = React.useState(defaultValue);

  const uncheckedIconComponent =
    variant === "modern" ? <ModernRadioUncheckedIcon /> : <OldRadioUnchecked />;
  const checkedIconComponent = variant === "modern" ? <ModernRadioCheckIcon /> : <OldRadioCheck />;

  return (
    <Styles.RadioGroupRoot {...other} className={clsx(row && "row")}>
      {options.map((option, index) => (
        <Styles.RadioGroupItem key={index}>
          <DefaultButton disabled={option.disabled}>
            <DefaultInput
              checked={value === option.value}
              disabled={option.disabled}
              onChange={(e) => {
                const newChecked = e.target.checked;
                if (newChecked) setValueState(option.value);
              }}
              type='radio'
            />
            {value === option.value ? checkedIconComponent : uncheckedIconComponent}
          </DefaultButton>
          <Styles.RadioLable className={clsx(option.disabled && "disabled")}>
            {option.label}
          </Styles.RadioLable>
        </Styles.RadioGroupItem>
      ))}
    </Styles.RadioGroupRoot>
  );
};

export default Radio;
