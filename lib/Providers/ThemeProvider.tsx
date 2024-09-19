import React, { ReactNode, createContext, useContext, useState } from "react";

import { colors } from "../colors";

type color = typeof colors;
enum styles {
  old = "old",
  modern = "modern",
}

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

interface ThemeContextProps {
  color: color;
  currentStyle: styles;
}

export const TheneContext = createContext({} as ThemeContextProps);

export const useModal = () => useContext(TheneContext);

const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <TheneContext.Provider value={{ color: colors, currentStyle: styles.modern }}>
      {children}
    </TheneContext.Provider>
  );
};

export default ThemeProvider;
