import type { Radius } from "./radius";
import type { Shadow, ShadowObject } from "./shadows";
import type { Color } from "./color";
export type { Radius, Shadow, Color };
import "@emotion/react";

export enum ThemeName {
  modern = "modern",
  old = "old",
}

export type ThemeKey = keyof typeof ThemeName;

export type MyTheme = {
  color: Color;
  /*   shadows: ShadowObject;
  radius: Radius; */
};
