import styled from "@emotion/styled";
import React from "react";
import TextField from "./TextField";

const StyledTextfield = styled(TextField)({
  ".input-outlined": {
    borderRadius: "20px",
    padding: "5px 10px",
    backgroundColor: "#f8fbfe",
    border: "1px solid #b5c6d5",
    color: "#333333",
    boxShadow: "inset 0px 0px 4px #8593a1",
  },

  ".input-filled": {
    borderRadius: "6px",
    padding: "5px 10px",
    background: "linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",

    color: "#0949ab",
    boxShadow: "0 2px 6px 0 #606164",
  },

  ".multiline": {},

  ".input": {},

  ".root-standard": {
    color: "red",
  },
});

interface TextfieldProps {
  placeholder: string;
}

export const TextFieldModern = ({ placeholder }: TextfieldProps) => {
  return <StyledTextfield label='sad' placeholder={placeholder} variant='filled' />;
};
