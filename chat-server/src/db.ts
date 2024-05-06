import * as admin from 'firebase-admin';

const serviceAccount = require('./firestore_credentials.json');

// Initialize Firestore
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://devchat-88614.firebaseio.com'
});

// Get a reference to the Firestore instance
export const firestore = admin.firestore();