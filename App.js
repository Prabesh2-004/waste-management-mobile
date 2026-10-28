import React from 'react';
import CitizenApp from './src/apps/citizen/CitizenApp';
import DriverApp from './src/apps/driver/DriverApp';

const role = process.env.EXPO_PUBLIC_APP_ROLE === 'driver' ? 'driver' : 'citizen';

export default function App() {
  return role === 'driver' ? <DriverApp /> : <CitizenApp />;
}
