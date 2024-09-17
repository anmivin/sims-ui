import * as React from "react";

import createChainedFunction from "../utils/createChainedFunction";
import useFormControl from "../FormControl/useFormControl";
import useRadioGroup from "../RadioGroup/useRadioGroup";

import styled from "@emotion/styled";


import SwitchBase,{ SwitchBaseProps } from "../Internal/SwitchBase";

export interface RadioProps
  extends Omit<SwitchBaseProps, "checkedIcon" | "color" | "icon" | "type"> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
}



const RadioRoot = styled(SwitchBase)({
    color: '',
    '-disabled': {
      color: '',
    },
    '-checked': {
      color: '',
    },

  });

function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

const defaultCheckedIcon = <></>;
const defaultIcon = <></>;

const Radio = (props:RadioProps) => {
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    disabled: disabledProp,
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
      icon={icon}
      checkedIcon={checkedIcon}
      disabled={disabled}
      name={name}
      checked={checked}
      onChange={onChange}
      {...other}
    />
  );
};


export default Radio;

