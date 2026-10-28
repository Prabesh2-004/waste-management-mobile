import React from 'react';
import { View } from 'react-native';
import PageHeader from '../../../shared/components/PageHeader';
import { useDriver } from '../store/DriverContext';
import RouteDetail from '../components/RouteDetail';
import ScheduleList from '../components/ScheduleList';

export default function CollectionScreen() {
  const { routes, selectedRoute } = useDriver();
  const route = selectedRoute ? routes.find((item) => item.number === selectedRoute) : null;

  if (route) return <RouteDetail route={route} />;

  return (
    <View>
      <PageHeader title="My Collection" subtitle="Today's schedule" />
      <ScheduleList />
    </View>
  );
}
