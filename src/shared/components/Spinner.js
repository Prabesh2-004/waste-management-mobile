import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function Spinner() {
  const colors = useTheme();
  const turn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(turn, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      })
    );
    loop.start();
    return () => loop.stop();
  }, [turn]);

  const rotate = turn.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View
      accessibilityRole="progressbar"
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 4,
        borderColor: colors.line,
        borderTopColor: colors.accent,
        marginVertical: 10,
        alignSelf: 'center',
        transform: [{ rotate }],
      }}
    />
  );
}
