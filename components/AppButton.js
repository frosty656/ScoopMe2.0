import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NeuButton } from 'react-native-neu-element';

import Colors from '../utils/colors';

export default function AppButton({ title, onPress, width, height}) {
  return (
    <View style={styles.border}>
    <NeuButton
        width={width || 300}
        height={height || 50}
        borderRadius={16}
        onPress={onPress}
        color={Colors.primary}>
        <Text style={styles.buttonText}>{title}</Text>
      </NeuButton>
    </View>

  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%'
  },
  buttonText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '500',
  },
  border:{
    alignItems: 'center',
    justifyContent: 'center',

  }
});
