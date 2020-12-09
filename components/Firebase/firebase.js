import * as firebase from 'firebase';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';
import 'firebase/firestore';

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const createNewUser = (email, password, imageURI, name) => {
  auth.createUserWithEmailAndPassword(email, password).then(
    auth.currentUser.updateProfile({displayName: name})
  ).then(
    auth.currentUser.updateProfile({photoURL: imageURI})
  )
}

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const changeUsersName = (name) => {
  auth.currentUser.updateProfile({displayName: name})
}

export const changeUseresProfileImage = (imageURI) => {
  auth.currentUser.updateProfile({photoURL: imageURI})
}

export const newRide = (title, destLng, destLat, startLng, startLat,leaveTime, desc, seats) => {
let documentID = firebase.firestore().collection("Trips").add({
    "type": "ride",
    "title": title,
    "destLng": destLng, 
    "destLat": destLat, 
    "startLng": startLng, 
    "startLat": startLat,
    "leaveTime": leaveTime,
    "description": desc,
    "deliverer": auth.currentUser.displayName,
    "seats": seats,
    "riders": []
  }).then(function(docRef) {
    firebase.firestore().collection('Users').doc(auth.currentUser.uid).collection('History').add({
      'type': "ride",
      "rideID": docRef.id,
      "destination": title,
      "time": leaveTime,
    })
    //create chat room
    firebase.firestore().collection("Message_threads").doc(docRef.id).set({
    "name": "Ride to " + title,
    "latestMessage": {
        "text": "You have joined the room ride to " + title + ".",
        "createdAt": new Date().getTime()
        }
    })
    // add first system message
    firebase.firestore().collection("Message_threads").doc(docRef.id).collection('Message').add({
        "text": "You have joined the room ride to " + title + ".",
        "createdAt": new Date().getTime(),
        "system": true
    })
    //assign user to that chat room
    firebase.firestore().collection('Users').doc(auth.currentUser.uid).set({
        "chatRooms": firebase.firestore.FieldValue.arrayUnion(docRef.id)
    }, {merge: true})
})

}

export const joinRide = (item) => {
  // Add the user to the ride
  firebase.firestore().collection("Trips").doc(item.id).update({
    "riders": firebase.firestore.FieldValue.arrayUnion({"riderName": auth.currentUser.displayName, "riderID": auth.currentUser.uid})
  })
  //Put the ride in the users history
  firebase.firestore().collection('Users').doc(auth.currentUser.uid).collection('History').add({
    'type': "ride",
    "rideID": item.id,
    "destination": item.title,
    "time": item.leaveTime,
  })
  //assign user to that chat room
  firebase.firestore().collection('Users').doc(auth.currentUser.uid).set({
      "chatRooms": firebase.firestore.FieldValue.arrayUnion(item.id)
  }, {merge: true})
}


export const newDelivery = (title, destLng, destLat, startLng, startLat,leaveTime, desc) => {
  firebase.firestore().collection("Trips").add({
      "type": "delivery",
      "title": title,
      "destLng": destLng, 
      "destLat": destLat, 
      "startLng": startLng, 
      "startLat": startLat,
      "leaveTime": leaveTime,
      "description": desc,
      "deliverer": auth.currentUser.displayName,
      "usersAndItems": []
    }).then(function(docRef) {
          //Put the ride in the users history
          firebase.firestore().collection('Users').doc(auth.currentUser.uid).collection('History').add({
            'type': "pickup",
            "rideID": docRef.id,
            "destination": title,
            "time": leaveTime,
          })
          //create chat room
          firebase.firestore().collection("Message_threads").doc(docRef.id).set({
          "name": "Pick up from " + title,
          "latestMessage": {
              "text": "You have joined the room ride to " + title + ".",
              "createdAt": new Date().getTime()
              }
          })
          // add first system message
          firebase.firestore().collection("Message_threads").doc(docRef.id).collection('Message').add({
              "text": "You have joined the room Pick up from " + title + ".",
              "createdAt": new Date().getTime(),
              "system": true
          })
          //assign user to that chat room
          firebase.firestore().collection('Users').doc(auth.currentUser.uid).set({
              "chatRooms": firebase.firestore.FieldValue.arrayUnion(docRef.id)
          }, {merge: true})
      })

}

export const addToDelivery = (rideID, item, weight) => {
  firebase.firestore().collection("Trips").doc(rideID).update({
    "userAndItems": firebase.firestore.FieldValue.arrayUnion({"riderName": auth.currentUser.displayName, "riderID": auth.currentUser.uid, "item": item, "weight": weight})
  })
  //assign user to that chat room
  firebase.firestore().collection('Users').doc(auth.currentUser.uid).set({
      "chatRooms": firebase.firestore.FieldValue.arrayUnion(rideID)
  }, {merge: true})
}
  

export const getUserHistory = () => {

}