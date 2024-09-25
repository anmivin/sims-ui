import React, { ReactNode, createContext, useContext, useState } from "react";

export const colors = {
  sims4: {
    buttonGradient: "linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",
    darkBlue: "#0949ab",
    lightBlue: "#1e81e0",
    buttonShadow: "0 4px 6px 0 #606164",
    checkbosShadow: "0 4px 6px 0 #848484",
    green: "#199c2c",
    white: "#fff",
    modal: "rgba(251, 251, 251, 0.7)",
    modalShadow: "0px 0px 9px 1px rgba(0, 0, 0, 0.3)",
    checkboxChecked: " linear-gradient(180deg, #5db823 40%, #269331);",
    checkboxUnchecked: "linear-gradient(180deg, #f9f9f9 40%, #dddddd)",
    selectedButton: "linear-gradient(180deg, #92ce31 20%, #3bb435)",
    scrollBarTrack: "#e4e4e4",
    scrollBarThumb: "linear-gradient(180deg, #fafbfc 20%, #e8eff2)",
    scrollBarThumbHover: "linear-gradient(180deg, #c7ee7d 20%, #a8e15f)",
    scrollBarBorder: "#b6b7b8",
  },
  sims2: {
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
  },
};

const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

enum styles {
  old = "old",
  modern = "modern",
}

export type sims2Color = typeof colors.sims2;
export type sims4Color = typeof colors.sims4;

interface Vars {
  zIndex: { [key: string]: number };
  colors: {
    [styles.modern]: sims4Color;
    [styles.old]: sims2Color;
  };
}

interface ThemeContextProps {
  vars: Vars;
  currentStyle: styles;
  changeTheme: (props: styles) => void;
}

export const ThemeContext = createContext({
  vars: {
    zIndex: zIndex,
    colors: { [styles.modern]: colors.sims4, [styles.old]: colors.sims2 },
  },
  currentStyle: styles.modern,
  changeTheme: () => {},
} as ThemeContextProps);

const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<styles>(styles.modern);
  const changeTheme = (newTheme: styles) => {
    setCurrentTheme(newTheme);
  };
  return (
    <ThemeContext.Provider
      value={{
        vars: {
          zIndex: zIndex,
          colors: { [styles.modern]: colors.sims4, [styles.old]: colors.sims2 },
        },
        currentStyle: currentTheme,
        changeTheme: changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
