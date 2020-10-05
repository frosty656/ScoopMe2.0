import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NeuButton } from 'react-native-neu-element';
import Colors from '../utils/colors'

export default function CarIcon({ iconName, color, size, onPress, style }) {
    return (
        <TouchableOpacity style={{ marginLeft: "auto", paddingLeft: 5, paddingBottom: 20 }} onPress={onPress}>
            <NeuButton
                width={size || 350}
                height={size || 55}
                borderRadius={12}
                onPress={onPress}
                color={Colors.primary}>
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
            </NeuButton>
        </TouchableOpacity>
    );
}
