import * as React from "react";

import getValidReactChildren from "@mui/utils/getValidReactChildren";
import styled from "@emotion/styled";

const ToggleButtonGroupRoot = styled("div")({
  display: "inline-flex",
  variants: [
    {
      props: { orientation: "vertical" },
      style: {
        flexDirection: "column",
        [`& .${toggleButtonGroupClasses.grouped}`]: {
          [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
            {
              borderTop: 0,
              marginTop: 0,
            },
        },
        [`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]:
          {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        [`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]: {
          marginTop: -1,
          borderTop: "1px solid transparent",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
          {
            borderTop: "1px solid transparent",
          },
      },
    },
    {
      props: { fullWidth: true },
      style: {
        width: "100%",
      },
    },
    {
      props: { orientation: "horizontal" },
      style: {
        [`& .${toggleButtonGroupClasses.grouped}`]: {
          [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
            {
              borderLeft: 0,
              marginLeft: 0,
            },
        },
        [`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]:
          {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        [`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]: {
          marginLeft: -1,
          borderLeft: "1px solid transparent",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
          {
            borderLeft: "1px solid transparent",
          },
      },
    },
  ],
});

const ToggleButtonGroup = (props: ToggleButtonGroupProps) => {
  const {
    children,
    disabled = false,
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = "horizontal",
    value,
    ...other
  } = props;

  const handleChange = React.useCallback(
    (event, buttonValue) => {
      if (!onChange) {
        return;
      }

      const index = value && value.indexOf(buttonValue);
      let newValue;

      if (value && index >= 0) {
        newValue = value.slice();
        newValue.splice(index, 1);
      } else {
        newValue = value ? value.concat(buttonValue) : [buttonValue];
      }

      onChange(event, newValue);
    },
    [onChange, value]
  );

  const handleExclusiveChange = React.useCallback(
    (event, buttonValue) => {
      if (!onChange) {
        return;
      }

      onChange(event, value === buttonValue ? null : buttonValue);
    },
    [onChange, value]
  );

  const context = React.useMemo(
    () => ({
      onChange: exclusive ? handleExclusiveChange : handleChange,
      value,
      fullWidth,
      disabled,
    }),
    [exclusive, handleExclusiveChange, handleChange, value, fullWidth, disabled]
  );

  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;

  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;

    if (isFirstButton && isLastButton) {
      return "";
    }
    if (isFirstButton) {
      return "-firstButton";
    }
    if (isLastButton) {
      return "-lastButton";
    }
    return "-middleButton";
  };

  return (
    <ToggleButtonGroupRoot role='group' {...other}>
      <ToggleButtonGroupContext.Provider value={context}>
        {validChildren.map((child, index) => {
          return (
            <ToggleButtonGroupButtonContext.Provider
              key={index}
              value={getButtonPositionClassName(index)}
            >
              {child}
            </ToggleButtonGroupButtonContext.Provider>
          );
        })}
      </ToggleButtonGroupContext.Provider>
    </ToggleButtonGroupRoot>
  );
};

export default ToggleButtonGroup;

export const ToggleButtonGroupButtonContext = React.createContext<string | undefined>(undefined);

export interface ToggleButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive?: boolean;
  /**
   * If `true`, the component is disabled. This implies that all ToggleButton children will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value?: any;
}

// Determine if the toggle button value matches, or is contained in, the
// candidate group value.
export const isValueSelected = (value, candidate) => {
  if (candidate === undefined || value === undefined) {
    return false;
  }

  if (Array.isArray(candidate)) {
    return candidate.includes(value);
  }

  return value === candidate;
};
