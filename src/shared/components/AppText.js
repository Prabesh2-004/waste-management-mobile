import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import useLayout from '../hooks/useLayout';

const VARIANTS = {
  body: { size: 17 },
  small: { size: 14 },
  h1: { size: 24, weight: '700', marginBottom: 4 },
  h2: { size: 14, weight: '600', tone: 'muted', marginTop: 22, marginBottom: 8, upper: true, spacing: 0.7 },
};

export default function AppText({
  variant = 'body',
  size,
  tone,
  bold,
  weight,
  align,
  leading = 1.45,
  style,
  children,
  ...rest
}) {
  const colors = useTheme();
  const { scale } = useLayout();
  const preset = VARIANTS[variant];
  const fontSize = (size || preset.size) * scale;
  const textStyle = {
    color: colors[tone || preset.tone || 'ink'],
    fontSize,
    lineHeight: fontSize * leading,
    fontWeight: weight || (bold ? '700' : preset.weight),
    marginTop: preset.marginTop,
    marginBottom: preset.marginBottom,
    letterSpacing: preset.spacing,
    textTransform: preset.upper ? 'uppercase' : undefined,
    textAlign: align,
  };
  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
}
