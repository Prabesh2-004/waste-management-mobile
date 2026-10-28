import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import profile from '../../../data/driver/profile.json';
import { useDriver } from '../store/DriverContext';
import { formatTime } from '../utils/formatTime';
import DriverRow from './DriverRow';
import StatusLabel from './StatusLabel';

export default function ScheduleList() {
  const { routes, setSelectedRoute } = useDriver();
  const sorted = routes.slice().sort((a, b) => a.time.localeCompare(b.time));

  return (
    <View style={{ marginTop: 12 }}>
      {sorted.map((route, index) => (
        <DriverRow key={route.number} last={index === sorted.length - 1} onPress={() => setSelectedRoute(route.number)}>
          <AppText style={{ flexShrink: 1 }}>
            <Bold>{formatTime(route.time)}</Bold>
            {'\n'}Ward {profile.ward} — Route {route.number}
          </AppText>
          <StatusLabel status={route.status} />
        </DriverRow>
      ))}
    </View>
  );
}
