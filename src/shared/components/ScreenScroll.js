import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function ScreenScroll({ children, onRefresh }) {
  const colors = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    timer.current = setTimeout(() => setRefreshing(false), 600);
  }, [onRefresh]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingTop: 18, paddingHorizontal: 16, paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  );
}
