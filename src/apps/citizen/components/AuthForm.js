import React, { useState } from 'react';
import { View } from 'react-native';
import AppText from '../../../shared/components/AppText';
import BigButton from '../../../shared/components/BigButton';
import Field from '../../../shared/components/Field';
import LinkText from '../../../shared/components/LinkText';
import Select from '../../../shared/components/Select';
import { useSheet } from '../../../shared/components/Sheet';
import initial from '../../../data/citizen/initialState.json';
import { useCitizen } from '../store/CitizenContext';
import ResetPasswordSheet from './ResetPasswordSheet';

const wards = Array.from({ length: initial.wardCount }, (_, index) => index + 1);

export default function AuthForm({ signup }) {
  const { signIn } = useCitizen();
  const { openSheet } = useSheet();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [identifier, setIdentifier] = useState(initial.demoLogin.identifier);
  const [password, setPassword] = useState(signup ? '' : initial.demoLogin.password);
  const [confirm, setConfirm] = useState('');
  const [ward, setWard] = useState(initial.defaultWard);
  const [error, setError] = useState('');

  const submit = () => {
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (signup) {
      if (!name || !phone) {
        setError('Please enter your name and phone number.');
        return;
      }
      if (password !== confirm) {
        setError('Passwords do not match.');
        return;
      }
      signIn({ name, phone, email, ward: Number(ward) });
      return;
    }
    signIn(null);
  };

  return (
    <View>
      {signup ? (
        <>
          <Field label="Full name" value={name} onChangeText={setName} autoCapitalize="words" />
          <Field label="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        </>
      ) : (
        <Field label="Phone number or email" value={identifier} onChangeText={setIdentifier} />
      )}
      <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {signup ? (
        <>
          <Field label="Confirm password" value={confirm} onChangeText={setConfirm} secureTextEntry />
          <Select label="Ward number" value={ward} options={wards} onChange={setWard} />
        </>
      ) : null}
      {error ? (
        <AppText size={14} tone="red" style={{ marginTop: 6 }}>
          {error}
        </AppText>
      ) : null}
      <BigButton label={signup ? 'Sign up' : 'Log in'} onPress={submit} />
      {!signup ? (
        <View style={{ alignItems: 'center', marginTop: 17 }}>
          <LinkText label="Forgot password?" onPress={() => openSheet(<ResetPasswordSheet />)} />
        </View>
      ) : null}
    </View>
  );
}
