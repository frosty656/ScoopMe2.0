import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import rideScreen from '../screens/Tabs/RideScreen'
import settingsStack from '../screens/Tabs/SettingsStack'
import mapView from '../screens/Tabs/MapsScreen'
import profileScreen from '../screens/Tabs/ProfileScreen'
import homeListScreen from '../screens/Tabs/HomeListView'

const Tab = createBottomTabNavigator();

export default function TabBar({ navigation }) {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={homeListScreen} />
        <Tab.Screen name="Map" component={mapView}/>
        <Tab.Screen name="Profile" component={profileScreen}/>
        <Tab.Screen name="Settings" component={settingsStack} />
      </Tab.Navigator>

  );
}