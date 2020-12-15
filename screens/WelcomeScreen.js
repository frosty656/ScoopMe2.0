import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import AppButton from '../components/AppButton';

import useStatusBar from '../hooks/useStatusBar';

import { Appearance } from 'react-native-appearance';
import lightColors from '../utils/lightColors'
import darkColors from '../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors
export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/flame.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Weclome to Scoop Me!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{padding: 20}}>
          <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
        <View style={{padding: 20}}>
          <AppButton
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center'
  },
  logo: {
    width: 125,
    height: 125
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.black
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%'
  }
});