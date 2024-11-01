
import RadioCheckIcon from "../../icons/Old/RadioCheck";
import RadioUncheckedIcon from "../../icons/Old/RadioUnchecked";
import RadioGroup, {RadioGroupProps} from "./RadioGroup";
export const OldRadio = ({options}: RadioGroupProps) => {
  return (
    <RadioGroup
      icon={<RadioUncheckedIcon />}
      checkedIcon={<RadioCheckIcon />}
      options={options}
    ></RadioGroup>
  );
};
