import React from 'react';
import { View } from 'react-native';
import TopBar from '../../../shared/components/TopBar';
import AppText from '../../../shared/components/AppText';
import Chip from '../../../shared/components/Chip';
import Avatar from '../../../shared/components/Avatar';
import { useSheet } from '../../../shared/components/Sheet';
import profile from '../../../data/driver/profile.json';
import { useDriver } from '../store/DriverContext';
import ProfileSheet from './ProfileSheet';

export default function DriverTopBar() {
  const { openSheet } = useSheet();
  const { user, offline, queued, toggleOffline } = useDriver();
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <TopBar>
      <Avatar letters={initials} label="Account" onPress={() => openSheet(<ProfileSheet />)} />
      <View style={{ flex: 1 }}>
        <AppText bold numberOfLines={1}>
          {user.name}
        </AppText>
        <AppText size={14} tone="muted" numberOfLines={1}>
          Driver · {user.vehicle} · Ward {profile.ward}
        </AppText>
      </View>
      <Chip label={offline ? `⚠ No signal${queued ? ` (${queued})` : ''}` : '● Online'} onPress={toggleOffline} />
    </TopBar>
  );
}
