import RadioCheckIcon from "../../icons/Modern/RadioCheck";
import RadioUncheckedIcon from "../../icons/Modern/RadioUnchecked";
import RadioGroup from "./RadioGroup";
export const ModernRadio = () => {
  return (
    <RadioGroup
      icon={<RadioUncheckedIcon />}
      checkedIcon={<RadioCheckIcon />}
      options={[
        { label: "1", value: 1 },
        { label: "2", value: 2 },
      ]}
    ></RadioGroup>
  );
};
