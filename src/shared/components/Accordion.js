import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import AppText from './AppText';

export default function Accordion({ title, body }) {
  const colors = useTheme();
  const [open, setOpen] = useState(false);
  const Chevron = open ? ChevronDown : ChevronRight;
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: colors.line, paddingVertical: 12, paddingHorizontal: 4 }}>
      <Pressable
        onPress={() => setOpen(!open)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, minHeight: 28 }}
      >
        <AppText weight="600" style={{ flexShrink: 1 }}>
          {title}
        </AppText>
        <Chevron size={20} color={colors.muted} />
      </Pressable>
      {open ? (
        <AppText tone="muted" style={{ marginTop: 14 }}>
          {body}
        </AppText>
      ) : null}
    </View>
  );
}
