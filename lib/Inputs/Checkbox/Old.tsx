import * as React from "react";

import CheckBox from "../../icons/Old/CheckBoxUnchecked";
import CheckBoxCross from "../../icons/Old/CheckBoxCross";
import Checkbox from "./Checkbox";
interface CheckboxProps {
  label: string;
}

export const OldCheckbox = ({ label }: CheckboxProps) => {
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
