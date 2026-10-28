import React, { useState } from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import Field from '../../../shared/components/Field';
import OptionRow from '../../../shared/components/OptionRow';
import { useSheet } from '../../../shared/components/Sheet';
import issueOptions from '../../../data/driver/issueOptions.json';
import { useDriver } from '../store/DriverContext';
import DriverButton from './DriverButton';

export default function IssueSheet({ kind }) {
  const { closeSheet } = useSheet();
  const { user, reportIssue } = useDriver();
  const options = issueOptions[kind];
  const [option, setOption] = useState(options[0]);
  const [note, setNote] = useState('');
  const [photoAdded, setPhotoAdded] = useState(false);

  const submit = () => {
    closeSheet();
    reportIssue(kind, option);
  };

  return (
    <View>
      <AppText variant="h1">{kind} problem</AppText>
      {kind === 'Vehicle' ? (
        <AppText tone="muted" style={{ marginVertical: 17 }}>
          Vehicle: <Bold>{user.vehicle}</Bold>
        </AppText>
      ) : null}
      {options.map((item) => (
        <OptionRow
          key={item}
          label={item}
          selected={option === item}
          onPress={() => setOption(item)}
          padding={14}
          minHeight={56}
        />
      ))}
      <Field
        labelGap={14}
        label="Note (optional)"
        value={note}
        onChangeText={setNote}
        placeholder="Describe problem"
        autoCapitalize="sentences"
      />
      <DriverButton variant="outline" label={photoAdded ? '✓ Photo added' : 'Add photo'} onPress={() => setPhotoAdded(true)} />
      <DriverButton label="SUBMIT REPORT" onPress={submit} />
    </View>
  );
}
