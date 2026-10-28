import React from 'react';
import { View } from 'react-native';
import PageHeader from '../../../shared/components/PageHeader';
import SectionTitle from '../../../shared/components/SectionTitle';
import { useCitizen } from '../store/CitizenContext';
import PhotoPicker from '../components/PhotoPicker';
import PhotoResult from '../components/PhotoResult';
import WasteSearch from '../components/WasteSearch';

export default function IdentifyScreen() {
  const { photo } = useCitizen();
  return (
    <View>
      <PageHeader title="Identify your waste" subtitle="Take or upload a photo to learn where it goes" />
      {photo ? <PhotoResult /> : <PhotoPicker />}
      <SectionTitle>Or search by name</SectionTitle>
      <WasteSearch />
    </View>
  );
}
