import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeName from '../ChangeInfos/ChangeName'

import ChangeProfilePicture from '../ChangeInfos/ChangeProfilePicture'
import Settings from './SettingsScreen'


const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
      <Stack.Screen name="ChangeName" component={ChangeName} />
      <Stack.Screen name="ChangeImage" component={ChangeProfilePicture} />
    </Stack.Navigator>
  );
}
