import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../../shared/theme/ThemeProvider';
import PhoneFrame from '../../shared/components/PhoneFrame';
import { ToastProvider } from '../../shared/components/Toast';
import { SheetProvider } from '../../shared/components/Sheet';
import ScreenScroll from '../../shared/components/ScreenScroll';
import BottomNav from '../../shared/components/BottomNav';
import navigation from '../../data/driver/navigation.json';
import { DriverProvider, useDriver } from './store/DriverContext';
import DriverTopBar from './components/DriverTopBar';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CollectionScreen from './screens/CollectionScreen';
import RouteScreen from './screens/RouteScreen';
import AwarenessScreen from './screens/AwarenessScreen';
import ReportsScreen from './screens/ReportsScreen';

const screens = {
  home: HomeScreen,
  collection: CollectionScreen,
  route: RouteScreen,
  awareness: AwarenessScreen,
  reports: ReportsScreen,
};

function DriverRouter() {
  const { authenticated, page, goTo } = useDriver();

  if (!authenticated) return <AuthScreen />;

  const Screen = screens[page];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <DriverTopBar />
      <ScreenScroll key={page}>
        <Screen />
      </ScreenScroll>
      <BottomNav items={navigation} active={page} onSelect={goTo} labelSize={14} paddingVertical={14} />
    </KeyboardAvoidingView>
  );
}

export default function DriverApp() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PhoneFrame>
          <ToastProvider>
            <DriverProvider>
              <SheetProvider closeLabel="Cancel" buttonProps={{ minHeight: 60, fontSize: 19, marginTop: 14 }}>
                <DriverRouter />
              </SheetProvider>
            </DriverProvider>
          </ToastProvider>
        </PhoneFrame>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
