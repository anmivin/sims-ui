import Alert from "./Alert";
import type { Meta } from "@storybook/react";
export const ActionsData = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

const meta = {
  component: Alert,
  title: "Alert",
  args: {
    ...ActionsData,
  },
  argTypes: {
    variant: {
      options: ["old", "modern"],
      control: { type: "radio" },
    },
    level: {
      options: ["success", "warning", "info", "error"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
