import TextField from "./TextField";
import { ChainIcon, DiceIcon } from "../../Display/Icon";

export const ActionsData = {};

export default {
  component: TextField,
  title: "TextField",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const primaryold = {
  args: {
    appearence: "primary",
    variant: "old",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
    error: true,
    startAdornment: <ChainIcon />,
  },
};
export const secondaryold = {
  args: {
    appearence: "secondary",
    variant: "old",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
    endAdornment: <DiceIcon />,
  },
};

export const primarymodern = {
  args: {
    appearence: "primary",
    variant: "modern",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
    endAdornment: <DiceIcon />,
  },
};
export const secondarymodern = {
  args: {
    appearence: "secondary",
    variant: "modern",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
    startAdornment: <ChainIcon />,
  },
};
