import Radio from "./Radio";
import RadioCheckIcon from "../../icons/Old/RadioCheck";
import RadioUncheckedIcon from "../../icons/Old/RadioUnchecked";
import RadioGroup from "./RadioGroup";
export const OldRadio = () => {
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
