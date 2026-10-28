import React from 'react';
import { View } from 'react-native';
import { TriangleAlert } from 'lucide-react-native';
import BigButton from '../../../shared/components/BigButton';
import PageHeader from '../../../shared/components/PageHeader';
import SectionTitle from '../../../shared/components/SectionTitle';
import { useSheet } from '../../../shared/components/Sheet';
import ChatPanel from '../components/ChatPanel';
import ReportFormSheet from '../components/ReportFormSheet';
import ReportList from '../components/ReportList';

export default function HelpScreen() {
  const { openSheet } = useSheet();
  return (
    <View>
      <PageHeader title="Help" subtitle="Ask a question or report a problem" />
      <ChatPanel />
      <BigButton icon={TriangleAlert} label="Report a problem" onPress={() => openSheet(<ReportFormSheet />)} />
      <SectionTitle>My reports</SectionTitle>
      <ReportList />
    </View>
  );
}
