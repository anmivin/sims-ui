import React, { ReactNode, createContext, useContext, useState } from "react";

import { colors } from "../colors";

type color = typeof colors;

interface ThemeContextProps {
  color: color;
}

export const ModalContext = createContext({ color: colors } as ThemeContextProps);

export const useModal = () => useContext(ModalContext);

const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return <ModalContext.Provider value={{ color: colors }}>{children}</ModalContext.Provider>;
};

export default ThemeProvider;
