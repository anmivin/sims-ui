import { fn } from "@storybook/test";

import Radio from "./Radio";

export const ActionsData = {};

export default {
  component: Radio,
  title: "Radio",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    options: [
      { label: "www", value: 2 },
      { label: "df", value: 3 },
      { label: "df", value: 4, disabled: true },
    ],
    variant: "old",
    onChange: (e) => console.log(e),
  },
};

export const m = {
  args: {
    options: [
      { label: "www", value: 2 },
      { label: "df", value: 3 },
      { label: "df", value: 4, disabled: true },
    ],
    variant: "modern",
  },
};
