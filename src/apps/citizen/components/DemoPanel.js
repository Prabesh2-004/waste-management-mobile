import React from 'react';
import AppText from '../../../shared/components/AppText';
import BigButton from '../../../shared/components/BigButton';
import FocusCard from '../../../shared/components/FocusCard';
import simulations from '../../../data/citizen/simulations.json';
import { useCitizen } from '../store/CitizenContext';

export default function DemoPanel() {
  const { simulate } = useCitizen();
  return (
    <FocusCard style={{ marginTop: 8 }}>
      <AppText size={14} tone="muted">
        Shows what citizens see when others act
      </AppText>
      {simulations.map((action) => (
        <BigButton
          key={action.id}
          variant="outline"
          label={action.label}
          minHeight={46}
          fontSize={16}
          marginTop={6}
          onPress={() => simulate(action.id)}
        />
      ))}
    </FocusCard>
  );
}
