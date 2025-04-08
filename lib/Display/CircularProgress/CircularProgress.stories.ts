import CircularProgress from "./CircularProgress";

export const ActionsData = {};

export default {
  component: CircularProgress,
  title: "CircularProgress",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
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
