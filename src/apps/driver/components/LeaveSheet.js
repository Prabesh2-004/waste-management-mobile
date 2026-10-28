import React, { useState } from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Field from '../../../shared/components/Field';
import Select from '../../../shared/components/Select';
import { useSheet } from '../../../shared/components/Sheet';
import leaveForm from '../../../data/driver/leaveForm.json';
import { useDriver } from '../store/DriverContext';
import DriverButton from './DriverButton';

export default function LeaveSheet() {
  const { closeSheet } = useSheet();
  const { submitLeave } = useDriver();
  const [date, setDate] = useState(leaveForm.defaultDate);
  const [reason, setReason] = useState(leaveForm.reasons[0]);
  const [note, setNote] = useState('');

  const submit = () => {
    closeSheet();
    submitLeave(reason, date);
  };

  return (
    <View>
      <AppText variant="h1">Leave / absence</AppText>
      <Field labelGap={14} label="Date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" keyboardType="numbers-and-punctuation" />
      <Select labelGap={14} label="Reason" value={reason} options={leaveForm.reasons} onChange={setReason} />
      <Field labelGap={14} label="Note (optional)" value={note} onChangeText={setNote} autoCapitalize="sentences" />
      <DriverButton label="SUBMIT" onPress={submit} />
    </View>
  );
}
