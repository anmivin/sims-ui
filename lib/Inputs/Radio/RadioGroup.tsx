import * as React from 'react';
import useForkRef from "../../utils/useForkRef";


export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * Display group of elements in a compact row.
   * @default false
   */
  row?: boolean;

    /**
   * The default value. Use when the component is not controlled.
   */
    defaultValue?: any;
    /**
     * Callback fired when a radio button is selected.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * @param {string} value The value of the selected radio button.
     * You can pull out the new value by accessing `event.target.value` (string).
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    /**
     * Value of the selected radio button. The DOM API casts this to a string.
     */
    value?: any;

}



import styled from '@emotion/styled';

const RadioGroupRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  '-row': {
    flexDirection: 'row'
  }
});


const RadioGroup = (props: RadioGroupProps) => {

  const {
    children,
    defaultValue,
    onChange,
    value: valueProp,
    ...other
  } = props;

  const [value, setValueState] = React.useState(defaultValue);




  const contextValue = React.useMemo(
    () => ({
      onChange(event) {
        setValueState(event.target.value);

        if (onChange) {
          onChange(event, event.target.value);
        }
      },
      value,
    }),
    [onChange, setValueState, value]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <RadioGroupRoot
        role='radiogroup'

        {...other}
      >
        {children}
      </RadioGroupRoot>
    </RadioGroupContext.Provider>)
};


export default RadioGroup;




export interface RadioGroupContextValue {
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  value: any;
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);


export const useRadioGroup = (): RadioGroupContextValue | undefined => {
  return React.useContext(RadioGroupContext);
}