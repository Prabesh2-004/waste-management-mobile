import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import BigButton from '../../../shared/components/BigButton';
import { useSheet } from '../../../shared/components/Sheet';
import { useCitizen } from '../store/CitizenContext';

export default function ProgramDetailSheet({ programId }) {
  const { closeSheet } = useSheet();
  const { programs, setProgramRegistration } = useCitizen();
  const program = programs.find((item) => item.id === programId);
  if (!program) return null;

  const change = (registered) => {
    closeSheet();
    setProgramRegistration(program.id, registered);
  };

  return (
    <View>
      <AppText variant="h1">{program.name}</AppText>
      <AppText tone="muted" style={{ marginVertical: 17 }}>
        {program.date}
        {'\n'}
        {program.location}
        {'\n'}Organized by {program.organizer}
      </AppText>
      <AppText>{program.description}</AppText>
      {program.done ? (
        <AppText weight="700" tone="green" style={{ marginTop: 17 }}>
          ✓ This program has been held.
        </AppText>
      ) : program.registered ? (
        <>
          <AppText weight="700" tone="green" style={{ marginTop: 17 }}>
            Registered ✓
          </AppText>
          <BigButton variant="outline" label="Cancel registration" onPress={() => change(false)} />
        </>
      ) : (
        <BigButton label="Register" onPress={() => change(true)} />
      )}
    </View>
  );
}
