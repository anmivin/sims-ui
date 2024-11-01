import styled from "@emotion/styled";

import React from "react";
import TextField, { TextfieldProps } from "./TextField";

const StyledTextfield = styled(TextField)({
  fontSize: "30px",
  forntWeight: "500",
  color: "#000d60",
  "::placeholder": {
    color: "#98A2D3",
  },

  ".input-outlined": {
    border: "1px solid #00115A !important",
    borderRadius: "15px",
    padding: "0 10px",
    backgroundColor: "#CDD6FF",
  },

  ".input-filled": {},

  ".multiline": {},

  ".input": {},
});

export const TextFieldOld = ({ placeholder }: TextfieldProps) => {
  return <StyledTextfield placeholder={placeholder} variant='outlined' />;
};
