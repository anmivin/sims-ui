import { fn } from "@storybook/test";

import Autocomplete from "./Autocomplete";

export const ActionsData = {};

export default {
  component: (props) => (
    <div style={{ padding: "100px" }}>
      <Autocomplete {...props} />
    </div>
  ),
  title: "Autocomplete",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    options: [
      { id: "1", label: "sss" },
      { id: "2", label: "dfs" },
      { id: "3", label: "tyuur" },
    ],
    variant: "old",
  },
};

export const m = {
  args: {
    options: [
      { id: "1", label: "sss" },
      { id: "2", label: "dfs" },
      { id: "3", label: "tyuur" },
    ],
    variant: "modern",
  },
};
