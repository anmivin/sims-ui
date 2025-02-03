import * as React from "react";
import "./app.css";
import { ThemeProvider } from "@emotion/react";
import Toggle from "./toggle";
import reducer, { ThemeContext, defaultThemeState } from "./contextred";

import { themeInternalLight, themeInternalDark, themeInternal } from "./themeintern";
import { updateTheme } from "./contextact";

export default function App() {
  const [theme, dispatch] = React.useReducer(reducer, defaultThemeState);

  const onInternal = () => {
    return dispatch(updateTheme(themeInternal));
  };

  const themeAmbienceSelector = () => {
    return theme.ambience ? themeInternalLight : themeInternalDark;
  };

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      <ThemeProvider theme={themeAmbienceSelector}>dd</ThemeProvider>
    </ThemeContext.Provider>
  );
}
