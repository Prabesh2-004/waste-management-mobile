import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Accordion from '../../../shared/components/Accordion';
import PageHeader from '../../../shared/components/PageHeader';
import Row from '../../../shared/components/Row';
import SectionTitle from '../../../shared/components/SectionTitle';
import content from '../../../data/citizen/updatesContent.json';
import { useCitizen } from '../store/CitizenContext';

function TextRow({ text }) {
  return (
    <Row>
      <AppText style={{ flexShrink: 1 }}>{text}</AppText>
    </Row>
  );
}

export default function UpdatesScreen() {
  const { updates, user } = useCitizen();

  return (
    <View>
      <PageHeader title="Updates" subtitle="What matters to you" />
      <SectionTitle>Latest</SectionTitle>
      {updates.slice(0, 5).map((item, index) => (
        <Row key={`${item.when}-${index}`}>
          <View style={{ flexShrink: 1 }}>
            <AppText>{item.text}</AppText>
            <AppText size={14} tone="muted">
              {item.category} · {item.when}
            </AppText>
          </View>
        </Row>
      ))}
      <SectionTitle>Milestones</SectionTitle>
      {content.milestones.map((text) => (
        <TextRow key={text} text={text.replace('{ward}', String(user.ward))} />
      ))}
      <SectionTitle>Reminders</SectionTitle>
      {content.reminders.map((text) => (
        <TextRow key={text} text={text} />
      ))}
      <SectionTitle>Learn</SectionTitle>
      {content.learn.map((item) => (
        <Accordion key={item.title} title={item.title} body={item.body} />
      ))}
    </View>
  );
}
