import { fn } from "@storybook/test";

import Button from "./Button";

export const ActionsData = {};

export default {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    children: <>кнопа</>,
    variant: "old",
    size: "s",
  },
};

export const m = {
  args: {
    children: <>кнопа</>,
    variant: "old",
    size: "m",
  },
};

export const l = {
  args: {
    children: <>кнопа</>,
    variant: "old",
    size: "l",
    disabled: true,
  },
};

export const sm = {
  args: {
    children: <>кнопа</>,
    variant: "modern",
    size: "s",
    disabled: true,
  },
};

export const mm = {
  args: {
    children: <>кнопа</>,
    variant: "modern",
    size: "m",
  },
};

export const lm = {
  args: {
    children: <>кнопа</>,
    variant: "modern",
    size: "l",
  },
};
