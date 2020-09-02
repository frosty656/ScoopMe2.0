import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../utils/colors';
import { NeuInput } from 'react-native-neu-element';

export default function AppTextInput({
  leftIcon,
  width = '100%',
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) {
  return (
    <View style={styles.container}>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={Colors.mediumGrey}
          style={styles.icon}
        />
      )}
      <View style={styles.evenOutEye}>
          <NeuInput
            {...otherProps}
            color={Colors.primary}
            width={300}
            height={50}
            style={styles.input}
          />

      <View zIndex={1} position={'absolute'} right={20}>
        {rightIcon && (
          <TouchableOpacity onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={20}
              color={Colors.mediumGrey}
              style={styles.rightIconStyles}
            />
          </TouchableOpacity>
        )}
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 100,
  },
  icon: {
    marginRight: 10
  },
  input: {
    width: '100%',
    fontSize: 18,
    color: Colors.black
  },
  rightIconStyles: {
    position: 'relative',
    right: 0,
    alignSelf: 'center'
  },
  evenOutEye: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
/*
  <TextInput
    style={styles.input}
    placeholderTextColor={Colors.mediumGrey}
    {...otherProps}
  />
*/