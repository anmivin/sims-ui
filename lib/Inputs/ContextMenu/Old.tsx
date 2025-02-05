import styled from "@emotion/styled";
import Button from "../Button/Button";
import React from "react";

import { ContextMenu } from "./ContextMenu";

export const ContextMenuOld = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <StyledMenu>
      <ContextMenu
        open={open}
        options={[
          { item: "one long name", action: () => {} },
          { item: "two long name", action: () => {} },
          { item: "three long name ", action: () => {} },
          { item: "four long namelong name", action: () => {} },
          { item: "five long name", action: () => {} },
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
