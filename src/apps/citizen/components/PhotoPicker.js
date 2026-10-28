import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import BigButton from '../../../shared/components/BigButton';
import icons from '../../../shared/icons';
import { useToast } from '../../../shared/components/Toast';
import messages from '../../../data/citizen/messages.json';
import { useCitizen } from '../store/CitizenContext';

export default function PhotoPicker() {
  const toast = useToast();
  const { startPhoto } = useCitizen();

  const pick = async (source) => {
    try {
      let result;
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          toast(messages.cameraDenied);
          return;
        }
        result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.7 });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
      }
      if (result.canceled || !result.assets || !result.assets.length) return;
      const asset = result.assets[0];
      startPhoto(asset.uri, asset.fileName || '');
    } catch (error) {
      toast(messages.photoFailed);
    }
  };

  return (
    <>
      <BigButton icon={icons.Camera} label="Take a photo" marginTop={16} onPress={() => pick('camera')} />
      <BigButton variant="outline" icon={icons.Image} label="Upload an image" onPress={() => pick('library')} />
    </>
  );
}
