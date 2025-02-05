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
  },
};
