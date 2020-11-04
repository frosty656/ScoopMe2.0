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

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const changeUsersName = (name) => {
  auth.currentUser.updateProfile({displayName: name})
  console.log("Finished the update")
}

export const changeUseresProfileImage = (imageURI) => {
  auth.currentUser.updateProfile({photoURL: imageURI})
}

export const newRide = (title, destLng, destLat, startLng, startLat,leaveTime, desc, seats) => {
firebase.firestore().collection("Trips").add({
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
  })
}

export const joinRide = (rideID) => {
  firebase.firestore().collection("Trips").doc(rideID).update({
    "riders": firebase.firestore.FieldValue.arrayUnion({"riderName": auth.currentUser.displayName, "riderID": auth.currentUser.uid})
  })
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
    })
  }

export const addToDelivery = (rideID, item, weight) => {
  firebase.firestore().collection("Trips").doc(rideID).update({
    "userAndItems": firebase.firestore.FieldValue.arrayUnion({"riderName": auth.currentUser.displayName, "riderID": auth.currentUser.uid, "item": item, "weight": weight})
  })
}
  

