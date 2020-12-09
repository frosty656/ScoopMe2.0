import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeList from './RideScreen'
import RideDetailScreen from './RideDetailScreen'
import PickupDetailScreen from './PickupDetailsScreen'
import MessagesInboxScreen from "../MessagesInboxScreen";
import ChatRoomScreen from "../ChatRoomScreen";
import Colors from '../../utils/colors'

const Stack = createStackNavigator();

export default function HomeListStack() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="Rides" component={HomeList} options={{headerShown: false}} />
      <Stack.Screen name="RideDetailScreen" component={RideDetailScreen} options={{headerStyle: {backgroundColor: Colors.primary}}}/>
      <Stack.Screen name="PickupDetailScreen" component={PickupDetailScreen} options={{headerStyle: {backgroundColor: Colors.primary}}}/>
      <Stack.Screen name="Messages" component={MessagesInboxScreen} />
      <Stack.Screen name="Chat Room" component={ChatRoomScreen} options={({route}) => ({title: route.params.thread.name})} options={{headerStyle: {backgroundColor: Colors.primary}}}/>
    </Stack.Navigator>
  );
}
