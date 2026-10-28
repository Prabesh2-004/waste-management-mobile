import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import useLayout from '../hooks/useLayout';

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const colors = useTheme();
  const { scale } = useLayout();
  const [message, setMessage] = useState('');
  const timer = useRef(null);

  const show = useCallback((text) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 4200);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {message ? (
        <View
          pointerEvents="none"
          accessibilityLiveRegion="polite"
          style={{
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 84,
            backgroundColor: colors.ink,
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 12,
            zIndex: 20,
            elevation: 20,
          }}
        >
          <Text style={{ color: colors.bg, fontSize: 15 * scale, lineHeight: 15 * scale * 1.45 }}>{message}</Text>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
