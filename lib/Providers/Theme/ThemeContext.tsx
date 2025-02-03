import { colors } from "./theme/color";
import { ThemeName } from "./theme/theme.types";
import { ThemeProvider, Global } from "@emotion/react";
import { globalStyles } from "./GlobalStyles";
import React from "react";

const theme = {
  color: colors,
};

const SimsThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      <Global styles={globalStyles(ThemeName.modern, theme)} />
    </>
  );
};
export default SimsThemeProvider;
