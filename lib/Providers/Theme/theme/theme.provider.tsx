import { ReactNode, useMemo } from 'react';

import { GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { globalStyles } from '@theme/globalStyles';
import { theme } from '@theme/theme';
import { ThemeName } from '@theme/theme.constants';

interface ThemeColorModeProviderProps {
  children: ReactNode;
  isDarkTheme: boolean;
}

const ThemeColorModeProvider = ({ children, isDarkTheme }: ThemeColorModeProviderProps) => {
  const curretnTheme = useMemo(() => {
    return isDarkTheme ? ThemeName.dark : ThemeName.light;
  }, [isDarkTheme]);

  return (
    <>
      <ThemeProvider theme={theme[curretnTheme]}>{children}</ThemeProvider>
      <GlobalStyles styles={globalStyles(theme[curretnTheme])} />
    </>
  );
};

export default ThemeColorModeProvider;
