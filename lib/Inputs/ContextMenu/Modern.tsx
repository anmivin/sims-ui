import styled from "@emotion/styled";
import Button from "../Button/Button";
import { ContextMenu } from "./ContextMenu";
import { useState } from "react";
const StyledMenu = styled("div")({
  ".contextMenuButton": {
    fontFamily: "The Sims Sans",
    fontSize: "16px",
    borderRadius: "50px",
    color: "#0949ab",
    background: "linear-gradient(180deg, #fbfbfb 20%, #eaeaea)",
    boxShadow: "0 4px 6px 0 #606164",
    padding: "10px 30px",
    height: "40px",
    transition: "transform 0.1s ease-in-out",
    "&:hover": {
      color: "#199c2c",
    },
  },
});

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
