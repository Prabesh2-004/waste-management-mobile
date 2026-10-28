import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function FocusCard({ children, style, onPress }) {
  const colors = useTheme();
  const cardStyle = [{ backgroundColor: colors.tint, borderRadius: 16, padding: 18 }, style];
  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.8 : 1 }]}>
        {children}
      </Pressable>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}
