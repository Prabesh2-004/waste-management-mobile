import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import AlertBox from '../../../shared/components/AlertBox';
import PageHeader from '../../../shared/components/PageHeader';
import SectionTitle from '../../../shared/components/SectionTitle';
import { useSheet } from '../../../shared/components/Sheet';
import profile from '../../../data/driver/profile.json';
import { useDriver } from '../store/DriverContext';
import DriverButton from '../components/DriverButton';
import DriverRow from '../components/DriverRow';
import IssueSheet from '../components/IssueSheet';
import LeaveSheet from '../components/LeaveSheet';

export default function ReportsScreen() {
  const { openSheet } = useSheet();
  const { user, logged } = useDriver();

  return (
    <View>
      <PageHeader title="Reports" subtitle="Tell the ward about a problem" />
      <AlertBox color="accent" background="tint" style={{ marginTop: 8 }}>
        {`Vehicle ${user.vehicle} ${profile.maintenanceNotice}`}
      </AlertBox>
      <DriverButton label="Report Vehicle Problem" onPress={() => openSheet(<IssueSheet kind="Vehicle" />)} />
      <DriverButton label="Report Collection Problem" onPress={() => openSheet(<IssueSheet kind="Collection" />)} />
      <DriverButton label="Report Route Problem" onPress={() => openSheet(<IssueSheet kind="Route" />)} />
      <DriverButton variant="outline" label="Leave / Absence Note" onPress={() => openSheet(<LeaveSheet />)} />
      {logged.length ? (
        <>
          <SectionTitle>Sent today</SectionTitle>
          {logged.map((entry, index) => (
            <DriverRow key={`${entry}-${index}`} last={index === logged.length - 1}>
              <AppText style={{ flexShrink: 1 }}>✓ {entry}</AppText>
            </DriverRow>
          ))}
        </>
      ) : null}
    </View>
  );
}
