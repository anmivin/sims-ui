import { createTheme } from "@mui/material/styles";

import { Theme } from "./theme.types";

import { radius } from "./radius";
import { shadows } from "./shadows";
import { typography } from "./typography";

export const commonTheme: Theme = createTheme({
  typography,

  shadows,
  radius,
  spacing: 4,
});

export default commonTheme;
