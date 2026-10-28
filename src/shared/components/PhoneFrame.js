import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { FRAME_MAX_WIDTH } from '../hooks/useLayout';

export default function PhoneFrame({ children }) {
  const colors = useTheme();
  return (
    <View style={[styles.page, { backgroundColor: colors.bg }]}>
      <View style={[styles.frame, { backgroundColor: colors.surface, borderColor: colors.line }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: FRAME_MAX_WIDTH,
    alignSelf: 'center',
    overflow: 'hidden',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
