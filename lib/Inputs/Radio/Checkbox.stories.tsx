import { fn } from "@storybook/test";

import RadioGroup from "./RadioGroup";

export const ActionsData = {};

export default {
  component: RadioGroup,
  title: "RadioGroup",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    options: [{label: 'www', value: 2}, {label: 'df', value: 3}, {label: 'df', value: 4}],
    variant: "old",
    onChange: (e) => console.log(e)
  },
};

export const m = {
  args: {
    options: [{label: 'www', value: 2}, {label: 'df', value: 3}, {label: 'df', value: 4}],
    variant: "modern",
  },
};
