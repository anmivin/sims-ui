import styled from "@emotion/styled";

import Modal from "../../Internal/Modal";

export const PopoverRoot = styled(Modal)({});

export const Pop = styled("div")({});

export const PopoverPaper = styled("div")({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  outline: 0,
  backgroundColor: "red",
});
