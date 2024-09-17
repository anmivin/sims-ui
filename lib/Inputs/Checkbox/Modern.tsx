import styled from "@emotion/styled";
import * as React from "react";


import CheckIcon from '../../icons/CheckIcon'
import Checkbox from './Checkbox'
interface CheckboxProps {
  label: string;
}

const CheckedIcon = styled('div')({
  background: 'linear-gradient(180deg, #5db823 40%, #269331)',
   transition: 'background 1s ease-in-out',
   position: 'relative',
   border: 'none',
 width: '24px',
 height: '24px',
 borderRadius: '25%',
 outline: 'none',
 cursor: 'pointer',
 boxShadow: '0 4px 6px 0 #848484'

})

const UncheckedIcon = styled('div')({
 transition: 'background 1s ease-in-out',
 '-webkit-appearance': 'none',
 appearance: 'none',
 width: '24px',
 height: '24px',
 borderRadius: '25%',
 outline: 'none',
 cursor: 'pointer',
 background: 'linear-gradient(180deg, #f9f9f9 40%, #dddddd)',
 boxShadow: '0 4px 6px 0 #848484'
})

const StyledLabel = styled('span')({
    fontSize: '20px',
  forntWeight: 500,
  color: '#2081e6',
})
;


export const ModernCheckbox = ({ label }: CheckboxProps) => {
   
  return (
    <div><Checkbox checkedIcon={<CheckedIcon><CheckIcon color='white'/></CheckedIcon>} icon={<UncheckedIcon/>}/> {label && (<StyledLabel>{label}</StyledLabel>)}</div>
   
  );
};
