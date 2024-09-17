
import * as React from "react";


import CheckBox from '../../icons/CheckBox'
import CheckBoxCross from '../../icons/CheckBoxCross'
import Checkbox from './Checkbox'
interface CheckboxProps {
  label: string;
}


export const OldCheckbox = ({ label }: CheckboxProps) => {
   
  return (
    <div><Checkbox checkedIcon={<CheckBoxCross color='#121B61'/>} icon={<CheckBox color='#121B61'/>}/> {/* {label && (<StyledLabel>{label}</StyledLabel>)} */}</div>
   
  );
};
