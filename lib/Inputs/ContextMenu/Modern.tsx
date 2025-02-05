import Button from "../Button/Button";
import { ContextMenu } from "./ContextMenu";
import { useState } from "react";

export const ContextMenuModern = () => {
  const [open, setOpen] = useState(false);
  return (
    <StyledMenu>
      <ContextMenu
        open={open}
        options={[
          { item: "one long name", action: () => {} },
          { item: "two long name", action: () => {} },
          { item: "three", action: () => {} },
          { item: "four", action: () => {} },
          { item: "five", action: () => {} },
        ]}
        component={
          <Button className='menuComponent' onClick={() => setOpen((prev) => !prev)}>
            asdasd
          </Button>
        }
      />
    </StyledMenu>
  );
};
