import styled from "@emotion/styled";


import React from 'react';
import TextField from './TextField'


interface TextfieldProps {
  placeholder: string;
}

export const TextFieldModern = ({ placeholder }: TextfieldProps) => {
  return <StyledTextfield label='sad' placeholder={placeholder}  variant='filled' />;
};


const StyledTextfield = styled(TextField)({

  width: '200px',
  height: '60px',
  padding: '0 10px',
  backgroundColor: '#CDD6FF',
  border: '1px solid #00115A !important',
  color: '#000d60',
  fontSize: '30px', 
  forntWeight: '500',
  borderRadius: '15px',
  '::placeholder':  {
    color: '#98A2D3'
  },

/*   '.input-outlined': { 
    borderRadius: '20px',
    padding: '5px 10px',
    backgroundColor: '#f8fbfe',
    border:'1px solid #b5c6d5',
    color: '#333333',
    boxShadow: 'inset 0px 0px 4px #8593a1'
 }, 

 '.input-filled': { 
  borderRadius: '6px',
  padding: '5px 10px',
  background: 'linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)',

  color: '#0949ab',
  boxShadow: '0 2px 6px 0 #606164',
},  */

'.multiline': {

},

'.input': {

},


'.root-standard': {
  color: 'red'
},
})



interface TextfieldProps {
  placeholder: string;
}

export const TextFieldOld = ({ placeholder }: TextfieldProps) => {
  return <StyledTextfield  placeholder={placeholder} />;
};
