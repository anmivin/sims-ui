import styled from "@emotion/styled";

export const TextfieldRoot = styled("div")({
  display: "inline-flex",
  flexDirection: "column",
  "&.old": {
    color: "#000d60",
    "::placeholder": {
      color: "#98A2D3",
    },
  },
  "&.modern": {
    "::placeholder": {
      color: "#98A2D3",
    },
  },
});

export const TextfieldInput = styled("div")(({ theme }) => ({
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "#f8fbfe",
  border: "1px solid #b5c6d5",
  color: "#333333",
  padding: "0px 12px",
  "&.disabled": {
    color: "gray",
    cursor: "default",
  },
  "&.old": {
    "&.primary": {
      border: "1px solid #00115A !important",
      borderRadius: "6px",
      padding: "8px",
      backgroundColor: "#CDD6FF",
      boxShadow: "inset 0px 0px 4px #8593a1",
    },

    "&.secondary": {},

    "&.multiline": {},
  },
  "&.modern": {
    "&.primary": {
      borderRadius: "6px",
      padding: "8px",
      background: theme.color.buttonGradient,
      color: "#0949ab",
      boxShadow: "0 2px 6px 0 #606164",
    },
    "&.secondary": {
      borderRadius: "20px",
      padding: "5px 10px",
      backgroundColor: "#f8fbfe",
      border: "1px solid #b5c6d5",
      color: "#333333",
      boxShadow: "inset 0px 0px 4px #8593a1",
    },
    "&.multiline": {},
  },
}));

export const TextfieldArea = styled("textarea")({});

export const Input = styled("input")({
  border: 0,
  background: "none",
  display: "block",
  width: "100%",
  "&.multiline": {
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

  "&.disabled": {
    color: "gray",
  },
  "&.error": {
    color: "red",
  },
});

export const HelperText = styled("p")({
  fontSize: "12px",
  textAlign: "left",
  marginTop: 4,
  marginLeft: 4,
  "&.disabled": {
    color: "",
  },
  "&.error": {
    color: "red",
  },
});
