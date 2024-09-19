import * as React from 'react';

export interface RadioGroupContextValue {
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  value: any;
}

/**
 * @ignore - internal component.
 */
const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);



export default RadioGroupContext;