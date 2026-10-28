import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import BigButton from '../../../shared/components/BigButton';
import OptionRow from '../../../shared/components/OptionRow';
import Select from '../../../shared/components/Select';
import { useSheet } from '../../../shared/components/Sheet';
import dictionary from '../../../data/citizen/dictionary.json';
import initial from '../../../data/citizen/initialState.json';
import { useCitizen } from '../store/CitizenContext';

export default function ProfileSheet() {
  const { closeSheet } = useSheet();
  const { user, lang, setLang, pushEnabled, setPushEnabled, signOut } = useCitizen();

  return (
    <View>
      <AppText variant="h1">{user.name}</AppText>
      <AppText tone="muted" style={{ marginVertical: 17 }}>
        {user.phone}
        {user.email ? ` · ${user.email}` : ''}
        {'\n'}Ward {user.ward} · {initial.area}
      </AppText>
      <Select
        label="Language"
        value={lang}
        options={dictionary.languages}
        onChange={(value) => {
          setLang(value);
          closeSheet();
        }}
      />
      <OptionRow
        type="checkbox"
        label="Collection alerts"
        selected={pushEnabled}
        onPress={() => setPushEnabled(!pushEnabled)}
        style={{ marginTop: 12 }}
      />
      <BigButton
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
