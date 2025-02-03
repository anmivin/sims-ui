import styled from "@emotion/styled";
import TextField from "./TextField";
import { getClassNames } from "../../utils/getClassNames";

export const TextfieldRoot = styled("div")({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
});

export const TextfieldInput = styled("div")({
  boxSizing: "border-box",
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "#f8fbfe",
  border: "1px solid #b5c6d5",
  color: "#333333",
  boxShadow: "inset 0px 0px 4px #8593a1",
  ".SimsUiTextField_disabled": {
    color: "gray",
    cursor: "default",
  },
});

export const TextfieldArea = styled("textarea")({});

export const Input = styled("input")({
  font: "inherit",
  letterSpacing: "inherit",
  color: "currentColor",
  padding: "4px 0 5px",
  border: 0,
  boxSizing: "content-box",
  background: "none",
  WebkitTapHighlightColor: "transparent",
  display: "block",
  width: "100%",
  ".SimsUiTextField_multiline": {
    height: "auto",
    resize: "none",
    padding: 0,
    paddingTop: 0,
  },
  "&:focus": {
    outline: 0,
  },
});

export const TextfieldLabelRoot = styled("label")({
  lineHeight: "1.5em",
  padding: 0,
  position: "relative",
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",

  ".SimsUiTextField_disabled": {
    color: "gray",
    ".error": {
      color: "red",
    },
  },
});

export const HelperText = styled("p")({
  color: "",
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  ".disabled": {
    color: "",
  },
  ".error": {
    color: "",
  },
});

export const ModernTextfield = styled(TextField)({
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

export const OldTextfield = styled(TextField)({
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
