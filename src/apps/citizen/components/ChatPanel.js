import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Chip from '../../../shared/components/Chip';
import Field from '../../../shared/components/Field';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import quickQuestions from '../../../data/citizen/quickQuestions.json';
import { useCitizen } from '../store/CitizenContext';
import ChatBubble from './ChatBubble';

export default function ChatPanel() {
  const colors = useTheme();
  const { chat, ask } = useCitizen();
  const [text, setText] = useState('');
  const visible = chat.slice(-6);
  const offset = chat.length - visible.length;

  const send = (value) => {
    ask(value);
    setText('');
  };

  return (
    <View>
      <View style={{ marginTop: 10 }}>
        {visible.map((message, index) => (
          <ChatBubble key={offset + index} message={message} />
        ))}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 }}>
        {quickQuestions.map((question) => (
          <Pressable
            key={question}
            onPress={() => send(question)}
            accessibilityRole="button"
            style={{
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 16,
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
          >
            <AppText size={14}>{question}</AppText>
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <Field value={text} onChangeText={setText} placeholder="Ask about waste" onSubmitEditing={() => send(text)} />
        </View>
        <Chip label="Send" filled minWidth={64} onPress={() => send(text)} />
      </View>
    </View>
  );
}
