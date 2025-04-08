import Button from "./Button";

export const ActionsData = {};

export default {
  component: Button,
  title: "Button",
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
    size: "small",
  },
};

export const m = {
  args: {
    children: <>кнопа</>,
    variant: "old",
    size: "medium",
  },
};

export const l = {
  args: {
    children: <>кнопа</>,
    variant: "old",
    size: "large",
    disabled: true,
  },
};

export const sm = {
  args: {
    children: <>кнопа</>,
    variant: "modern",
    size: "small",
    disabled: true,
  },
};

export const mm = {
  args: {
    children: <>кнопа</>,
    variant: "modern",
    size: "medium",
  },
};

export const lm = {
  args: {
    children: <>кнопа</>,
    variant: "modern",
    size: "large",
  },
};
