import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import messages from '../../../data/citizen/messages.json';

export default function ResetPasswordSheet() {
  return (
    <View>
      <AppText variant="h1">Reset password</AppText>
      <AppText style={{ marginVertical: 17 }}>{messages.resetPassword}</AppText>
    </View>
  );
}
