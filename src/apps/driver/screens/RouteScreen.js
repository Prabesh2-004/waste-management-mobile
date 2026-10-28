import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import PageHeader from '../../../shared/components/PageHeader';
import ProgressBar from '../../../shared/components/ProgressBar';
import SectionTitle from '../../../shared/components/SectionTitle';
import { useSheet } from '../../../shared/components/Sheet';
import profile from '../../../data/driver/profile.json';
import { useDriver } from '../store/DriverContext';
import DriverButton from '../components/DriverButton';
import IssueSheet from '../components/IssueSheet';
import NextPointCard from '../components/NextPointCard';
import RouteMap from '../components/RouteMap';

export default function RouteScreen() {
  const { openSheet } = useSheet();
  const { routes, currentRoute, collectArea, openRoute } = useDriver();
  const route = currentRoute || routes[3];
  const done = route.areasDone;

  return (
    <View>
      <PageHeader title="Route & Tracking" subtitle={`Ward ${profile.ward} · Route ${route.number}`} />
      <View style={{ marginTop: 12 }}>
        <RouteMap route={route} />
      </View>
      <SectionTitle>{route.status === 'Upcoming' ? 'First' : 'Next'} collection point</SectionTitle>
      <NextPointCard route={route} />
      <SectionTitle>Route progress</SectionTitle>
      <AppText>
        <Bold>{done} of 5 collection areas completed</Bold>
      </AppText>
      <ProgressBar ratio={done / 5} style={{ marginTop: 8 }} />
      {route.status === 'In Progress' && done < 5 ? (
        <DriverButton label="ARRIVED · AREA COLLECTED" onPress={() => collectArea(route.number)} />
      ) : null}
      {route.status === 'In Progress' && done >= 5 ? (
        <DriverButton label="GO TO END COLLECTION" onPress={() => openRoute(route.number)} />
      ) : null}
      <DriverButton variant="outline" label="REPORT ROUTE ISSUE" onPress={() => openSheet(<IssueSheet kind="Route" />)} />
    </View>
  );
}
