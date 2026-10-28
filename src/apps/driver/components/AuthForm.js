import React, { useState } from 'react';
import { View } from 'react-native';
import Field from '../../../shared/components/Field';
import { useToast } from '../../../shared/components/Toast';
import profile from '../../../data/driver/profile.json';
import messages from '../../../data/driver/messages.json';
import { useDriver } from '../store/DriverContext';
import DriverButton from './DriverButton';

export default function AuthForm({ signup }) {
  const toast = useToast();
  const { signIn } = useDriver();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [identifier, setIdentifier] = useState(profile.demoLogin.identifier);
  const [password, setPassword] = useState(signup ? '' : profile.demoLogin.password);

  const submit = () => {
    if (!password) {
      toast(messages.enterPassword);
      return;
    }
    if (signup) {
      if (!name) {
        toast(messages.enterName);
        return;
      }
      signIn({ name, vehicle: vehicle || profile.defaultVehicle });
      return;
    }
    signIn(null);
  };

  return (
    <View>
      {signup ? (
        <>
          <Field labelGap={14} label="Full name" value={name} onChangeText={setName} autoCapitalize="words" />
          <Field labelGap={14} label="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Field
            labelGap={14}
            label="Vehicle ID (if assigned)"
            value={vehicle}
            onChangeText={setVehicle}
            placeholder={profile.defaultVehicle}
            autoCapitalize="characters"
          />
        </>
      ) : (
        <Field labelGap={14} label="Phone or email" value={identifier} onChangeText={setIdentifier} />
      )}
      <Field labelGap={14} label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <DriverButton label={signup ? 'Create account' : 'Log in'} onPress={submit} />
    </View>
  );
}
