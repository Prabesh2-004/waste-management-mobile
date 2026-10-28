import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function ProgressBar({ ratio, style }) {
  const colors = useTheme();
  const percent = Math.max(0, Math.min(1, ratio)) * 100;
  return (
    <View style={[{ height: 10, backgroundColor: colors.line, borderRadius: 5, overflow: 'hidden' }, style]}>
      <View style={{ height: '100%', width: `${percent}%`, backgroundColor: colors.accent }} />
    </View>
  );
}
