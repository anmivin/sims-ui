import { MyTheme } from "./Providers/Theme/theme.types";
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme extends MyTheme {}
}
