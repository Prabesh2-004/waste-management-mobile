import React from 'react';
import { View } from 'react-native';
import Svg from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';

export default function MapFrame({ width, height, label, children }) {
  const colors = useTheme();
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}
      style={{
        width: '100%',
        aspectRatio: width / height,
        backgroundColor: colors.tint,
        borderRadius: 14,
        overflow: 'hidden',
      }}
    >
      <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        {children}
      </Svg>
    </View>
  );
}
