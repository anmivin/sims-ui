import LinearProgress from "./LinearProgress";

export const ActionsData = {};

export default {
  component: LinearProgress,
  title: "LinearProgress",
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
