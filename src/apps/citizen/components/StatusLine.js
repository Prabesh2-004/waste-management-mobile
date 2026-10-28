import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import icons from '../../../shared/icons';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import statuses from '../../../data/citizen/statuses.json';
import { useCitizen } from '../store/CitizenContext';

export default function StatusLine({ status, label, size = 17, translated = false, style }) {
  const colors = useTheme();
  const { translate } = useCitizen();
  const meta = statuses[status];
  const Icon = icons[meta.icon];
  const text = label || (translated ? translate(meta.label) : meta.label);

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }, style]}>
      <Icon size={size} color={colors[meta.tone]} strokeWidth={2.5} />
      <AppText size={size} weight="700" tone={meta.tone} style={{ flexShrink: 1 }}>
        {text}
      </AppText>
    </View>
  );
}
