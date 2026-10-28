import React from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import AppText from './AppText';

export default function Chip({ label, onPress, filled = false, minWidth, style }) {
  const colors = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        {
          minHeight: 36,
          minWidth,
          borderWidth: 1,
          borderColor: colors.line,
          backgroundColor: filled ? colors.accent : 'transparent',
          borderRadius: 18,
          paddingVertical: 6,
          paddingHorizontal: 12,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <AppText size={14} tone={filled ? 'white' : 'ink'}>
        {label}
      </AppText>
    </Pressable>
  );
}
