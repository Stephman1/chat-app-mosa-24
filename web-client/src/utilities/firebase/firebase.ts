/* This file is in the format .ts because it's not a component (.tsx). */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore/lite";

import {getAuth, signInWithRedirect, GithubAuthProvider, onAuthStateChanged, User} from "firebase/auth";

// From Authentication Service creationYour web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMC0z-vL9UQpH_-fRRB1VpjictRfM9800",
  authDomain: "devchat-88614.firebaseapp.com",
  projectId: "devchat-88614",
  storageBucket: "devchat-88614.appspot.com",
  messagingSenderId: "217891503392",
  appId: "1:217891503392:web:5a2c296f8bbd602e186b45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GithubAuthProvider();

const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// website for GitHub signin SDK - https://firebase.google.com/docs/auth/web/github-auth#web-modular-api

export function signInWithGithub() {
  return signInWithRedirect(auth, provider);
}

export function signOut() {
  return auth.signOut();
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
