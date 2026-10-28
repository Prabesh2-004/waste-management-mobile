import React from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import useLayout from '../hooks/useLayout';
import AppText from './AppText';

export default function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  onSubmitEditing,
  labelGap = 12,
  fontSize = 17,
  style,
}) {
  const colors = useTheme();
  const { scale } = useLayout();
  return (
    <View>
      {label ? (
        <AppText size={14} tone="muted" style={{ marginTop: labelGap, marginBottom: 4 }}>
          {label}
        </AppText>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        onSubmitEditing={onSubmitEditing}
        accessibilityLabel={label || placeholder}
        style={[
          {
            width: '100%',
            paddingVertical: 14,
            paddingHorizontal: 14,
            borderWidth: 2,
            borderColor: colors.line,
            borderRadius: 12,
            backgroundColor: colors.surface,
            color: colors.ink,
            fontSize: fontSize * scale,
          },
          style,
        ]}
      />
    </View>
  );
}
