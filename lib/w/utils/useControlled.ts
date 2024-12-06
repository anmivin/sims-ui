export interface UseControlledProps<T = unknown> {
  /**
   * Holds the component value when it's controlled.
   */
  controlled: T | undefined;
  /**
   * The default value when uncontrolled.
   */
  default: T | undefined;
  /**
   * The name of the state variable displayed in warnings.
   */
  state?: string;
}

export default function useControlled<T = unknown>(
  props: UseControlledProps<T>
): [T, (newValue: T | ((prevValue: T) => T)) => void];

import * as React from "react";

export default function useControlled({ controlled, default: defaultProp }) {
  const { current: isControlled } = React.useRef(controlled !== undefined);
  const [valueState, setValue] = React.useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const { current: defaultValue } = React.useRef(defaultProp);

  const setValueIfUncontrolled = React.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);

  return [value, setValueIfUncontrolled];
}
