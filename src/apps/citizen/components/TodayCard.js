import React from 'react';
import AppText from '../../../shared/components/AppText';
import FocusCard from '../../../shared/components/FocusCard';
import schedule from '../../../data/citizen/schedule.json';
import { useCitizen } from '../store/CitizenContext';
import StatusLine from './StatusLine';

export default function TodayCard() {
  const { status, timeSlot } = useCitizen();
  return (
    <FocusCard>
      <AppText size={14} tone="muted">
        {schedule.organicName}
      </AppText>
      <AppText size={28} weight="700" leading={1.2}>
        {timeSlot}
      </AppText>
      <StatusLine status={status} size={22} translated style={{ marginTop: 8 }} />
    </FocusCard>
  );
}
