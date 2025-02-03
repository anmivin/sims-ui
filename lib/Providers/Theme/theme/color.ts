export const colors = {
  //sims4
  buttonGradient: "linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",
  darkBlue: "#0949ab",
  lightBlue: "#1e81e0",
  green: "#199c2c",
  white: "#fff",
  modal: "rgba(251, 251, 251, 0.7)",
  checkboxChecked: " linear-gradient(180deg, #5db823 40%, #269331);",
  checkboxUnchecked: "linear-gradient(180deg, #f9f9f9 40%, #dddddd)",
  selectedButton: "linear-gradient(180deg, #92ce31 20%, #3bb435)",
  scrollBarTrack: "#e4e4e4",
  scrollBarThumb: "linear-gradient(180deg, #fafbfc 20%, #e8eff2)",
  scrollBarThumbHover: "linear-gradient(180deg, #c7ee7d 20%, #a8e15f)",
  scrollBarBorder: "#b6b7b8",
  tooltipBlue: "#2885ca",
  tooltipBlueDark: "#3259a6",
  tooltipGreen: "#64b52c",
  tooltipGreenDark: "#0d983f",
  tooltipOrange: "#f67c0f",
  tooltipOrangeDark: "#ee5d1a",

  alertSuccess: "linear-gradient(180deg, #64b52c 60%,  90%, #0d983f)",
  alertWarning: "linear-gradient(180deg, #f67c0f 60%,  90%, #ee5d1a)",
  alertInfo: "linear-gradient(180deg, #2885ca 60%,  90%, #3259a6)",
  alertError: "linear-gradient(180deg, #603785 60%,  90%, #4c2985)",
  //sims2
  dark: "#121B61",
  medium: "#95A6DE",
  light: "#CDD6FF",
  blueMenu: "#7997d4",
  greenIcon: "#bfff8e",
  buttonMenu: "#aebdff",
  lightNenu: "#ccd6ff",
  middleMenu: "#8ca6da",
  darkMenu: "#5167bb",
  textMenu: "#050671",
  turquois: "#04fefe",
  greenBase: "#00ff00",
  blueSurface: "#95a7da",
  lightSurface: "#b6c0f1",
  alertBrown: "#C9B57F",
} as const;

export const shadows = {
  modalShadow: "0px 0px 9px 1px rgba(0, 0, 0, 0.3)",
  buttonShadow: "0 4px 6px 0 #606164",
  checkbosShadow: "0 4px 6px 0 #848484",
};

export type Color = typeof colors;
