import { fn } from "@storybook/test";

import ColorInput from "./ColorInput";

export const ActionsData = {};

export default {
  component: ColorInput,
  title: "ColorInput",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {},
};

export const m = {
  args: {},
};
