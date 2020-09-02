import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import TabBars from './TabBars'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <TabBars/>
  );
}
