import React from 'react';
import { AuthUserProvider } from './AuthUserProvider';
import Routes from './Routes';
import { AppearanceProvider } from 'react-native-appearance';

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <AuthUserProvider>
      <AppearanceProvider>
        <Routes />
      </AppearanceProvider>
    </AuthUserProvider>
  );
}
