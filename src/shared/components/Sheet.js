import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BackHandler, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import BigButton from './BigButton';

const SheetContext = createContext({ openSheet: () => {}, closeSheet: () => {} });

export function SheetProvider({ children, closeLabel = 'Close', buttonProps }) {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState(null);

  const openSheet = useCallback((node) => setContent(node), []);
  const closeSheet = useCallback(() => setContent(null), []);
  const value = useMemo(() => ({ openSheet, closeSheet }), [openSheet, closeSheet]);

  useEffect(() => {
    if (!content) return undefined;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setContent(null);
      return true;
    });
    return () => subscription.remove();
  }, [content]);

  return (
    <SheetContext.Provider value={value}>
      {children}
      {content ? (
        <View style={[StyleSheet.absoluteFill, styles.overlay, { backgroundColor: colors.overlay }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} accessibilityLabel="Dismiss" />
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrap}>
            <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 16, paddingBottom: 20 + insets.bottom }}
              >
                {content}
                <BigButton label={closeLabel} variant="outline" onPress={closeSheet} {...buttonProps} />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      ) : null}
    </SheetContext.Provider>
  );
}

export function useSheet() {
  return useContext(SheetContext);
}

const styles = StyleSheet.create({
  overlay: { justifyContent: 'flex-end', zIndex: 9, elevation: 9 },
  wrap: { width: '100%', maxHeight: '92%' },
  sheet: {
    flexShrink: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
