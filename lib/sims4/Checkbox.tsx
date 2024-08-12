import styled from "@emotion/styled";
import React from 'react';
interface CheckboxProps {
  label: string;
}

const StyledChecbox = styled.input`
  :checked {
    background: linear-gradient(180deg, #5db823 40%, #269331);
      transition: background 1s ease-in-out;
    position: relative;
    border: none;
    :before {
      content: "x";
      font-size: 1.5em;
      color: #fff;
      position: absolute;
      right: 1px;
      top: -5px;
    }
  }
  transition: background 1s ease-in-out;
  -webkit-appearance: none;
  appearance: none;
  width: 48px;
  height: 48px;
  border-radius: 25%;
  border: 2px solid #cccccc;
  outline: none;
  cursor: pointer;
      background: linear-gradient(180deg, #f9f9f9 40%, #dddddd);
        box-shadow: 0 4px 6px 0 #848484;
`;

const CheckboxWrapper = styled.span`
  font-size: 20px;
  fornt-weight: 500;
  color: #2081e6;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Icon = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: #e0d3c3;
  opacity: 1;
`;

export const Checkbox = ({ label }: CheckboxProps) => {
  /*   const [isChecked, setIsChecked] = useState(false); */
  return (
    <div className='checkbox-wrapper'>
      <StyledLabel>
        <StyledChecbox
          type='checkbox'
          /*           checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)} */
        />
        <CheckboxWrapper>{label}</CheckboxWrapper>
      </StyledLabel>
    </div>
  );
};
