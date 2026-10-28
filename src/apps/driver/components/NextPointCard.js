import React from 'react';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import FocusCard from '../../../shared/components/FocusCard';
import routeMap from '../../../data/driver/routeMap.json';
import { addMinutes } from '../utils/formatTime';

export default function NextPointCard({ route }) {
  const done = route.areasDone;
  const finished = done >= 5;
  const next = route.areas[Math.min(done, 4)];
  const expected = addMinutes(route.time, routeMap.stepMinutes * (done + 1));

  return (
    <FocusCard>
      <AppText size={30} weight="700" leading={1.2}>
        {finished ? 'All areas done' : next}
      </AppText>
      <AppText>
        Expected: <Bold>{finished ? '—' : expected}</Bold>
      </AppText>
      <AppText>
        Waste: <Bold>{route.waste}</Bold>
      </AppText>
    </FocusCard>
  );
}
