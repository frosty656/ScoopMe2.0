import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';


import settingsStack from '../screens/Tabs/SettingsStack'
import mapView from '../screens/Tabs/MapsScreen'
import profileScreen from '../screens/Tabs/ProfileScreen'
import homeListScreen from '../screens/Tabs/HomeListView'


import { Appearance } from 'react-native-appearance';
import lightColors from '../utils/lightColors'
import darkColors from '../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors


const Tab = createBottomTabNavigator();


export default function TabBar({ navigation }) {

  return (
      <Tab.Navigator 
        tabBarOptions={
          {style:{backgroundColor: Colors.primary}}
        }>
        <Tab.Screen name="Home" component={homeListScreen} options={{
          tabBarIcon: ({ tintColor }) => (
            <Feather name="home" color={Colors.black} size={25} />
        ),
        }}/>
        <Tab.Screen name="Map" component={mapView} options={{
          tabBarIcon: ({ tintColor }) => (
            <Feather name="map-pin" color={Colors.black} size={25} />
        ),
        }}/>
        <Tab.Screen name="Profile" component={profileScreen} options={{
          tabBarIcon: ({ tintColor }) => (
            <Feather name="user" color={Colors.black} size={25} />
        ),
        }}/>
        <Tab.Screen name="Settings" component={settingsStack} options={{
          tabBarIcon: ({ tintColor }) => (
            <Feather name="settings" color={Colors.black} size={25} />
        ),
        }}/>
      </Tab.Navigator>

  );
}