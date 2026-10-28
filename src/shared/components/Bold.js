import React from 'react';
import { Text } from 'react-native';

export default function Bold({ children }) {
  return <Text style={{ fontWeight: '700' }}>{children}</Text>;
}
