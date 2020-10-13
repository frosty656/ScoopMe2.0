import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeName from '../ChangeInfos/ChangeName'
import ChangeEmail from '../ChangeInfos/ChangeEmail'
import ChangePassword from '../ChangeInfos/ChangePassword'

import ChangeProfilePicture from '../ChangeInfos/ChangeProfilePicture'
import Settings from './SettingsScreen'


const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
      <Stack.Screen name="Change Name" component={ChangeName} />
      <Stack.Screen name="Change Email" component={ChangeEmail} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Change Image" component={ChangeProfilePicture} />
    </Stack.Navigator>
  );
}
