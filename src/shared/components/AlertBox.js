import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import AppText from './AppText';

export default function AlertBox({ children, color = 'amber', background, style }) {
  const colors = useTheme();
  return (
    <View
      style={[
        {
          borderLeftWidth: 5,
          borderLeftColor: colors[color],
          backgroundColor: background ? colors[background] : colors.alertBg,
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 8,
          marginTop: 12,
        },
        style,
      ]}
    >
      {typeof children === 'string' ? <AppText size={16}>{children}</AppText> : children}
    </View>
  );
}
