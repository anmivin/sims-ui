import Tabs from "./Tabs";
import type { Meta } from "@storybook/react";
export const ActionsData = {
  options: [
    { label: "one", value: 1 },
    { label: "two", value: 2 },
    { label: "three", value: 3, disabled: true },
    { label: "four", value: 4 },
  ],
};

const meta = {
  component: Tabs,
  title: "Tabs",
  args: {
    ...ActionsData,
  },
  argTypes: {
    variant: {
      options: ["old", "modern"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
