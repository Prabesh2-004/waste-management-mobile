import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import FocusCard from '../../../shared/components/FocusCard';
import LinkText from '../../../shared/components/LinkText';
import { useSheet } from '../../../shared/components/Sheet';
import profile from '../../../data/driver/profile.json';
import statuses from '../../../data/driver/statuses.json';
import { useDriver } from '../store/DriverContext';
import { formatTime } from '../utils/formatTime';
import DriverButton from './DriverButton';
import DriverRow from './DriverRow';
import EndCollectionSheet from './EndCollectionSheet';
import StatusLabel from './StatusLabel';

function DetailRow({ label, children }) {
  return (
    <DriverRow>
      <AppText tone="muted">{label}</AppText>
      {children}
    </DriverRow>
  );
}

export default function RouteDetail({ route }) {
  const { openSheet } = useSheet();
  const { user, startCollection, setSelectedRoute } = useDriver();

  let action;
  if (route.status === 'Upcoming') {
    action = <DriverButton label="START COLLECTION" onPress={() => startCollection(route.number)} />;
  } else if (route.status === 'In Progress') {
    action = <DriverButton label="END COLLECTION" onPress={() => openSheet(<EndCollectionSheet routeNumber={route.number} />)} />;
  } else if (route.status === 'Delayed') {
    action = <DriverButton label="RESUME COLLECTION" onPress={() => startCollection(route.number)} />;
  } else {
    const weight = route.weight ? ` · ${route.weight} kg (${(route.weight / 1000).toFixed(2)} t)` : '';
    action = (
      <AppText weight="700" tone="green" style={{ marginVertical: 17 }}>
        {statuses[route.status].icon} {route.status}
        {weight}
      </AppText>
    );
  }

  return (
    <View>
      <LinkText size={14} label="← Today's schedule" onPress={() => setSelectedRoute(null)} />
      <AppText variant="h1" style={{ marginTop: 8 }}>
        Route {route.number}
      </AppText>
      <FocusCard style={{ marginVertical: 12 }}>
        <AppText size={14} tone="muted">
          TODAY'S WASTE
        </AppText>
        <AppText size={30} weight="700" leading={1.2}>
          ♻️ {route.waste}
        </AppText>
      </FocusCard>
      <DetailRow label="Ward">
        <AppText bold>{profile.ward}</AppText>
      </DetailRow>
      <DetailRow label="Collection time">
        <AppText bold>{formatTime(route.time)}</AppText>
      </DetailRow>
      <DetailRow label="Vehicle">
        <AppText bold>{user.vehicle}</AppText>
      </DetailRow>
      <DetailRow label="Driver">
        <AppText bold>{user.name}</AppText>
      </DetailRow>
      <DetailRow label="Status">
        <StatusLabel status={route.status} />
      </DetailRow>
      {action}
    </View>
  );
}
