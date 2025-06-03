import LinearProgress from "./LinearProgress";
import type { Meta } from "@storybook/react";
export const ActionsData = {};

const meta = {
  component: LinearProgress,
  title: "LinearProgress",
  argTypes: {
    variant: {
      options: ["old", "modern"],
      control: { type: "radio" },
    },
    value: {
      control: "number",
    },
  },
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof LinearProgress>;

export default meta;
