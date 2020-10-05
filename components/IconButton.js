import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NeuButton } from 'react-native-neu-element';
import Colors from '../utils/colors'

export default function IconButton({ iconName, color, size, onPress, style }) {
  return (
    <TouchableOpacity style={{ marginRight: "auto", paddingLeft: 5, paddingBottom: 20 }} onPress={onPress}>
      <NeuButton
        width={size || 300}
        height={size || 50}
        borderRadius={16}
        onPress={onPress}
        color={Colors.primary}>
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      </NeuButton>
    </TouchableOpacity>
  );
}
