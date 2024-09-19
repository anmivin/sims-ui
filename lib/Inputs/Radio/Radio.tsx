import * as React from 'react';
import SwitchBase, { SwitchBaseProps } from "../../Internal/SwitchBase";

import {useRadioGroup} from './RadioGroup';

import styled from '@emotion/styled';


export interface RadioProps
  extends Omit<SwitchBaseProps, 'checkedIcon' | 'color' | 'icon' | 'type'> {
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
  });


function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

const defaultCheckedIcon = <></>;
const defaultIcon = <></>;

const Radio = (props: RadioProps) =>  {
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    icon = defaultIcon,
    onChange: onChangeProp,
    disabled: disabledProp,
    ...other
  } = props;


  let disabled = disabledProp;



  disabled ??= false;

  const radioGroup = useRadioGroup();

  React.useEffect(() => {
    console.log(radioGroup)
  },[radioGroup])

  let checked = checkedProp;
  const onChange = (e, val) => {
    onChangeProp?.(e, val);
    radioGroup?.onChange?.(e, val);
  }


  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = areEqualValues(radioGroup.value, props.value);
    }
  }

  return (
    <RadioRoot
      type="radio"
      icon={icon}
      checkedIcon={checkedIcon}
      disabled={disabled}
 checked={checked}
      onChange={onChange}

      {...other}
    />
  );
};

export default Radio;