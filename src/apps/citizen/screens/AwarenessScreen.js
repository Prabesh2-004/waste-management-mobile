import React from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import Bold from '../../../shared/components/Bold';
import FocusCard from '../../../shared/components/FocusCard';
import PageHeader from '../../../shared/components/PageHeader';
import SectionTitle from '../../../shared/components/SectionTitle';
import { useSheet } from '../../../shared/components/Sheet';
import { useCitizen } from '../store/CitizenContext';
import ProgramDetailSheet from '../components/ProgramDetailSheet';
import ProgramRow from '../components/ProgramRow';

export default function AwarenessScreen() {
  const { openSheet } = useSheet();
  const { programs } = useCitizen();

  const mine = programs.filter((item) => item.registered);
  const upcoming = programs.filter((item) => !item.done);
  const held = programs.filter((item) => item.done);
  const open = (id) => openSheet(<ProgramDetailSheet programId={id} />);

  return (
    <View>
      <PageHeader title="Awareness" subtitle="Join a program in your ward" />
      {mine.length ? (
        <>
          <SectionTitle>You are registered for</SectionTitle>
          {mine.map((item) => (
            <FocusCard key={item.id} style={{ marginBottom: 8 }} onPress={() => open(item.id)}>
              <AppText>
                <Bold>{item.name}</Bold>
                {'\n'}
                {item.date}
              </AppText>
            </FocusCard>
          ))}
        </>
      ) : null}
      <SectionTitle>Upcoming programs</SectionTitle>
      {upcoming.map((item) => (
        <ProgramRow key={item.id} program={item} onPress={() => open(item.id)} />
      ))}
      <SectionTitle>Recently held</SectionTitle>
      {held.map((item, index) => (
        <ProgramRow key={item.id} program={item} last={index === held.length - 1} onPress={() => open(item.id)} />
      ))}
    </View>
  );
}
