import React from 'react';
import { View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import Row from '../../../shared/components/Row';
import { useTheme } from '../../../shared/theme/ThemeProvider';

export default function ProgramRow({ program, onPress, last }) {
  const colors = useTheme();
  return (
    <Row onPress={onPress} last={last}>
      <View style={{ flexShrink: 1 }}>
        <AppText>
          <Bold>{program.name}</Bold>
        </AppText>
        <AppText size={14} tone="muted">
          {program.date} · {program.location}
        </AppText>
      </View>
      {program.done ? (
        <ChevronRight size={20} color={colors.muted} />
      ) : program.registered ? (
        <AppText weight="700" tone="green">
          Registered ✓
        </AppText>
      ) : (
        <AppText weight="700" tone="accent">
          Register
        </AppText>
      )}
    </Row>
  );
}
