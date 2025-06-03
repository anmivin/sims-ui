import Button from "./Button";
import type { Meta } from "@storybook/react";
export const ActionsData = { children: "кнопа" };

const meta = {
  component: Button,
  title: "Button",
  args: {
    ...ActionsData,
  },
  argTypes: {
    variant: {
      options: ["old", "modern"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
