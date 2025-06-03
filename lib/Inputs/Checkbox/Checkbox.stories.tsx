import Checkbox from "./Checkbox";
import type { Meta } from "@storybook/react";
export const ActionsData = {};

const meta = {
  component: Checkbox,
  title: "Checkbox",
  args: {
    ...ActionsData,
  },
  argTypes: {
    variant: {
      options: ["old", "modern"],
      control: { type: "radio" },
    },

    label: { control: "text" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
