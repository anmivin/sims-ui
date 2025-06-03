import TextField from "./TextField";
import type { Meta } from "@storybook/react";
export const ActionsData = {
  placeholder: "placeholder",
  label: "label",
  helperText: "sdadad",
  error: true,
};

const meta = {
  component: TextField,
  title: "TextField",
  args: {
    ...ActionsData,
  },
  argTypes: {
    variant: {
      options: ["old", "modern"],
      control: { type: "radio" },
    },
    appearence: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
