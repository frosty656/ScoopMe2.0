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

export const newRide = (title, destLng, destLat, startLng, startLat,leaveTime, desc, deliverer = "John Smith") => {
  firebase.firestore().collection("Trips").add({
    "title": title,
    "destLng": destLng, 
    "destLat": destLat, 
    "startLng": startLng, 
    "startLat": startLat,
    "leaveTime": leaveTime,
    "description": desc,
    "deliverer": deliverer
  })
}