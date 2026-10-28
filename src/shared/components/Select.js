import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { Check, ChevronDown } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import AppText from './AppText';

export default function Select({ label, value, options, onChange, labelGap = 12 }) {
  const colors = useTheme();
  const [open, setOpen] = useState(false);
  const items = options.map((option) =>
    typeof option === 'object' ? option : { value: option, label: String(option) }
  );
  const current = items.find((item) => String(item.value) === String(value));

  const choose = (item) => {
    setOpen(false);
    onChange(item.value);
  };

  return (
    <View>
      {label ? (
        <AppText size={14} tone="muted" style={{ marginTop: labelGap, marginBottom: 4 }}>
          {label}
        </AppText>
      ) : null}
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          paddingVertical: 14,
          paddingHorizontal: 14,
          borderWidth: 2,
          borderColor: colors.line,
          borderRadius: 12,
          backgroundColor: colors.surface,
        }}
      >
        <AppText style={{ flexShrink: 1 }}>{current ? current.label : ''}</AppText>
        <ChevronDown size={20} color={colors.muted} />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" statusBarTranslucent onRequestClose={() => setOpen(false)}>
        <Pressable
          onPress={() => setOpen(false)}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.overlay }}
        >
          <Pressable
            onPress={() => {}}
            style={{
              width: '100%',
              maxWidth: 380,
              maxHeight: '70%',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.line,
              backgroundColor: colors.surface,
              overflow: 'hidden',
            }}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              {items.map((item, index) => {
                const selected = String(item.value) === String(value);
                return (
                  <Pressable
                    key={String(item.value)}
                    onPress={() => choose(item)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 8,
                      minHeight: 52,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderBottomWidth: index === items.length - 1 ? 0 : 1,
                      borderBottomColor: colors.line,
                      backgroundColor: pressed ? colors.tint : 'transparent',
                    })}
                  >
                    <AppText bold={selected} tone={selected ? 'accent' : 'ink'} style={{ flexShrink: 1 }}>
                      {item.label}
                    </AppText>
                    {selected ? <Check size={20} color={colors.accent} /> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
