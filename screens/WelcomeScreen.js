import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

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
    paddingTop: 150,
    paddingLeft: 5,
    position: 'absolute',
    top: 60,
    alignItems: 'center',
  },
  logo: {
    width: 125,
    height: 125
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.blue
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%'
  }
});

