import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NeuButton } from 'react-native-neu-element';
import { Appearance } from 'react-native-appearance';
import lightColors from '../utils/lightColors'
import darkColors from '../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors

export default function IconButton({ iconName, color, size, onPress, style }) {
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
      <NeuButton
        width={size || 250}
        height={size || 30}
        borderRadius={25}
        onPress={onPress}
        color={Colors.primary}>
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      </NeuButton>
    </TouchableOpacity>
  );
}
