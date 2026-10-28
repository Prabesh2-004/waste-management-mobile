import React, { useState } from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import BigButton from '../../../shared/components/BigButton';
import Field from '../../../shared/components/Field';
import OptionRow from '../../../shared/components/OptionRow';
import { useSheet } from '../../../shared/components/Sheet';
import reportConfig from '../../../data/citizen/reportConfig.json';
import { useCitizen } from '../store/CitizenContext';

export default function ReportFormSheet({ preset = '' }) {
  const { closeSheet } = useSheet();
  const { submitReport } = useCitizen();
  const [type, setType] = useState(preset || reportConfig.types[0]);
  const [area, setArea] = useState(reportConfig.defaultArea);
  const [description, setDescription] = useState('');
  const [photoAdded, setPhotoAdded] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    if (type === 'Other' && !description.trim()) {
      setError('Please describe the problem.');
      return;
    }
    closeSheet();
    submitReport({ type, note: description });
  };

  return (
    <View>
      <AppText variant="h1">Report a problem</AppText>
      {reportConfig.types.map((option) => (
        <OptionRow key={option} label={option} selected={type === option} onPress={() => setType(option)} />
      ))}
      <Field label="Area" value={area} onChangeText={setArea} autoCapitalize="words" />
      <Field
        label="Short description"
        value={description}
        onChangeText={setDescription}
        placeholder="What happened?"
        autoCapitalize="sentences"
      />
      <BigButton
        variant="outline"
        label={photoAdded ? '✓ Photo added' : 'Add photo (optional)'}
        onPress={() => setPhotoAdded(true)}
      />
      {error ? (
        <AppText size={14} tone="red" style={{ marginTop: 6 }}>
          {error}
        </AppText>
      ) : null}
      <BigButton label="Submit report" onPress={submit} />
    </View>
  );
}
