import Popper from "../../Surfaces/Popper/Popper";
import IconButton from "../IconButton/IconButton";
import styled from "@emotion/styled";

export const AutocompleteRoot = styled("div")({
  ".inputRoot": {
    ".hasPopupIcon .hasClearIcon": {
      paddingRight: 52 + 4,
    },
    ".input": {
      width: 0,
      minWidth: 30,
      flexGrow: 1,
      textOverflow: "ellipsis",
      opacity: 0,
    },
  },
  ".root": {
    paddingBottom: 1,
    "& .MuiInput-input": {
      padding: "4px 4px 4px 0px",
    },
  },
  ".multiple": {
    ".inputRoot": {
      flexWrap: "wrap",
    },
  },
});

export const AutocompleteEndAdornment = styled("div")({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translate(0, -50%)",
});

export const AutocompleteClearIndicator = styled(IconButton)({
  marginRight: -2,
  padding: 4,
  visibility: "hidden",
});

export const AutocompletePopupIndicator = styled(IconButton)({
  padding: 2,
  marginRight: -2,
  ".popupOpen": {
    transform: "rotate(180deg)",
  },
});

export const AutocompletePopper = styled(Popper)({
  zIndex: 100,
});

export const AutocompletePaper = styled("div")({
  width: "400px",
  overflow: "auto",
});

export const AutocompleteNoOptions = styled("div")({
  color: "",
  padding: "14px 16px",
});

export const AutocompleteListbox = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: 0,
  padding: "8px 0",
  maxHeight: "40vh",
  overflow: "auto",
  position: "relative",
  "-option": {
    minHeight: 48,
    display: "flex",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    paddingTop: 6,
    boxSizing: "border-box",
    outline: "0",
    WebkitTapHighlightColor: "transparent",
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    '&[aria-disabled="true"]': {
      opacity: 0.5,
      pointerEvents: "none",
    },
    '&[aria-selected="true"]': {
      backgroundColor: "",
    },
  },
});

export const AutocompleteListItem = styled("li")({});
