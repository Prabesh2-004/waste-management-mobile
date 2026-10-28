import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Row from '../../../shared/components/Row';
import { useCitizen } from '../store/CitizenContext';

export default function NotificationsSheet() {
  const { notifications } = useCitizen();
  return (
    <View>
      <AppText variant="h1">Notifications</AppText>
      {notifications.slice(0, 6).map((item, index) => (
        <Row key={`${item.when}-${index}`}>
          <AppText style={{ flexShrink: 1 }}>{item.text}</AppText>
          <AppText size={14} tone="muted">
            {item.when}
          </AppText>
        </Row>
      ))}
    </View>
  );
}
