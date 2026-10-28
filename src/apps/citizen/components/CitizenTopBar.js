import React from 'react';
import { Pressable, View } from 'react-native';
import { Bell } from 'lucide-react-native';
import TopBar from '../../../shared/components/TopBar';
import AppText from '../../../shared/components/AppText';
import Chip from '../../../shared/components/Chip';
import Avatar from '../../../shared/components/Avatar';
import { useSheet } from '../../../shared/components/Sheet';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import initial from '../../../data/citizen/initialState.json';
import { useCitizen } from '../store/CitizenContext';
import NotificationsSheet from './NotificationsSheet';
import ProfileSheet from './ProfileSheet';

export default function CitizenTopBar() {
  const colors = useTheme();
  const { openSheet } = useSheet();
  const { user, offline, queued, toggleOffline, unseenCount, markNotificationsSeen } = useCitizen();

  const openNotifications = () => {
    markNotificationsSeen();
    openSheet(<NotificationsSheet />);
  };

  return (
    <TopBar>
      <View style={{ flex: 1 }}>
        <AppText bold>Ward {user.ward}</AppText>
        <AppText size={14} tone="muted">
          {initial.area} · {initial.city}
        </AppText>
      </View>
      <Chip label={offline ? `⚠ Offline${queued ? ` (${queued})` : ''}` : '● Online'} onPress={toggleOffline} />
      <Pressable
        onPress={openNotifications}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
      >
        <Bell size={22} color={colors.ink} />
        {unseenCount > 0 ? (
          <View
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              minWidth: 18,
              paddingHorizontal: 5,
              borderRadius: 9,
              backgroundColor: colors.red,
              alignItems: 'center',
            }}
          >
            <AppText size={11} bold tone="white" leading={1.3}>
              {unseenCount}
            </AppText>
          </View>
        ) : null}
      </Pressable>
      <Avatar letters={user.name[0]} onPress={() => openSheet(<ProfileSheet />)} />
    </TopBar>
  );
}
