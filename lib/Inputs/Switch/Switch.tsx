import * as React from "react";

import styled from "@emotion/styled";

import SwitchBase, { SwitchBaseProps } from "../../Providers/SwitchBase";

export interface SwitchProps
  extends Omit<SwitchBaseProps, "checkedIcon" | "color" | "icon"> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: string | number | readonly string[] | undefined;
}


const SwitchRoot = styled("span")({
  display: "inline-flex",
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: "hidden",
  padding: 12,
  boxSizing: "border-box",
  position: "relative",
  flexShrink: 0,
  zIndex: 0, // Reset the stacking context.
  verticalAlign: "middle", // For correct alignment with the text.
'-start': {
marginLeft: -8
},
'-end': {
marginRight: -8
}


   
});

const SwitchSwitchBase = styled(SwitchBase)({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1, // Render above the focus ripple.
    '-disabled': {

    },
    '-checked': {
      transform: "translateX(20px)",
    },
'-checked + .track': {
  opacity: 0.5,
},
'-disabled + .track': {
  opacity: 0.2,
},
'-input': {
        left: "-100%",
      width: "300%",
},

        "&:hover": {
      backgroundColor: '',

    },
   
  });

const SwitchTrack = styled("span")(
{
    height: "100%",
    width: "100%",
    borderRadius: 14 / 2,
    zIndex: -1,
    backgroundColor: '',
    opacity: 0.3,
  });

const SwitchThumb = styled("span")({
    boxShadow: '',
    backgroundColor: "currentColor",
    width: 20,
    height: 20,
    borderRadius: "50%",
  });

const Switch = (props: SwitchProps) => {
  const { edge = false, ...other } = props;

  const icon = <SwitchThumb className={'-thumb'} />;

  return (
    <SwitchRoot className={edge === 'start' ? '-start': '-end'} >
      <SwitchSwitchBase
        type='checkbox'
        icon={icon}
        checkedIcon={icon}

        {...other}

      />
      <SwitchTrack className={'-track'} />
    </SwitchRoot>
  );
};

export default Switch;


