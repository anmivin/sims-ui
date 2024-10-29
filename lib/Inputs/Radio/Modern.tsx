import RadioCheckIcon from "../../icons/Modern/RadioCheck";
import RadioUncheckedIcon from "../../icons/Modern/RadioUnchecked";
import RadioGroup,  {RadioGroupProps} from "./RadioGroup";
export const ModernRadio = ({options}: RadioGroupProps) => {
  return (
    <RadioGroup
      icon={<RadioUncheckedIcon />}
      checkedIcon={<RadioCheckIcon />}
      options={options}
    ></RadioGroup>
  );
};
