import React from 'react';
import { View, StyleSheet, Button, Text} from 'react-native';
import SafeView from '../components/SafeView';


import { logout } from '../components/Firebase/firebase';

export default function HomeScreen() {
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeView style={styles.container}>
      <Text style={{fontSize:35}}>Welcome</Text>
      <Text>You have been succesfully signed in!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  }
});
