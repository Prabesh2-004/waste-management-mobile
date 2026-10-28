import React from 'react';
import { Image } from 'react-native';
import AppText from '../../../shared/components/AppText';
import AlertBox from '../../../shared/components/AlertBox';
import BigButton from '../../../shared/components/BigButton';
import Spinner from '../../../shared/components/Spinner';
import { useCitizen } from '../store/CitizenContext';
import WasteCard from './WasteCard';

export default function PhotoResult() {
  const { photo, askAbout, clearPhoto } = useCitizen();
  if (!photo) return null;

  return (
    <>
      <Image
        source={{ uri: photo.uri }}
        accessibilityLabel="Your photo"
        resizeMode="cover"
        style={{ width: '100%', height: 220, borderRadius: 14, marginTop: 16 }}
      />
      {photo.loading ? (
        <>
          <Spinner />
          <AppText tone="muted" align="center" style={{ marginVertical: 17 }}>
            Looking at your photo…
          </AppText>
        </>
      ) : (
        <>
          {photo.item ? (
            <>
              <WasteCard item={photo.item} />
              <BigButton variant="outline" label="Ask the helper about this" onPress={() => askAbout(photo.item.name)} />
            </>
          ) : (
            <AlertBox>We could not tell what this is. Try a clearer photo, or search by name below.</AlertBox>
          )}
          <AppText size={14} tone="muted" style={{ marginVertical: 17 }}>
            Demo: this answer is simulated.
          </AppText>
          <BigButton variant="outline" label="Try another photo" onPress={clearPhoto} />
        </>
      )}
    </>
  );
}
