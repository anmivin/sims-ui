import { createTheme } from '@mui/material/styles';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const theme = {
  light: createTheme(lightTheme),
  dark: createTheme(darkTheme),
};
