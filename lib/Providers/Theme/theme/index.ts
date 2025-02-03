import { darkTheme } from './dark';
import { lightTheme } from './light';
import { theme } from './theme';
import ThemeProvider from './theme.provider';

export { globalStyles } from './globalStyles';

export { commonTheme } from './common/commonTheme';
export { breakpoints, media, MediaSize } from './common/media';
export { typography, TypoVariant } from './common/typography';
export { shadow } from './common/shadows';
export * from './theme.types';

export { theme, lightTheme, darkTheme, ThemeProvider };
export type { Theme } from '@mui/material/styles';
