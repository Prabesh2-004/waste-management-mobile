import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../../../shared/components/AppText';
import LinkText from '../../../shared/components/LinkText';
import { useCitizen } from '../store/CitizenContext';
import AuthForm from '../components/AuthForm';

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { authMode, setAuthMode } = useCitizen();
  const signup = authMode === 'signup';

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 36 + insets.top,
        paddingBottom: 20 + insets.bottom,
        paddingHorizontal: 20,
      }}
    >
      <AppText variant="h1" tone="accent">
        Kathmandu Waste
      </AppText>
      <AppText tone="muted" style={{ marginTop: 13, marginBottom: 5 }}>
        {signup ? 'Create your account' : 'Welcome back'}
      </AppText>
      <AuthForm key={authMode} signup={signup} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 17 }}>
        <AppText size={14} tone="muted">
          {signup ? 'Have an account? ' : 'New here? '}
        </AppText>
        <LinkText
          label={signup ? 'Log in' : 'Sign up'}
          size={14}
          bold
          onPress={() => setAuthMode(signup ? 'login' : 'signup')}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
