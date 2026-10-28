import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const base = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 10,
  paddingVertical: 14,
  paddingHorizontal: 4,
};

export default function Row({ children, onPress, last = false, minHeight = 58, style }) {
  const colors = useTheme();
  const rowStyle = [base, { minHeight, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.line }, style];
  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.6 : 1 }]}>
        {children}
      </Pressable>
    );
  }
  return <View style={rowStyle}>{children}</View>;
}
