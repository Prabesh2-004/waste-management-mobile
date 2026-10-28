import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import FocusCard from '../../../shared/components/FocusCard';
import profile from '../../../data/driver/profile.json';
import { useDriver } from '../store/DriverContext';
import { formatTime } from '../utils/formatTime';
import DriverButton from './DriverButton';
import StatusLabel from './StatusLabel';

export default function CurrentCollectionCard() {
  const { user, currentRoute, startCollection, openRoute } = useDriver();

  if (!currentRoute) {
    return (
      <FocusCard>
        <AppText size={30} weight="700" tone="green" leading={1.2}>
          ✓ ALL COLLECTIONS DONE
        </AppText>
        <AppText tone="muted" style={{ marginVertical: 17 }}>
          Thank you, {user.name.split(' ')[0]}. Today's work is submitted.
        </AppText>
      </FocusCard>
    );
  }

  const route = currentRoute;
  const label = route.status === 'Upcoming' ? 'NEXT COLLECTION' : 'CURRENT COLLECTION';
  const action = route.status === 'Upcoming' ? 'START COLLECTION' : route.status === 'Delayed' ? 'RESUME COLLECTION' : 'CONTINUE COLLECTION';
  const press = () => (route.status === 'In Progress' ? openRoute(route.number) : startCollection(route.number));

  return (
    <View>
      <FocusCard>
        <AppText size={14} tone="muted">
          {label}
        </AppText>
        <AppText size={30} weight="700" leading={1.2}>
          Ward {profile.ward} · Route {route.number}
        </AppText>
        <AppText size={22} style={{ marginVertical: 4 }}>
          {formatTime(route.time)}
        </AppText>
        <AppText>
          Waste: <Bold>{route.waste}</Bold>
        </AppText>
        <View style={{ marginTop: 6, flexDirection: 'row' }}>
          <StatusLabel status={route.status} />
        </View>
      </FocusCard>
      <DriverButton label={action} onPress={press} />
    </View>
  );
}
