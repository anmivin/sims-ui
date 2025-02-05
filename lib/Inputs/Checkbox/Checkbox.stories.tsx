import { fn } from "@storybook/test";

import Checkbox from "./Checkbox";

export const ActionsData = {};

export default {
  component: Checkbox,
  title: "Checkbox",
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
  },
};

export const m = {
  args: {
    label: "hdhdkd",
    variant: "modern",
  },
};
