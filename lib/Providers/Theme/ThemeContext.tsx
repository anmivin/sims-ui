import { colors, shadows } from "./color";
import { ThemeName } from "./theme.types";
import { ThemeProvider, Global } from "@emotion/react";
import { globalStyles } from "./GlobalStyles";
import React from "react";

const theme = {
  color: colors,
  shadow: shadows,
};

const SimsThemeProvider = ({
  children,
  themeVariant,
}: {
  children: React.ReactNode;
  themeVariant?: ThemeName;
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      <Global styles={globalStyles(theme, themeVariant)} />
    </>
  );
};
export default SimsThemeProvider;
