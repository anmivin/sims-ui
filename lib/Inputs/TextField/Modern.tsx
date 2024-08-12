import styled from "@emotion/styled";
import React from 'react';
const StyledTextfield = styled.input`
  outline: none;
  width: 200px;
  height: 25px;
  border-radius: 20px;
  padding: 5px 10px;
  background-color: #f7f7f7;
  border: 1px solid #cccccc;
  color: #333333;

  :focus {
    border-color: #aaaaaa;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

interface TextfieldProps {
  placeholder: string;
}

export const TextField = ({ placeholder }: TextfieldProps) => {
  return <StyledTextfield type='text' placeholder={placeholder} />;
};
