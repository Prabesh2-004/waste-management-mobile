import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import useLayout from '../hooks/useLayout';

export default function BottomNav({ items, active, onSelect, labelSize = 12, paddingVertical = 8 }) {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const { scale } = useLayout();

  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.surface, paddingBottom: insets.bottom }}>
      {items.map((item) => {
        const on = item.key === active;
        const Icon = item.icon;
        const tint = on ? colors.accent : colors.muted;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            style={{
              flex: 1,
              minHeight: 56,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 2,
              paddingVertical,
              borderTopWidth: on ? 3 : 1,
              borderTopColor: on ? colors.accent : colors.line,
            }}
          >
            {Icon ? <Icon size={20 * scale} color={tint} /> : null}
            <Text
              numberOfLines={1}
              style={{
                color: tint,
                fontSize: labelSize * scale,
                fontWeight: on ? '700' : '400',
                marginTop: Icon ? 3 : 0,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
