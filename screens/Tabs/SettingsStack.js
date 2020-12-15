import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeName from '../ChangeInfos/ChangeName'

import ChangeProfilePicture from '../ChangeInfos/ChangeProfilePicture'
import Settings from './SettingsScreen'
import { Appearance } from 'react-native-appearance';
import lightColors from '../../utils/lightColors'
import darkColors from '../../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors


const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
      <Stack.Screen name="ChangeName" component={ChangeName} options={{headerStyle: {backgroundColor: Colors.primary}}}/>
      <Stack.Screen name="ChangeImage" component={ChangeProfilePicture} options={{headerStyle: {backgroundColor: Colors.primary}}}/>
    </Stack.Navigator>
  );
}
