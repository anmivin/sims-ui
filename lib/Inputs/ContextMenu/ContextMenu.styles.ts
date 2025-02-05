import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";

const createStyles = (numberItems: number) => {
  const pathStyles: { [key: string]: SerializedStyles } = {};
  const diff = 360 / numberItems;
  for (let i = 0; i < numberItems; i += 1) {
    pathStyles[`.menuItem_${i}`] = css`
      position: absolute;
      transform: translate(-50%, -50%);
      left: calc(50% + 120px * cos(${i * diff - 90}deg));
      top: calc(50% + 120px * sin(${i * diff - 90}deg));
    `;
  }
  return pathStyles;
};

export const MenuContent = styled("div")<{ numberItems: number }>(({ numberItems }) => ({
  position: "relative",
  width: "400px",
  height: "400px",
  borderRadius: "50%",
  backgroundColor: "#f0f0f0",
  ...createStyles(numberItems),

  ".menuComponent": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40px",
    height: "20px",
  },
}));

export const MenuButton = styled("button")({
  alignItems: "center",
  justifyContent: "center",
  outline: 0,
  border: 0,
  margin: 0,
  padding: 0,
  cursor: "pointer",
  textDecoration: "none",
  "&.modern": {
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
  "&.old": {
    fontFamily: "Comic Sans Ms",
    fontSize: "16px",
    borderRadius: "50px",
    color: "#a8b4fd",
    backgroundColor: "#36378f",
    boxShadow: "inset 0 -2px 18px 2px #b1c0fc, 0 0 1px 2px #222a55",
    padding: "10px 30px",
    height: "40px",
    width: "fit-content",
    transition: "color 0.1s ease-in-out",
    "&:hover": {
      color: "#00ff00",
    },
  },
});
