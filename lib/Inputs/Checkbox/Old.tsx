import * as React from "react";

import CheckBox from "../../icons/Old/CheckBoxUnchecked";
import CheckBoxCross from "../../icons/Old/CheckBoxCross";
import Checkbox, {CheckboxProps} from "./Checkbox";

interface OldCheckboxProps extends CheckboxProps {
  label?: string
}

export const OldCheckbox = ({ label }: OldCheckboxProps) => {
  return (
    <div>
      <Checkbox
        checkedIcon={<CheckBoxCross color='#121B61' />}
        icon={<CheckBox color='#121B61' />}
      />
      {label && <span>{label}</span>}
    </div>
  );
};
