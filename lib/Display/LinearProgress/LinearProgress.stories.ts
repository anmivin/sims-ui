import LinearProgress from "./LinearProgress";

export const ActionsData = {};

export default {
  component: LinearProgress,
  title: "LinearProgress",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    variant: "old",
    value: 90,
  },
};

export const m = {
  args: {
    variant: "modern",
    value: 50,
  },
};
