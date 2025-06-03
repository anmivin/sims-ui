import Autocomplete from "./Autocomplete";
import type { Meta } from "@storybook/react";
export const ActionsData = {
  options: [
    { id: "1", label: "sss" },
    { id: "2", label: "dfs" },
    { id: "3", label: "tyuur" },
  ],
};

const meta = {
  component: Autocomplete,
  title: "Autocomplete",
  argTypes: {
    variant: {
      options: ["old", "modern"],
      control: { type: "radio" },
    },
    noOptionsText: {
      control: "text",
    },
  },
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
