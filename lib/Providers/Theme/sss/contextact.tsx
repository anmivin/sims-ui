import { UPDATE_THEME, UPDATE_AMBIENCE } from "./reducer";

export const updateTheme = (theme: any) => {
  return {
    type: UPDATE_THEME,
    payload: theme,
  };
};

export const updateAmbience = (ambience: any) => {
  return {
    type: UPDATE_AMBIENCE,
    payload: ambience,
  };
};
