import * as React from "react";

import styled from "@emotion/styled";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> {
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  required?: boolean;
  checked?: boolean;
  checkedIcon?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const SwitchBaseRoot = styled("button")({
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
  "-disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
});

const SwitchBaseInput = styled("input")({
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

const SwitchRoot = styled("span")({
  display: "inline-flex",
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: "hidden",
  padding: 12,
  boxSizing: "border-box",
  position: "relative",
  flexShrink: 0,
  zIndex: 0, // Reset the stacking context.
  verticalAlign: "middle", // For correct alignment with the text.
  "-start": {
    marginLeft: -8,
  },
  "-end": {
    marginRight: -8,
  },
});

const SwitchSwitchBase = styled(SwitchBase)({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1, // Render above the focus ripple.
  "-disabled": {},
  "-checked": {
    transform: "translateX(20px)",
  },
  "-checked + .track": {
    opacity: 0.5,
  },
  "-disabled + .track": {
    opacity: 0.2,
  },
  "-input": {
    left: "-100%",
    width: "300%",
  },

  "&:hover": {
    backgroundColor: "",
  },
});

const SwitchTrack = styled("span")({
  height: "100%",
  width: "100%",
  borderRadius: 14 / 2,
  zIndex: -1,
  backgroundColor: "",
  opacity: 0.3,
});

const SwitchThumb = styled("span")({
  boxShadow: "",
  backgroundColor: "currentColor",
  width: 20,
  height: 20,
  borderRadius: "50%",
});

const Switch = (props: SwitchProps) => {
  const { edge = false, ...other } = props;

  const icon = <SwitchThumb className={"-thumb"} />;

  return (
    <SwitchRoot className={edge === "start" ? "-start" : "-end"}>
      <SwitchSwitchBase type='checkbox' icon={icon} checkedIcon={icon} {...other} />
      <SwitchTrack className={"-track"} />
    </SwitchRoot>
  );
};

export default Switch;
