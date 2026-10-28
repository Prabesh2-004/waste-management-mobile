import React, { useState } from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import BigButton from '../../../shared/components/BigButton';
import Field from '../../../shared/components/Field';
import { useCitizen } from '../store/CitizenContext';
import { findWasteItem } from '../utils/wasteLookup';
import WasteCard from './WasteCard';

export default function WasteSearch() {
  const { setPage } = useCitizen();
  const [query, setQuery] = useState('');
  const trimmed = query.trim();
  const result = trimmed ? findWasteItem(query) : null;

  return (
    <View>
      <Field value={query} onChangeText={setQuery} placeholder="e.g. old clothes" />
      {trimmed ? (
        result ? (
          <WasteCard item={result} />
        ) : (
          <>
            <AppText tone="muted" style={{ marginVertical: 17 }}>
              We could not find that item. Try another word or ask the helper.
            </AppText>
            <BigButton variant="outline" label="Ask the helper" marginTop={0} onPress={() => setPage('help')} />
          </>
        )
      ) : null}
    </View>
  );
}
