import { useState } from "react";

import Popover from "./Popover";

export const ActionsData = {};

export default {
  component: Popover,
  title: "Popover",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

const PopoverWithHooks = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <button onClick={(e) => setAnchorEl(e.currentTarget)}>открыть</button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onBackdropClick={() => setAnchorEl(null)}
        onClose={() => setAnchorEl(null)}
      >
        контент диалога
      </Popover>
    </>
  );
};

export const Old = {
  render: () => <PopoverWithHooks />,
  args: {
    variant: "old",
    open: false,
    onClose: () => {},
  },
};

export const Modern = {
  render: () => <PopoverWithHooks />,
  args: {
    variant: "modern",
    open: false,
    onClose: () => {},
  },
};
