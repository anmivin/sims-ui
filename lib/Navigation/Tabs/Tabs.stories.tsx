import Tabs from "./Tabs";

export const ActionsData = {};

export default {
  component: Tabs,
  title: "Tabs",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const oldVertical = {
  args: {
    options: [
      { label: "one", value: 1 },
      { label: "two", value: 2 },
      { label: "three", value: 3, disabled: true },
      { label: "four", value: 4 },
    ],
    variant: "old",
  },
};
export const modernVeertical = {
  args: {
    options: [
      { label: "one", value: 1, disabled: true },
      { label: "two", value: 2 },
      { label: "three", value: 3 },
      { label: "four", value: 4 },
    ],
    variant: "modern",
  },
};
