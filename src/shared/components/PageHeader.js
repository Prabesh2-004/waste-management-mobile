import React from 'react';
import AppText from './AppText';

export default function PageHeader({ title, subtitle, titleTone, subtitleStyle }) {
  return (
    <>
      <AppText variant="h1" tone={titleTone} accessibilityRole="header">
        {title}
      </AppText>
      {subtitle ? (
        <AppText tone="muted" style={subtitleStyle}>
          {subtitle}
        </AppText>
      ) : null}
    </>
  );
}
