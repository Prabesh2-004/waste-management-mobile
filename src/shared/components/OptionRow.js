import React from 'react';
import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import AppText from './AppText';

export default function OptionRow({
  label,
  selected,
  onPress,
  type = 'radio',
  padding = 13,
  minHeight = 54,
  centered = false,
  style,
}) {
  const colors = useTheme();
  const checkbox = type === 'checkbox';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={checkbox ? 'checkbox' : 'radio'}
      accessibilityState={{ checked: selected }}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: centered ? 'center' : 'flex-start',
          gap: 12,
          padding,
          minHeight,
          marginTop: 8,
          borderWidth: 2,
          borderColor: colors.line,
          borderRadius: 12,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {checkbox ? (
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: selected ? colors.accent : colors.muted,
            backgroundColor: selected ? colors.accent : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selected ? <Check size={15} color={colors.white} strokeWidth={3} /> : null}
        </View>
      ) : (
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: selected ? colors.accent : colors.muted,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selected ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accent }} /> : null}
        </View>
      )}
      <AppText style={{ flexShrink: 1 }}>{label}</AppText>
    </Pressable>
  );
}
