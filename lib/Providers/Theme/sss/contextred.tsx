import * as React from "react";
import { themeConsumerLight, themeConsumer } from "../themes/consumer";

export const UPDATE_THEME = "updateTheme";
export const UPDATE_AMBIENCE = "updateAmbience";

type ThemeContextProps = {
  ambience: any;
  theme: any;
};

export const defaultThemeState = {
  ambience: themeConsumerLight,
  theme: themeConsumer,
};

export const ThemeContext = React.createContext({
  dispatch: (action: any) => {},
  theme: defaultThemeState,
});

const reducer = (theme: ThemeContextProps, action: any) => ({
  ...theme,
  theme: action.payload,
});

export default reducer;
