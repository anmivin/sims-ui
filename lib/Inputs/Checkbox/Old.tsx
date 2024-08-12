import styled from "@emotion/styled";

interface CheckboxProps {
  label: string;
}

const StyledChecbox = styled.input`
  :checked {
    background-color: #95a6de;
    position: relative;

    :before {
      content: "x";
      font-size: 1.5em;
      color: #000d60;
      position: absolute;
      right: 1px;
      top: -5px;
    }
  }

  -webkit-appearance: none;
  background-color: #95a6de;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 25%;
  border: 4px solid #000d60;
  outline: none;
  cursor: pointer;
`;

const CheckboxWrapper = styled.span`
  font-size: 20px;
  fornt-weight: 500;
  color: #000d60;
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

export const Checkbox2 = ({ label }: CheckboxProps) => {
  return (
    <div className='checkbox-wrapper'>
      <StyledLabel>
        <StyledChecbox type='checkbox' />
        <CheckboxWrapper>{label}</CheckboxWrapper>
      </StyledLabel>
    </div>
  );
};
