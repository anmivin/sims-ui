import Radio from "./Radio";
import RadioCheckIcon from "../../icons/Modern/RadioCheck";
import RadioUncheckedIcon from "../../icons/Modern/RadioUnchecked";
import RadioGroup from "./RadioGroup";
const ModernRadio = () => {
return (
  <RadioGroup> 
        <Radio icon={<RadioUncheckedIcon/>} checkedIcon={<RadioCheckIcon/>}/>  
     <Radio icon={<RadioUncheckedIcon/>} checkedIcon={<RadioCheckIcon/>}/>  
        <Radio icon={<RadioUncheckedIcon/>} checkedIcon={<RadioCheckIcon/>}/>  
    </RadioGroup> 
   
)
}

export default ModernRadio