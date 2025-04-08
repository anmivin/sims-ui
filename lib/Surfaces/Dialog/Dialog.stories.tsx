import Dialog from "./Dialog";

import { useState } from "react";

export const ActionsData = {};

export default {
  component: Dialog,
  title: "Dialog",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

const DialogWithHooks = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>открыть</button>
      <Dialog open={open}>контент диалога</Dialog>
    </>
  );
};

export const Old = {
  render: () => <DialogWithHooks />,
  args: {
    variant: "old",
    open: false,
    onClose: () => {},
  },
};

export const Modern = {
  render: () => <DialogWithHooks />,
  args: {
    variant: "modern",
    open: false,
    onClose: () => {},
  },
};
