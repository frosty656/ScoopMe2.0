import React from 'react';

import Providers from './navigation';

import { AppearanceProvider } from 'react-native-appearance';

export default function App() {
  return (
    <AppearanceProvider>
      <Providers />
  </AppearanceProvider>
  );
}
