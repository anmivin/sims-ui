import styled from "@emotion/styled";
import * as React from "react";

import CheckBoxUnchecked from "../../icons/Modern/CheckBox";
import Checkbox, {CheckboxProps} from "./Checkbox";
import CheckBoxChecked from "../../icons/Modern/CheckBoxChecked";


const CheckedIcon = styled(CheckBoxChecked)({
  filter: "drop-shadow(0 2px 3px #848484)",
});

const UncheckedIcon = styled(CheckBoxUnchecked)({
  filter: "drop-shadow(0 2px 3px #848484)",
});

const StyledLabel = styled("span")({
  fontSize: "20px",
  forntWeight: 500,
  color: "#2081e6",
});

interface ModernCheckboxProps extends CheckboxProps {
  label?: string
}
export const ModernCheckbox = ({ label }: ModernCheckboxProps) => {
  return (
    <div>
      <Checkbox checkedIcon={<CheckedIcon />} icon={<UncheckedIcon />} />{" "}
      {label && <StyledLabel>{label}</StyledLabel>}
    </div>
  );
};
