import { fn } from "@storybook/test";

import ContextMenu from "./ContextMenu";

export const ActionsData = {};

export default {
  component: ContextMenu,
  title: "ContextMenu",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    options: [
      { item: "one long name", action: () => {} },
      { item: "two long name", action: () => {} },
      { item: "three", action: () => {} },
      { item: "four", action: () => {} },
      { item: "five", action: () => {} },
    ],
    component: <>kkdkd</>,
    defaultOpen: true,
    variant: "modern",
  },
};

export const m = {
  args: {
    options: [
      { item: "one long name", action: () => {} },
      { item: "two long name", action: () => {} },
      { item: "three", action: () => {} },
      { item: "four", action: () => {} },
      { item: "five", action: () => {} },
    ],
    component: <>kkdkd</>,
    defaultOpen: true,
    variant: "old",
  },
};
