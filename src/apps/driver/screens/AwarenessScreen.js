import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import PageHeader from '../../../shared/components/PageHeader';
import { useSheet } from '../../../shared/components/Sheet';
import { useDriver } from '../store/DriverContext';
import DriverRow from '../components/DriverRow';
import ProgramDetailSheet from '../components/ProgramDetailSheet';

export default function AwarenessScreen() {
  const { openSheet } = useSheet();
  const { programs } = useDriver();

  return (
    <View>
      <PageHeader title="Awareness" subtitle="Programs you can join" />
      <View style={{ marginTop: 12 }}>
        {programs.map((program, index) => (
          <DriverRow
            key={program.id}
            last={index === programs.length - 1}
            onPress={() => openSheet(<ProgramDetailSheet programId={program.id} />)}
          >
            <View style={{ flexShrink: 1 }}>
              <AppText>
                <Bold>{program.name}</Bold>
              </AppText>
              <AppText size={14} tone="muted">
                {program.date} · {program.time} · {program.location}
              </AppText>
            </View>
            {program.registered ? (
              <AppText weight="600" tone="green">
                ✓ Registered
              </AppText>
            ) : (
              <AppText weight="600" tone="accent">
                Register
              </AppText>
            )}
          </DriverRow>
        ))}
      </View>
    </View>
  );
}
