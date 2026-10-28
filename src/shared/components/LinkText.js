import React from 'react';
import { Pressable } from 'react-native';
import AppText from './AppText';

export default function LinkText({ label, onPress, size = 17, bold = false, align, style }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link" hitSlop={8}>
      <AppText size={size} bold={bold} tone="accent" align={align} style={style}>
        {label}
      </AppText>
    </Pressable>
  );
}
