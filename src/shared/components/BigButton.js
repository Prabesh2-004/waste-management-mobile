import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import useLayout from '../hooks/useLayout';

export default function BigButton({
  label,
  onPress,
  variant = 'primary',
  icon: Icon,
  minHeight = 58,
  fontSize = 18,
  marginTop = 12,
  style,
}) {
  const colors = useTheme();
  const { scale } = useLayout();
  const outline = variant === 'outline';
  const background = outline ? 'transparent' : variant === 'danger' ? colors.red : colors.accent;
  const foreground = outline ? colors.ink : colors.white;
  const size = fontSize * scale;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        {
          minHeight,
          marginTop,
          backgroundColor: background,
          borderColor: colors.line,
          borderWidth: outline ? 2 : 0,
          borderRadius: 14,
          paddingHorizontal: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {Icon ? <Icon size={size * 1.1} color={foreground} /> : null}
      <Text style={{ color: foreground, fontSize: size, fontWeight: '700', textAlign: 'center', flexShrink: 1 }}>
        {label}
      </Text>
    </Pressable>
  );
}
