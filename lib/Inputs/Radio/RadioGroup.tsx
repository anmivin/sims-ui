import * as React from "react";

import Radio from "./Radio";
import styled from "@emotion/styled";

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  row?: boolean;
  defaultValue?: any;
  onChange?: (value: string) => void;
  options: {
    label: string;
    value: any;
  }[];
  checkedIcon: React.ReactNode;
  icon: React.ReactNode;
}

const RadioGroupRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  "-row": {
    flexDirection: "row",
  },
});

const RadioGroupItem = styled("div")({
  display: "flex",
  gap: "10px",
});

const RadioGroup = (props: RadioGroupProps) => {
  const { children, defaultValue, checkedIcon, icon, onChange, options, ...other } = props;

  const [value, setValueState] = React.useState(defaultValue);

  return (
    <RadioGroupRoot role='radiogroup' {...other}>
      {options.map((option, index) => (
        <RadioGroupItem key={index}>
          <Radio
            icon={icon}
            checkedIcon={checkedIcon}
            checked={value === option.value}
            onChange={(e, checked) => {
              if (checked) setValueState(option.value);
            }}
          />
          <p>{option.label}</p>
        </RadioGroupItem>
      ))}
    </RadioGroupRoot>
  );
};

export default RadioGroup;
