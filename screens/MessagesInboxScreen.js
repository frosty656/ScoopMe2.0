import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';

import SafeView from '../components/SafeView';

import AppButton from '../components/AppButton';

import useStatusBar from '../hooks/useStatusBar';

import { GiftedChat } from 'react-native-gifted-chat';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { auth } from '../components/Firebase/firebase';
import Loading from '../components/Loading';
import useStatsBar from '../utils/useStatusBar';
import { Appearance } from 'react-native-appearance';
import lightColors from '../utils/lightColors'
import darkColors from '../utils/darkColors'

let currentColorScheme = Appearance.getColorScheme();

let Colors = currentColorScheme === 'light' ? lightColors : darkColors

export default function MessagesInboxScreen({ navigation }) {
  useStatsBar('light-content');

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  //get chat rooms
    const unsubscribe = firestore()
      .collection('Message_threads')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',

            latestMessage: {
              text: ''
            },
            ...documentSnapshot.data()
          };
        });

          //get chat rooms id if user is attending
          firestore().collection('Users').doc(auth.currentUser.uid)
            .onSnapshot(docs => {
                const threadsID = docs.data().chatRooms;

                //filter out chat rooms that user is attending
                setThreads(threads.filter(item => threadsID.includes(item._id)))
          })

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat Room', { thread: item })}
          >
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});