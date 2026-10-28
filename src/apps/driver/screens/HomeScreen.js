import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import AlertBox from '../../../shared/components/AlertBox';
import LinkText from '../../../shared/components/LinkText';
import PageHeader from '../../../shared/components/PageHeader';
import SectionTitle from '../../../shared/components/SectionTitle';
import profile from '../../../data/driver/profile.json';
import { useDriver } from '../store/DriverContext';
import { formatTime } from '../utils/formatTime';
import CurrentCollectionCard from '../components/CurrentCollectionCard';
import DriverRow from '../components/DriverRow';

const glyphs = { Completed: '✓', 'In Progress': '●', Delayed: '⚠' };

export default function HomeScreen() {
  const { user, routes, alerts, openRoute, simulateWardChange } = useDriver();
  const visibleAlerts = alerts.slice(0, 2);

  return (
    <View>
      <PageHeader
        title={`Good morning, ${user.name.split(' ')[0]}`}
        subtitle={`${profile.dateLabel} · Vehicle ${user.vehicle}`}
      />
      <View style={{ marginTop: 16 }}>
        <CurrentCollectionCard />
      </View>
      {visibleAlerts.length ? (
        <>
          <SectionTitle>Alerts</SectionTitle>
          {visibleAlerts.map((item, index) => (
            <AlertBox key={item.id} style={{ marginTop: index === 0 ? 0 : 8 }}>
              {item.text}
            </AlertBox>
          ))}
        </>
      ) : null}
      <SectionTitle>Today's routes</SectionTitle>
      {routes.map((route) => (
        <DriverRow key={route.number} onPress={() => openRoute(route.number)}>
          <AppText>
            {glyphs[route.status] || '○'} Route {route.number}
          </AppText>
          <AppText tone="muted">{formatTime(route.time)}</AppText>
        </DriverRow>
      ))}
      <View style={{ marginTop: 20, marginBottom: 17 }}>
        <LinkText size={14} label="Demo: simulate Ward changing Route 3 to 9:30 AM" onPress={simulateWardChange} />
      </View>
    </View>
  );
}
