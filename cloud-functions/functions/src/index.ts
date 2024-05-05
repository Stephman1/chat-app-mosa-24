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
  firestore.collection("users").doc(user.uid).set(userInfo);

  logger.info(`User Created: ${JSON.stringify(userInfo)}`);
});

export const limitCollectionSize = functions.firestore
  .document("messages/{wildcard}")
  .onWrite(async (change, context) => {
    
    // get a list of all records in the collection
    const cursor = await firestore
      .collection("messages")
      .orderBy("timestamp", "desc")
      .get();

    // Check if there are more than 10 documents
    if (cursor.size > 10) {
      // Delete documents past the 10th one (excluding the newly added one)
      const extraDocs = cursor.docs.slice(10); // Skip the first 10
      const deletePromises = extraDocs.map((doc) => doc.ref.delete());

      await Promise.all(deletePromises);
    }
  });
