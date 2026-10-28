import React from 'react';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import Row from '../../../shared/components/Row';

export default function ScheduleRow({ title, slot, children }) {
  return (
    <Row>
      <AppText style={{ flexShrink: 1 }}>
        <Bold>{title}</Bold>
        {'\n'}
        {slot}
      </AppText>
      {children}
    </Row>
  );
}
