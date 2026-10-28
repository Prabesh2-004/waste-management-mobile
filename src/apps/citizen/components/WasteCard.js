import React from 'react';
import AppText from '../../../shared/components/AppText';
import FocusCard from '../../../shared/components/FocusCard';

export default function WasteCard({ item }) {
  return (
    <FocusCard style={{ marginTop: 12 }}>
      <AppText size={28} weight="700" leading={1.2}>
        {item.name}
      </AppText>
      <AppText weight="700" tone={item.tone} style={{ marginVertical: 6 }}>
        Category: {item.category}
      </AppText>
      <AppText weight="700">What to do</AppText>
      <AppText style={{ marginTop: 4 }}>{item.action}</AppText>
    </FocusCard>
  );
}
