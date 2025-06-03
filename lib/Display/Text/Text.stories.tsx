import Text from "./Text";
import type { Meta } from "@storybook/react";
import { TitleVariant, TextVariant } from "./Text.types";
export const ActionsData = {};

const meta = {
  component: Text,
  title: "Text",
  argTypes: {
    variant: {
      options: [...Object.values(TextVariant), ...Object.values(TitleVariant)],
      control: { type: "radio" },
    },
    children: {
      control: "text",
    },
    noWrap: {
      control: { type: "check" },
    },
  },
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof Text>;

export default meta;
