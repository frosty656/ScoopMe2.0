import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';


import settingsStack from '../screens/Tabs/SettingsStack'
import mapView from '../screens/Tabs/MapsScreen'
import profileScreen from '../screens/Tabs/ProfileScreen'
import homeListScreen from '../screens/Tabs/HomeListView'

const Tab = createBottomTabNavigator();


export default function TabBar({ navigation }) {

  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={homeListScreen} options={{
          tabBarIcon: ({ tintColor }) => (
            <Feather name="home" color={tintColor} size={25} />
        ),
        }}/>
        <Tab.Screen name="Map" component={mapView} options={{
          tabBarIcon: ({ tintColor }) => (
            <Feather name="map-pin" color={tintColor} size={25} />
        ),
        }}/>
        <Tab.Screen name="Profile" component={profileScreen} options={{
          tabBarIcon: ({ tintColor }) => (
            <Feather name="user" color={tintColor} size={25} />
        ),
        }}/>
        <Tab.Screen name="Settings" component={settingsStack} options={{
          tabBarIcon: ({ tintColor }) => (
            <Feather name="settings" color={tintColor} size={25} />
        ),
        }}/>
      </Tab.Navigator>

  );
}