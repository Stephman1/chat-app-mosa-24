// Start writing functions
// https://firebase.google.com/docs/functions/typescript

/* example cloud function given by boilerplate */
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";

initializeApp();

const firestore = new Firestore();

export const storeNewUserInFirebase = functions.auth.user().onCreate((user) => {
  // extract user info
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
    displayName: user.displayName,
  };

  // where collection or doc does not exist, it will be created
  firestore.collection("users").doc(user.displayName || user.uid).set(userInfo);

  logger.info(`User Created: ${JSON.stringify(userInfo)}`);
});
