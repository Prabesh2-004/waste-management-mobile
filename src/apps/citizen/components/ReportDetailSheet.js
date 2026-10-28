import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import AlertBox from '../../../shared/components/AlertBox';
import Row from '../../../shared/components/Row';
import SectionTitle from '../../../shared/components/SectionTitle';
import messages from '../../../data/citizen/messages.json';
import reportConfig from '../../../data/citizen/reportConfig.json';
import { useCitizen } from '../store/CitizenContext';

export default function ReportDetailSheet({ reportId }) {
  const { reports, user } = useCitizen();
  const report = reports.find((item) => item.id === reportId);
  if (!report) return null;
  const reached = reportConfig.steps.indexOf(report.status);

  return (
    <View>
      <AppText variant="h1">{report.type}</AppText>
      <AppText tone="muted" style={{ marginVertical: 17 }}>
        Ward {user.ward} · Submitted {report.date.toLowerCase()}
      </AppText>
      {report.note ? <AppText style={{ marginBottom: 17 }}>{`"${report.note}"`}</AppText> : null}
      <SectionTitle>Status</SectionTitle>
      {reportConfig.steps.map((step, index) => {
        const done = index <= reached;
        return (
          <Row key={step}>
            <AppText weight={done ? '700' : undefined} tone={done ? 'green' : 'muted'}>
              {done ? '✓' : '○'} {step}
            </AppText>
          </Row>
        );
      })}
      {report.status === 'Waiting to send' ? <AlertBox>{messages.offlineSaved}</AlertBox> : null}
    </View>
  );
}
