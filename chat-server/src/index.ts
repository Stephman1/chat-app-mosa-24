import express from "express";
import { firestore } from "./db";
import { initializeApp } from "firebase-admin";
// import { getFirestore, collection, getDocs, query, where } from "firebase/firestore/lite";

const app = express();
const port = 3001;

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());

/* Allows the server to receive requests from other ports*/
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

/* Establish connection to firebase */
const admin = require('firebase-admin');

const serviceAccount = require('./firestore_credentials.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const db = admin.firestore();

app.get("/get_data", async (req, res) => {

  const userData: any[] = [];
  const messagesData: any[] = [];
  const combinedData: any[] = [];

  try {
    const usersSnapshot = await firestore.collection("users").get();
    usersSnapshot.forEach(doc => {
      userData.push({uid: doc.id,...doc.data()});
    });
  } catch (error) {
    console.error("Error getting user data", error);
  }

  try {
    const messagesSnapshot = await firestore.collection("messages").get();
    messagesSnapshot.forEach(doc => {
      messagesData.push({uid: doc.id,...doc.data()});
    });
  } catch (error) {
    console.error("Error getting messages data", error);
  }

  // console.log(JSON.stringify(messagesData));
  

  for (const message of messagesData) {
    for (const user of userData) {
      if (message.userId === user.uid) {
        const newObj = {
          "uid": message.uid,
          "photoUrl": user.photoUrl,
          "displayName": user.displayName,
          "email": user.email,
          "message": message.message,
          "timestamp": message.timestamp,
        };
        combinedData.push(newObj);
        continue;
      }
    }
  }

  combinedData.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  // console.log(JSON.stringify(combinedData));
  res.json(combinedData);
});

app.post('/chat', async (req, res) => {
  
  try {
    /* Write to database */
    const collection = db.collection("messages");
    const document = collection.doc();
    await document.set(req.body);

    res.json({ message: 'Message saved successfully to Firestore' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error writing data to Firestore' });
  }
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});