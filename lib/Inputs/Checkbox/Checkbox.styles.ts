import styled from "@emotion/styled";
import CheckBoxChecked from "../../icons/Modern/CheckBoxChecked";
import CheckBoxUnchecked from "../../icons/Modern/CheckBox";

export const CheckboxRoot = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  ".disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
});

export const CheckboxInput = styled("input")({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1,
});

export const CheckedIcon = styled(CheckBoxChecked)({
  filter: "drop-shadow(0 2px 3px #848484)",
});

export const UncheckedIcon = styled(CheckBoxUnchecked)({
  filter: "drop-shadow(0 2px 3px #848484)",
});

export const StyledLabel = styled("span")({
  fontSize: "20px",
  forntWeight: 500,
  color: "#2081e6",
});
