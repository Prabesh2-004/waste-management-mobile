import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../../shared/theme/ThemeProvider';
import PhoneFrame from '../../shared/components/PhoneFrame';
import { ToastProvider, useToast } from '../../shared/components/Toast';
import { SheetProvider } from '../../shared/components/Sheet';
import ScreenScroll from '../../shared/components/ScreenScroll';
import BottomNav from '../../shared/components/BottomNav';
import icons from '../../shared/icons';
import navigation from '../../data/citizen/navigation.json';
import messages from '../../data/citizen/messages.json';
import { CitizenProvider, useCitizen } from './store/CitizenContext';
import CitizenTopBar from './components/CitizenTopBar';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CollectionScreen from './screens/CollectionScreen';
import AwarenessScreen from './screens/AwarenessScreen';
import UpdatesScreen from './screens/UpdatesScreen';
import IdentifyScreen from './screens/IdentifyScreen';
import HelpScreen from './screens/HelpScreen';

const screens = {
  home: HomeScreen,
  collection: CollectionScreen,
  awareness: AwarenessScreen,
  updates: UpdatesScreen,
  identify: IdentifyScreen,
  help: HelpScreen,
};

function CitizenRouter() {
  const toast = useToast();
  const { authenticated, page, setPage, translate } = useCitizen();

  if (!authenticated) return <AuthScreen />;

  const Screen = screens[page];
  const items = navigation.map((item) => ({ key: item.key, label: translate(item.label), icon: icons[item.icon] }));

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <CitizenTopBar />
      <ScreenScroll key={page} onRefresh={() => toast(messages.refreshed)}>
        <Screen />
      </ScreenScroll>
      <BottomNav items={items} active={page} onSelect={setPage} />
    </KeyboardAvoidingView>
  );
}

export default function CitizenApp() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PhoneFrame>
          <ToastProvider>
            <CitizenProvider>
              <SheetProvider closeLabel="Close">
                <CitizenRouter />
              </SheetProvider>
            </CitizenProvider>
          </ToastProvider>
        </PhoneFrame>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
