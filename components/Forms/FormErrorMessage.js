import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Appearance } from 'react-native-appearance';
import lightColors from '../../utils/lightColors'
import darkColors from '../../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors

export default function FormErrorMessage({ error, visible }) {
  if (!error || !visible) {
    return <Text style={{height: 24}}/>;
  }

  return <Text style={styles.errorText}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 15,
    color: Colors.red,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600'
  }
});
