import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import { useSheet } from '../../../shared/components/Sheet';
import { useDriver } from '../store/DriverContext';
import DriverButton from './DriverButton';

export default function ProgramDetailSheet({ programId }) {
  const { closeSheet } = useSheet();
  const { programs, registerProgram } = useDriver();
  const program = programs.find((item) => item.id === programId);
  if (!program) return null;

  return (
    <View>
      <AppText variant="h1">{program.name}</AppText>
      <AppText tone="muted" style={{ marginVertical: 17 }}>
        {program.date} · {program.time}
        {'\n'}
        {program.location} · Organized by {program.organizer}
      </AppText>
      <AppText>{program.description}</AppText>
      {program.registered ? (
        <AppText weight="600" tone="green" style={{ marginTop: 17 }}>
          ✓ Registered. Attendance will be recorded at the event.
        </AppText>
      ) : (
        <DriverButton
          label="REGISTER"
          onPress={() => {
            closeSheet();
            registerProgram(program.id);
          }}
        />
      )}
    </View>
  );
}
