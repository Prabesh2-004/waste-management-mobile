import React from 'react';
import AppText from './AppText';

export default function SectionTitle({ children, style }) {
  return (
    <AppText variant="h2" style={style} accessibilityRole="header">
      {children}
    </AppText>
  );
}
