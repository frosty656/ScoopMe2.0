import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';

import SafeView from '../components/SafeView';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat'

import * as firebase from 'firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { auth } from '../components/Firebase/firebase';

export default function ChatRoomScreen({ route, navigation }) {
    useStatusBar('light-content');
    const [messages, setMessages] = useState([]);
    const { thread } = route.params;
    const currentUser = auth.currentUser;

    async function handleSend(messages) {
        const text = messages[0].text;

        firestore()
          .collection('Message_threads')
          .doc(thread._id)
          .collection('Message')
          .add({
            text,
            createdAt: new Date().getTime(),
            user: {
              _id: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName
            }
          });

        await firestore()
          .collection('Message_threads')
          .doc(thread._id)
          .set(
            {
              latestMessage: {
                text,
                createdAt: new Date().getTime()
              }
            },
            { merge: true }
          );
      }

      useEffect(() => {
          const messagesListener = firestore()
            .collection('Message_threads')
            .doc(thread._id)
            .collection('Message')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
              const messages = querySnapshot.docs.map(doc => {
                const firebaseData = doc.data();

                const data = {
                  _id: doc.id,
                  text: '',
                  createdAt: new Date().getTime(),
                  ...firebaseData
                };

                if (!firebaseData.system) {
                  data.user = {
                    ...firebaseData.user,
                    name: firebaseData.user.name
                  };
                }

                return data;
              });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.sentMessages
          }
        }}
        textStyle={{
          right: {
            color: Colors.white
          }
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={Colors.sentMessages} />
      </View>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color={Colors.sentMessages} />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

    return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: currentUser.uid }}
      placeholder='Type your message here...'
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingBottom: 600
    },
    logoContainer: {
        position: 'absolute',
        top: 60,
        alignItems: 'center'
    },
    logo: {
        width: 125,
        height: 125
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '600',
        paddingVertical: 20,
        color: Colors.black
    },
    buttonContainer: {
        padding: 20,
        paddingBottom: 60,
        width: '100%'
    }
});