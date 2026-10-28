import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import { useTheme } from '../../../shared/theme/ThemeProvider';

export default function ChatBubble({ message }) {
  const colors = useTheme();
  const bot = message.bot;
  return (
    <View
      style={{
        alignSelf: bot ? 'flex-start' : 'flex-end',
        maxWidth: '88%',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 14,
        marginVertical: 6,
        backgroundColor: bot ? colors.tint : colors.accent,
      }}
    >
      <AppText size={16} tone={bot ? 'ink' : 'white'}>
        {message.text}
      </AppText>
    </View>
  );
}
