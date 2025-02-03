import { css, Theme } from "@emotion/react";
import { ThemeName, MyTheme } from "./theme/theme.types";
export const globalStyles = (variant: ThemeName, theme: MyTheme) => css`
  body {
    margin: 0;
    font-family: ${variant === ThemeName.modern ? "The Sims Sans" : "Comic Sans Ms"}, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    font-weight: 400;
    color: ${variant === ThemeName.modern ? theme.color.darkBlue : theme.color.textMenu};
    overflow: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;
