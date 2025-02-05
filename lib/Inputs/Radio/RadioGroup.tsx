import React from "react";

import Radio from "./Radio";
import styled from "@emotion/styled";

import RadioCheckIcon from "../../icons/Modern/RadioCheck";
import RadioUncheckedIcon from "../../icons/Modern/RadioUnchecked";
import {default as RadioCheckIconOld} from "../../icons/Old/RadioCheck";
import {default as RadioUncheckedIconOld} from "../../icons/Old/RadioUnchecked";

import { Variant } from "../../shared/types";

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
  variant?: Variant
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
  const { defaultValue,  options, onChange, variant = 'modern', ...other } = props;

  const [value, setValueState] = React.useState(defaultValue);

  const iconComponent = variant === 'modern' ? <RadioUncheckedIcon /> : <RadioUncheckedIconOld/>
  const checkedIconComponent = variant === 'modern' ? <RadioCheckIcon /> : <RadioCheckIconOld/>
  return (
    <RadioGroupRoot {...other}>
      {options.map((option, index) => (
        <RadioGroupItem key={index}>
          <Radio
            icon={iconComponent}
            checkedIcon={checkedIconComponent}
            checked={value === option.value}
            onChange={(e, checked) => {
              if (checked) setValueState(option.value);
              onChange?.(option.value)
            }}
          />
          <p>{option.label}</p>
        </RadioGroupItem>
      ))}
    </RadioGroupRoot>
  );
};

export default RadioGroup;
