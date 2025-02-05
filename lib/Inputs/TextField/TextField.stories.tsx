import { fn } from "@storybook/test";

import TextField from "./TextField";

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

export const filledold = {
  args: {
    appearence: "filled",
    variant: "old",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
  },
};

export const standardold = {
  args: {
    appearence: "standard",
    variant: "old",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
  },
};
export const outlinedold = {
  args: {
    appearence: "outlined",
    variant: "old",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
  },
};

export const filledmodern = {
  args: {
    appearence: "filled",
    variant: "modern",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
  },
};
export const standardmodern = {
  args: {
    appearence: "standard",
    variant: "modern",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
  },
};

export const outlinedmodern = {
  args: {
    appearence: "outlined",
    variant: "modern",
    placeholder: "placeholder",
    label: "label",
    helperText: "sdadad",
  },
};
