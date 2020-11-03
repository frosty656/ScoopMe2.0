import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeList from './RideScreen'
import RideDetailScreen from './RideDetailScreen'
import PickupDetailScreen from './PickupDetailsScreen'
import MessagesInboxScreen from "../MessagesInboxScreen";
import ChatRoomScreen from "../ChatRoomScreen";

const Stack = createStackNavigator();

export default function HomeListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rides" component={HomeList} options={{headerShown: false}}/>
      <Stack.Screen name="RideDetailScreen" component={RideDetailScreen} />
      <Stack.Screen name="PickupDetailScreen" component={PickupDetailScreen} />
      <Stack.Screen name="Messages" component={MessagesInboxScreen} />
      <Stack.Screen name="Chat Room" component={ChatRoomScreen} options={({route}) => ({title: route.params.thread.name})}/>
    </Stack.Navigator>
  );
}
