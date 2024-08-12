import styled from "@emotion/styled";

const StyledTextfield = styled.input`
  outline: none;
  width: 200px;
  height: 60px;

  padding: 0 10px;
  background-color: #CDD6FF;
  border: 1px solid #00115A !important;
  color: #000d60;
  font-size: 30px; 
  fornt-weight: 500;
  border-radius: 15px;
  ::placeholder  {
    color: #98A2D3;
  }
`;

interface TextfieldProps {
  placeholder: string;
}

export const TextField2 = ({ placeholder }: TextfieldProps) => {
  return <StyledTextfield type='text' placeholder={placeholder} />;
};
