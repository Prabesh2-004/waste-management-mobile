import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import AlertBox from '../../../shared/components/AlertBox';
import BigButton from '../../../shared/components/BigButton';
import FocusCard from '../../../shared/components/FocusCard';
import PageHeader from '../../../shared/components/PageHeader';
import Row from '../../../shared/components/Row';
import SectionTitle from '../../../shared/components/SectionTitle';
import { useSheet } from '../../../shared/components/Sheet';
import messages from '../../../data/citizen/messages.json';
import schedule from '../../../data/citizen/schedule.json';
import truckMap from '../../../data/citizen/truckMap.json';
import { useCitizen } from '../store/CitizenContext';
import ReportFormSheet from '../components/ReportFormSheet';
import ScheduleRow from '../components/ScheduleRow';
import StatusLine from '../components/StatusLine';
import TruckMap from '../components/TruckMap';

const alertPattern = new RegExp(messages.alertPattern);

export default function CollectionScreen() {
  const { openSheet } = useSheet();
  const { user, status, timeSlot, notifications } = useCitizen();

  const tracking = truckMap.trackingStatuses.includes(status);
  const eta = truckMap.etaByStatus[status] || truckMap.defaultEta;
  const alerts = notifications.filter((item) => alertPattern.test(item.text)).slice(0, 3);
  const reportMissed = () => openSheet(<ReportFormSheet preset="Waste not collected" />);

  return (
    <View>
      <PageHeader title="Collection" subtitle={`Ward ${user.ward} · ${schedule.route}`} />
      <SectionTitle>Today's schedule</SectionTitle>
      <ScheduleRow title={schedule.organicName} slot={timeSlot}>
        <StatusLine status={status} />
      </ScheduleRow>
      <ScheduleRow title={schedule.inorganicName} slot={schedule.inorganicSlot}>
        <StatusLine status="Scheduled" label="Scheduled" />
      </ScheduleRow>

      {tracking ? (
        <>
          <SectionTitle>Where is the truck?</SectionTitle>
          <TruckMap status={status} />
          <FocusCard style={{ marginTop: 10 }}>
            <AppText size={20} weight="700" leading={1.2}>
              🚛 Truck arriving in approximately {eta} minutes
            </AppText>
          </FocusCard>
        </>
      ) : null}
      {status === 'Collected' ? (
        <AlertBox color="green">{`✓ Your waste has been collected. Next: ${schedule.nextCollectionShort}.`}</AlertBox>
      ) : null}
      {status === 'Delayed' ? (
        <AlertBox>Collection is delayed by about 30 minutes. We will tell you when the truck is close.</AlertBox>
      ) : null}
      {status === 'Not collected' ? (
        <>
          <AlertBox color="red">The collection time has passed and your waste was not collected.</AlertBox>
          <BigButton variant="danger" label="Report missed collection" onPress={reportMissed} />
        </>
      ) : null}

      <SectionTitle>Alerts</SectionTitle>
      {alerts.length ? (
        alerts.map((item, index) => (
          <Row key={`${item.when}-${index}`} last={index === alerts.length - 1}>
            <AppText style={{ flexShrink: 1 }}>{item.text}</AppText>
          </Row>
        ))
      ) : (
        <AppText tone="muted">No alerts right now.</AppText>
      )}
    </View>
  );
}
