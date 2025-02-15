import { fn } from "@storybook/test";

import Alert from "./Alert";
import { AlertProps } from "./Alert.types";

export const ActionsData = {};

export default {
  component: Alert,
  title: "Alert",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const successOld = {
  args: {
    variant: "old",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    level: "success",
  },
};

export const successModern = {
  args: {
    variant: "modern",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    level: "success",
  },
};
export const warningOld = {
  args: {
    variant: "old",
    children: "ldkl ajejjvlf ajfalo scjja",
    level: "warning",
  },
};
export const warningModern = {
  args: {
    variant: "modern",
    children: "ldkl ajejjvlf ajfalo scjja",
    level: "warning",
  },
};
export const infoOld = {
  args: {
    variant: "old",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    level: "info",
  },
};

export const infoModern = {
  args: {
    variant: "modern",
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    level: "info",
  },
};
export const errorOld = {
  args: {
    variant: "old",
    children: "ldkl ajejjvlf ajfalo scjja",
    level: "error",
  },
};
export const errorModern = {
  args: {
    variant: "modern",
    children: "ldkl ajejjvlf ajfalo scjja",
    level: "error",
  },
};
