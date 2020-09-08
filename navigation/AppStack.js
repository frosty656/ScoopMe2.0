import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import TabBars from './TabBars'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    //Check if there is a users name
    //Check if there is a users profile image if it is thier first time signing up
    //If all that is good then go to the tab bars
    <TabBars/>
  );
}
