import styled from "@emotion/styled";
import DefaultButton from "../../Internal/DefaultButton";
import { theme } from "../../Providers/Theme";

export const TabRoot = styled(DefaultButton)(({ theme }) => ({
  maxWidth: 360,
  minWidth: 90,
  minHeight: 48,
  flexShrink: 0,
  padding: "12px 16px",
  overflow: "hidden",
  whiteSpace: "normal",
  textAlign: "center",
  lineHeight: 1.25,
  "&.modern": {
    fontFamily: "The Sims Sans",
    fontSize: "20px",
    borderRadius: "10px 10px 0px 0px",
    color: "#0949ab",
    background: "linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",
    cursor: "pointer",
    padding: 0,
    width: "300px",
    height: "60px",
    "&.disabled": {
      background: theme.color.disabledGradient,
      color: theme.color.disabledText,
    },
    "&:hover": {
      color: "#199c2c",
    },
    "&.selected": {
      background: "linear-gradient(180deg, #92ce31 20%, #3bb435)",
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  "&.old": {
    fontFamily: "Comic Sans Ms",
    fontSize: "20px",
    fontWeight: 600,
    color: "#132178",
    backgroundColor: "#7997d5",
    padding: 0,
    borderRadius: "10px 10px 0px 0px",
    "&.disabled": {
      background: "#b9bcc7",
      color: theme.color.disabledTextOld,
    },
    "&.selected": {
      backgroundColor: "#94abdd",
      border: "2px solid #132178",
      borderBottom: 0,
    },
  },
}));

export const TabsRoot = styled("div")({
  overflow: "hidden",
  overflowX: "auto",
  minHeight: 48,
  display: "flex",

  "&.vertical": {
    flexDirection: "column",
  },
  "&.modern": {
    gap: "8px",
  },
  "&.old": {},
});
