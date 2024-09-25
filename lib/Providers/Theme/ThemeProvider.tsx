import React, { ReactNode, createContext, useContext, useState } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { colors } from "./colors";

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

const theme = {
  colors,
  zIndex,
};

const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const curretnTheme = useMemo(() => {
    return isDarkTheme ? ThemeName.dark : ThemeName.light;
  }, [isDarkTheme]);

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};

export default ThemeProvider;
