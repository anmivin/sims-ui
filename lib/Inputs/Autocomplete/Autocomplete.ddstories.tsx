import { fn } from "@storybook/test";

import Autocomplete from "./Autocomplete";

export const ActionsData = {};

export default {
  component: Autocomplete,
  title: "Autocomplete",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    options: [
      { id: "1", label: "sss" },
      { id: "2", label: "dfs" },
      { id: "3", label: "tyuur" },
    ],
    variant: "old",
  },
};

export const m = {
  args: {
    options: [
      { id: "1", label: "sss" },
      { id: "2", label: "dfs" },
      { id: "3", label: "tyuur" },
    ],
    variant: "modern",
  },
};
