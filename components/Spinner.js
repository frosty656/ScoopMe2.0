import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import SafeView from './SafeView';
import { Appearance } from 'react-native-appearance';
import lightColors from '../utils/lightColors'
import darkColors from '../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors

export default function Spinner() {
  return (
    <SafeView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.secondary} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
