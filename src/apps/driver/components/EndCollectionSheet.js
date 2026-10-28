import React, { useState } from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Field from '../../../shared/components/Field';
import OptionRow from '../../../shared/components/OptionRow';
import Select from '../../../shared/components/Select';
import { useSheet } from '../../../shared/components/Sheet';
import formConfig from '../../../data/driver/collectionForm.json';
import statuses from '../../../data/driver/statuses.json';
import { useDriver } from '../store/DriverContext';
import DriverButton from './DriverButton';

export default function EndCollectionSheet({ routeNumber }) {
  const { closeSheet } = useSheet();
  const { submitCollection } = useDriver();
  const [weight, setWeight] = useState(formConfig.defaultWeight);
  const [trip, setTrip] = useState(formConfig.trips[0]);
  const [status, setStatus] = useState(formConfig.finishStatuses[0]);
  const [reason, setReason] = useState(formConfig.reasons[0]);
  const [note, setNote] = useState('');

  const submit = () => {
    closeSheet();
    submitCollection(routeNumber, { status, weight, reason });
  };

  return (
    <View>
      <AppText variant="h1">Collection complete?</AppText>
      <Field
        labelGap={14}
        label="Waste collected (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        fontSize={28}
      />
      <AppText size={14} tone="muted" style={{ marginTop: 14, marginBottom: 4 }}>
        Trip
      </AppText>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {formConfig.trips.map((item) => (
          <OptionRow
            key={item}
            label={String(item)}
            selected={trip === item}
            onPress={() => setTrip(item)}
            padding={14}
            minHeight={56}
            centered
            style={{ flex: 1, marginTop: 0 }}
          />
        ))}
      </View>
      <AppText size={14} tone="muted" style={{ marginTop: 14, marginBottom: 4 }}>
        Status
      </AppText>
      {formConfig.finishStatuses.map((item) => (
        <OptionRow
          key={item}
          label={`${statuses[item].icon} ${item}`}
          selected={status === item}
          onPress={() => setStatus(item)}
          padding={14}
          minHeight={56}
        />
      ))}
      {status !== 'Completed' ? (
        <Select labelGap={14} label="Reason" value={reason} options={formConfig.reasons} onChange={setReason} />
      ) : null}
      <Field labelGap={14} label="Note (optional)" value={note} onChangeText={setNote} placeholder="Add note" autoCapitalize="sentences" />
      <DriverButton label="SUBMIT UPDATE" onPress={submit} />
    </View>
  );
}
