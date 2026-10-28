import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import { useSheet } from '../../../shared/components/Sheet';
import profile from '../../../data/driver/profile.json';
import { useDriver } from '../store/DriverContext';
import DriverButton from './DriverButton';

export default function ProfileSheet() {
  const { closeSheet } = useSheet();
  const { user, signOut } = useDriver();
  return (
    <View>
      <AppText variant="h1">{user.name}</AppText>
      <AppText tone="muted" style={{ marginVertical: 17 }}>
        Driver · {user.vehicle} · Ward {profile.ward}
      </AppText>
      <DriverButton
        variant="danger"
        label="Log out"
        onPress={() => {
          closeSheet();
          signOut();
        }}
      />
    </View>
  );
}
