import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeList from './RideScreen'
import DetailScreen from './RideDetailScreen'
import MessagesInboxScreen from "../MessagesInboxScreen";
import ChatRoomScreen from "../ChatRoomScreen";

const Stack = createStackNavigator();

export default function HomeListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rides" component={HomeList} options={{headerShown: false}}/>
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="Messages" component={MessagesInboxScreen} />
      <Stack.Screen name="Chat Room" component={ChatRoomScreen} options={({route}) => ({title: route.params.thread.name})}/>
    </Stack.Navigator>
  );
}
