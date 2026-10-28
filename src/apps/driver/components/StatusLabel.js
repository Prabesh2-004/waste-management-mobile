import React from 'react';
import AppText from '../../../shared/components/AppText';
import statuses from '../../../data/driver/statuses.json';

export default function StatusLabel({ status }) {
  const meta = statuses[status];
  return (
    <AppText weight="600" tone={meta.tone} style={{ flexShrink: 0 }} numberOfLines={1}>
      {meta.icon} {status}
    </AppText>
  );
}
