import CircularProgress from "./CircularProgress";

import type { Meta } from "@storybook/react";
export const ActionsData = {
  size: 80,
};
const meta = {
  component: CircularProgress,
  title: "CircularProgress",
  argTypes: {
    variant: {
      options: ["old", "modern"],
      control: { type: "radio" },
    },
    size: {
      control: "number",
    },
  },
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof CircularProgress>;

export default meta;
