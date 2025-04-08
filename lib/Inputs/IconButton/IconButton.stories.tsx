import { CloseIcon } from "../../Display/Icon";
import IconButton from "./IconButton";

export const ActionsData = {};

export default {
  component: IconButton,
  title: "IconButton",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const s = {
  args: {
    children: <CloseIcon />,
    variant: "old",
  },
};

export const m = {
  args: {
    children: <CloseIcon />,
    variant: "modern",
  },
};

export const l = {
  args: {
    children: <CloseIcon />,
    variant: "old",
    disabled: true,
  },
};

export const sm = {
  args: {
    children: <CloseIcon />,
    variant: "modern",
    disabled: true,
  },
};

export const mm = {
  args: {
    children: <CloseIcon />,
  },
};
