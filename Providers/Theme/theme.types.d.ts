import { Color, Shadow } from './color';
export type { Shadow, Color };
export declare enum ThemeName {
    modern = "modern",
    old = "old"
}
export type ThemeKey = keyof typeof ThemeName;
export type MyTheme = {
    color: Color;
    shadow: Shadow;
};
