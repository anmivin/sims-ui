import styled from "@emotion/styled";

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


export const PopoverArrow = styled("div")({
  width: "0px",
  height: "0px",
  borderStyle: "solid",
    "&.bottom": {
      borderWidth: "0 10px 20px 10px",
      borderColor: "transparent transparent #FF4532 transparent",
  },
  "&.top": {
    borderWidth: "150px 100px 0px 100px",
    borderColor: "#FF4532 transparent transparent transparent",
    
  }, 
  "&.right": {
    borderWidth: "10px 20px 10px 0px",
    borderColor: "transparent #FF4532 transparent  transparent",
  },
  "&.left": {
 borderWidth: "10px 0px 10px 20px",
    borderColor: "transparent transparent  transparent #FF4532",
  },
});
