import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import palette from '../../data/theme.json';

const ThemeContext = createContext(palette.light);

export function ThemeProvider({ children }) {
  const scheme = useColorScheme();
  const colors = useMemo(() => (scheme === 'dark' ? palette.dark : palette.light), [scheme]);
  return (
    <ThemeContext.Provider value={colors}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
