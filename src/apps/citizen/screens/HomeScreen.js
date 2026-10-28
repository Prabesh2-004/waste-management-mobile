import React from 'react';
import { View } from 'react-native';
import { Camera, Truck, TriangleAlert } from 'lucide-react-native';
import AppText from '../../../shared/components/AppText';
import AlertBox from '../../../shared/components/AlertBox';
import Bold from '../../../shared/components/Bold';
import BigButton from '../../../shared/components/BigButton';
import LinkText from '../../../shared/components/LinkText';
import PageHeader from '../../../shared/components/PageHeader';
import SectionTitle from '../../../shared/components/SectionTitle';
import { useSheet } from '../../../shared/components/Sheet';
import initial from '../../../data/citizen/initialState.json';
import messages from '../../../data/citizen/messages.json';
import schedule from '../../../data/citizen/schedule.json';
import { useCitizen } from '../store/CitizenContext';
import TodayCard from '../components/TodayCard';
import DemoPanel from '../components/DemoPanel';
import ReportFormSheet from '../components/ReportFormSheet';

export default function HomeScreen() {
  const { openSheet } = useSheet();
  const { user, translate, status, timeChanged, setPage, demoOpen, toggleDemo } = useCitizen();

  const alertText = status === 'Delayed' ? messages.delayAlert : timeChanged ? messages.timeChangedAlert : '';
  const greeting = translate('Home') === 'Home' ? `Namaste, ${user.name.split(' ')[0]}` : translate('Home');
  const reportMissed = () => openSheet(<ReportFormSheet preset="Waste not collected" />);

  return (
    <View>
      <PageHeader title={greeting} subtitle={initial.dateLabel} />
      <SectionTitle>{translate("Today's collection")}</SectionTitle>
      <TodayCard />
      {status === 'Collected' ? (
        <AppText style={{ marginVertical: 17 }}>
          <Bold>Next collection</Bold>
          {'\n'}
          {schedule.nextCollection}
        </AppText>
      ) : null}
      {alertText ? <AlertBox>{alertText}</AlertBox> : null}
      {status === 'Not collected' ? (
        <BigButton variant="danger" label="Report missed collection" onPress={reportMissed} />
      ) : null}
      <SectionTitle>Quick actions</SectionTitle>
      <BigButton variant="outline" icon={Truck} label="Track collection" onPress={() => setPage('collection')} />
      <BigButton variant="outline" icon={Camera} label="Identify waste" onPress={() => setPage('identify')} />
      <BigButton
        variant="outline"
        icon={TriangleAlert}
        label="Report a problem"
        onPress={() => openSheet(<ReportFormSheet />)}
      />
      <View style={{ marginTop: 22, marginBottom: 17 }}>
        <LinkText size={14} label="Demo: simulate Driver, Ward and KMC actions" onPress={toggleDemo} />
      </View>
      {demoOpen ? <DemoPanel /> : null}
    </View>
  );
}
