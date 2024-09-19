import * as React from "react";

import SwitchBase, { SwitchBaseProps } from "../../Internal/SwitchBase";


export interface CheckboxProps
  extends Omit<SwitchBaseProps, "checkedIcon" | "color" | "icon" | "type"> {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;

  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: SwitchBaseProps["onChange"];

}


const Checkbox = (props: CheckboxProps) => {
  const { checkedIcon, icon, inputProps, ...other } = props;

  return (
    <SwitchBase
      type='checkbox'
      inputProps={{
        ...inputProps,
      }}
      icon={icon}
      checkedIcon={checkedIcon}

      {...other}
    />
  );
};

export default Checkbox;

