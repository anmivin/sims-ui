import { fn } from "@storybook/test";

import CircularProgress from "./CircularProgress";

export const ActionsData = {};

export default {
  component: CircularProgress,
  title: "CircularProgress",
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    variant: "old",
  },
};

export const m = {
  args: {
    variant: "modern",
  },
};
