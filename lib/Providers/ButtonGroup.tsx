import * as React from "react";

import styled from "@emotion/styled";

const ButtonGroupRoot = styled("div")({
  display: "inline-flex",
  "-fullwidth": {
    width: "100%",
  },
  "-vertical": {
    flexDirection: "column",
    "-lastBotton, -middleButton": {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },
    "-firstBotton, -middleButton": {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  "-horizontal": {
    "-lastBotton, -middleButton": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    "-firstBotton, -middleButton": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
});

const ButtonGroup = (props: ButtonGroupOwnProps) => {
  const {
    children,
    disabled = false,
    fullWidth = false,
    orientation = "horizontal",
    ...other
  } = props;

  const context = React.useMemo(
    () => ({
      disabled,

      fullWidth,
    }),
    [disabled, fullWidth]
  );

  const childrenCount = children?.length;

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
      return "-classes.lastButton";
    }
    return "-classes.middleButton";
  };

  return (
    <ButtonGroupRoot
      as={component}
      role='group'
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <ButtonGroupContext.Provider value={context}>
        {validChildren.map((child, index) => {
          return (
            <ButtonGroupButtonContext.Provider
              key={index}
              value={getButtonPositionClassName(index)}
            >
              {child}
            </ButtonGroupButtonContext.Provider>
          );
        })}
      </ButtonGroupContext.Provider>
    </ButtonGroupRoot>
  );
};

export default ButtonGroup;

export interface ButtonGroupOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: "vertical" | "horizontal";
}

export const ButtonGroupButtonContext = React.createContext<undefined>(undefined);
