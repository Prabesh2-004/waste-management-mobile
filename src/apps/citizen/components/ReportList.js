import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import Row from '../../../shared/components/Row';
import { useSheet } from '../../../shared/components/Sheet';
import reportConfig from '../../../data/citizen/reportConfig.json';
import { useCitizen } from '../store/CitizenContext';
import ReportDetailSheet from './ReportDetailSheet';

export default function ReportList() {
  const { openSheet } = useSheet();
  const { reports, user } = useCitizen();

  if (!reports.length) return <AppText tone="muted">You have not reported anything.</AppText>;

  return (
    <View>
      {reports.map((report, index) => (
        <Row
          key={report.id}
          last={index === reports.length - 1}
          onPress={() => openSheet(<ReportDetailSheet reportId={report.id} />)}
        >
          <View style={{ flexShrink: 1 }}>
            <AppText>
              <Bold>{report.type}</Bold>
            </AppText>
            <AppText size={14} tone="muted">
              Ward {user.ward} · Submitted {report.date.toLowerCase()}
            </AppText>
          </View>
          <AppText weight="700" tone={reportConfig.statusTones[report.status] || 'amber'}>
            {report.status}
          </AppText>
        </Row>
      ))}
    </View>
  );
}
